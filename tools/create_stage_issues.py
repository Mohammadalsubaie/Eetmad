#!/usr/bin/env python3
import argparse
import os
import re
import sys
from dataclasses import dataclass
from typing import List, Optional, Tuple

import requests
import time


TASK_HEADER_RE = re.compile(r"^#### TASK-(\d+):\s*(.+)$")


@dataclass
class StageTask:
    task_number: int
    task_code: str
    title: str
    role: str
    priority: str
    estimated_time: str
    description: str
    acceptance_criteria: List[str]
    dependencies: str
    related_us: str


def _strip(line: str) -> str:
    return line.strip("\n").rstrip()


def parse_stage_tasks(markdown_path: str) -> List[StageTask]:
    with open(markdown_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    tasks: List[StageTask] = []
    i = 0
    n = len(lines)

    def is_task_header(idx: int) -> Optional[Tuple[int, str]]:
        m = TASK_HEADER_RE.match(_strip(lines[idx]))
        if not m:
            return None
        return int(m.group(1)), m.group(2)

    while i < n:
        header = is_task_header(i)
        if not header:
            i += 1
            continue

        task_number, title = header
        task_code = f"TASK-{task_number:03d}"

        # Parse metadata (Role, Priority, Estimated Time)
        role = ""
        priority = ""
        estimated_time = ""
        
        j = i + 1
        while j < n and not _strip(lines[j]).startswith("**Description:**"):
            line = _strip(lines[j])
            if line.startswith("**Role:**"):
                role = line.replace("**Role:**", "").strip()
            elif line.startswith("**Priority:**"):
                priority = line.replace("**Priority:**", "").strip()
            elif line.startswith("**Estimated Time:**"):
                estimated_time = line.replace("**Estimated Time:**", "").strip()
            j += 1

        # Parse Description
        description = ""
        if j < n and _strip(lines[j]).startswith("**Description:**"):
            j += 1  # Skip the header
            while j < n and not _strip(lines[j]).startswith("**Acceptance Criteria:**"):
                line = _strip(lines[j])
                if line and not line.startswith("**"):
                    description += line + " "
                j += 1
        description = description.strip()

        # Parse Acceptance Criteria
        acceptance_criteria: List[str] = []
        if j < n and _strip(lines[j]).startswith("**Acceptance Criteria:**"):
            j += 1  # Skip the header
            while j < n and not _strip(lines[j]).startswith("**Dependencies:**"):
                line = _strip(lines[j])
                if line.startswith("-   "):
                    acceptance_criteria.append(line[4:])  # Remove "-   " prefix
                elif line.startswith("- "):
                    acceptance_criteria.append(line[2:])  # Remove "- " prefix
                elif line.startswith("    - "):
                    acceptance_criteria.append(line[6:])  # Remove "    - " prefix
                elif line.startswith("    ```"):
                    # Handle code blocks in criteria
                    code_block = line[6:] + "\n"
                    j += 1
                    while j < n and not _strip(lines[j]).startswith("    ```"):
                        code_block += lines[j]
                        j += 1
                    if j < n:
                        code_block += "    ```"
                    acceptance_criteria.append(code_block)
                j += 1

        # Parse Dependencies
        dependencies = ""
        if j < n and _strip(lines[j]).startswith("**Dependencies:**"):
            dependencies = _strip(lines[j]).replace("**Dependencies:**", "").strip()
            j += 1

        # Parse Related US
        related_us = ""
        if j < n and _strip(lines[j]).startswith("**Related US:**"):
            related_us = _strip(lines[j]).replace("**Related US:**", "").strip()
            j += 1

        tasks.append(StageTask(
            task_number=task_number,
            task_code=task_code,
            title=title,
            role=role,
            priority=priority,
            estimated_time=estimated_time,
            description=description,
            acceptance_criteria=acceptance_criteria,
            dependencies=dependencies,
            related_us=related_us
        ))

        # Move to next task (skip separator lines)
        while j < n and (_strip(lines[j]) == "" or _strip(lines[j]) == "---"):
            j += 1
        i = j

    # Sort by TASK number
    tasks.sort(key=lambda t: t.task_number)
    return tasks


def format_issue_body(task: StageTask) -> str:
    parts: List[str] = []
    
    # Add metadata
    if task.role or task.priority or task.estimated_time:
        parts.append("## Task Information")
        if task.role:
            parts.append(f"**Role:** {task.role}")
        if task.priority:
            parts.append(f"**Priority:** {task.priority}")
        if task.estimated_time:
            parts.append(f"**Estimated Time:** {task.estimated_time}")
        parts.append("")

    # Add Description
    if task.description:
        parts.append("## Description")
        parts.append(task.description)
        parts.append("")

    # Add Acceptance Criteria as checklist
    if task.acceptance_criteria:
        parts.append("## Acceptance Criteria")
        for criteria in task.acceptance_criteria:
            if criteria.strip():
                parts.append(f"- [ ] {criteria}")
        parts.append("")

    # Add Dependencies
    if task.dependencies:
        parts.append("## Dependencies")
        parts.append(task.dependencies)
        parts.append("")

    # Add Related User Stories
    if task.related_us:
        parts.append("## Related User Stories")
        parts.append(task.related_us)

    return "\n".join(parts).strip()


def create_issue(session: requests.Session, repo: str, title: str, body: str, labels: List[str]) -> dict:
    url = f"https://api.github.com/repos/{repo}/issues"
    payload = {"title": title, "body": body}
    if labels:
        payload["labels"] = labels
    resp = session.post(url, json=payload, timeout=30)
    if resp.status_code >= 300:
        error_msg = f"Failed to create issue: {resp.status_code} {resp.text}"
        if resp.status_code == 422 and "label" in resp.text.lower():
            error_msg += f"\nLabels attempted: {labels}"
        raise RuntimeError(error_msg)
    return resp.json()


def get_session(github_token: str) -> requests.Session:
    session = requests.Session()
    session.headers.update({
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {github_token}",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "stage-tasks-importer"
    })
    return session


def list_repo_issues(session: requests.Session, repo: str, state: str = "open") -> List[dict]:
    url = f"https://api.github.com/repos/{repo}/issues?state={state}&per_page=100"
    issues: List[dict] = []
    while url:
        resp = session.get(url, timeout=30)
        if resp.status_code >= 300:
            raise RuntimeError(f"Failed to list issues: {resp.status_code} {resp.text}")
        page = resp.json()
        for it in page:
            # Exclude PRs (they have 'pull_request')
            if isinstance(it, dict) and "pull_request" not in it:
                issues.append(it)
        next_url = None
        if 'link' in resp.headers:
            links = resp.headers['link'].split(',')
            for l in links:
                parts = l.split(';')
                if len(parts) >= 2 and 'rel="next"' in parts[1]:
                    next_url = parts[0].strip().lstrip('<').rstrip('>')
                    break
        url = next_url
    return issues


def close_issue(session: requests.Session, repo: str, number: int) -> None:
    url = f"https://api.github.com/repos/{repo}/issues/{number}"
    resp = session.patch(url, json={"state": "closed"}, timeout=30)
    if resp.status_code >= 300:
        raise RuntimeError(f"Failed to close issue #{number}: {resp.status_code} {resp.text}")


def update_issue_labels(session: requests.Session, repo: str, number: int, labels: List[str]) -> None:
    url = f"https://api.github.com/repos/{repo}/issues/{number}"
    resp = session.patch(url, json={"labels": labels}, timeout=30)
    if resp.status_code >= 300:
        raise RuntimeError(f"Failed to update labels for issue #{number}: {resp.status_code} {resp.text}")


def list_labels(session: requests.Session, repo: str) -> List[str]:
    url = f"https://api.github.com/repos/{repo}/labels?per_page=100"
    names: List[str] = []
    while url:
        resp = session.get(url, timeout=30)
        if resp.status_code >= 300:
            raise RuntimeError(f"Failed to list labels: {resp.status_code} {resp.text}")
        data = resp.json()
        for lbl in data:
            if isinstance(lbl, dict) and "name" in lbl:
                names.append(lbl["name"])
        # pagination
        next_url = None
        if 'link' in resp.headers:
            # parse Link header for rel="next"
            links = resp.headers['link'].split(',')
            for l in links:
                parts = l.split(';')
                if len(parts) >= 2 and 'rel="next"' in parts[1]:
                    next_url = parts[0].strip().lstrip('<').rstrip('>')
                    break
        url = next_url
    return names


def create_label(session: requests.Session, repo: str, name: str, color: str = "0e8a16", description: Optional[str] = None) -> None:
    url = f"https://api.github.com/repos/{repo}/labels"
    payload = {"name": name, "color": color}
    if description:
        payload["description"] = description
    resp = session.post(url, json=payload, timeout=30)
    if resp.status_code == 422 and "already_exists" in resp.text:
        return
    if resp.status_code >= 300:
        raise RuntimeError(f"Failed to create label '{name}': {resp.status_code} {resp.text}")


def delete_label(session: requests.Session, repo: str, name: str) -> None:
    url = f"https://api.github.com/repos/{repo}/labels/{name}"
    resp = session.delete(url, timeout=30)
    if resp.status_code == 404:
        return  # Label doesn't exist, that's fine
    if resp.status_code >= 300:
        raise RuntimeError(f"Failed to delete label '{name}': {resp.status_code} {resp.text}")


def delete_all_labels(session: requests.Session, repo: str) -> None:
    """Delete all labels in the repository"""
    labels = list_labels(session, repo)
    print(f"Found {len(labels)} labels to delete")
    
    for label in labels:
        try:
            delete_label(session, repo, label)
            print(f"✓ Deleted label: {label}")
        except RuntimeError as e:
            print(f"✗ Failed to delete label '{label}': {e}")


def delete_all_issues(session: requests.Session, repo: str) -> None:
    """Close all open issues in the repository"""
    issues = list_repo_issues(session, repo, state="open")
    print(f"Found {len(issues)} open issues to close")
    
    for issue in issues:
        try:
            close_issue(session, repo, issue["number"])
            print(f"✓ Closed issue #{issue['number']}: {issue.get('title', 'Unknown')}")
        except RuntimeError as e:
            print(f"✗ Failed to close issue #{issue['number']}: {e}")


def ensure_labels_exist(session: requests.Session, repo: str, desired_labels: List[str]) -> List[str]:
    unique = []
    seen = set()
    for l in desired_labels:
        if l not in seen:
            unique.append(l)
            seen.add(l)
    if not unique:
        return []
    
    existing = set(list_labels(session, repo))
    missing = [l for l in unique if l not in existing]
    
    print(f"Found {len(existing)} existing labels, need to create {len(missing)} new labels")
    
    for l in missing:
        try:
            create_label(session, repo, l, color="0366d6")
            existing.add(l)
            print(f"Created label: {l}")
        except RuntimeError as e:
            print(f"Failed to create label '{l}': {e}")
            # Continue with what exists
            pass
    
    final_labels = [l for l in unique if l in existing]
    print(f"Final labels to use: {final_labels}")
    return final_labels


def get_label_color_and_description(label: str) -> Tuple[str, str]:
    """Get color and description for a label based on its type"""
    if label.startswith("role-"):
        return "0e8a16", f"Tasks for {label.replace('role-', '').replace('-', ' ').title()}"
    elif label.startswith("priority-"):
        priority = label.replace("priority-", "")
        colors = {
            "critical": "d73a4a",
            "high": "ff8c00", 
            "medium": "ffc107",
            "low": "28a745"
        }
        return colors.get(priority, "0366d6"), f"Priority: {priority.title()}"
    elif label.startswith("stage-"):
        return "6f42c1", f"Development stage: {label.replace('stage-', '').replace('-', ' ').title()}"
    elif label.startswith("type-"):
        return "0366d6", f"Task type: {label.replace('type-', '').replace('-', ' ').title()}"
    elif label.startswith("size-"):
        return "ff6b6b", f"Estimated size: {label.replace('size-', '').upper()}"
    else:
        return "0366d6", "General task label"


def get_task_labels(task: StageTask) -> List[str]:
    """Generate labels based on task properties"""
    labels = ["stage-task"]
    
    # Role-based labels
    if task.role:
        role_label = f"role-{task.role.lower().replace(' ', '-')}"
        labels.append(role_label)
    
    # Priority-based labels
    if task.priority:
        priority_label = f"priority-{task.priority.lower().replace(' ', '-')}"
        labels.append(priority_label)
    
    # Stage-based labels (infer from task number ranges)
    if task.task_number <= 10:
        labels.append("stage-1-foundation")
    elif task.task_number <= 24:
        labels.append("stage-2-users")
    elif task.task_number <= 29:
        labels.append("stage-3-suppliers")
    elif task.task_number <= 40:
        labels.append("stage-4-categories")
    elif task.task_number <= 50:
        labels.append("stage-5-requests")
    elif task.task_number <= 60:
        labels.append("stage-6-offers")
    elif task.task_number <= 70:
        labels.append("stage-7-projects")
    elif task.task_number <= 80:
        labels.append("stage-8-payments")
    elif task.task_number <= 90:
        labels.append("stage-9-reviews")
    elif task.task_number <= 100:
        labels.append("stage-10-messaging")
    elif task.task_number <= 110:
        labels.append("stage-11-notifications")
    elif task.task_number <= 120:
        labels.append("stage-12-disputes")
    elif task.task_number <= 130:
        labels.append("stage-13-moderation")
    elif task.task_number <= 140:
        labels.append("stage-14-admin")
    else:
        labels.append("stage-15-advanced")
    
    # Technology-based labels (infer from title/description)
    title_lower = task.title.lower()
    description_lower = task.description.lower()
    combined_text = f"{title_lower} {description_lower}"
    
    if any(term in combined_text for term in ["api", "backend", "server"]):
        labels.append("type-backend")
    if any(term in combined_text for term in ["ui", "page", "form", "frontend", "react", "next"]):
        labels.append("type-frontend")
    if any(term in combined_text for term in ["database", "migration", "schema", "sql"]):
        labels.append("type-database")
    if any(term in combined_text for term in ["docker", "deploy", "ci/cd", "pipeline", "devops"]):
        labels.append("type-devops")
    if any(term in combined_text for term in ["test", "testing", "qa", "quality"]):
        labels.append("type-qa")
    if any(term in combined_text for term in ["email", "sms", "notification", "integration"]):
        labels.append("type-integration")
    if any(term in combined_text for term in ["payment", "wallet", "financial", "billing"]):
        labels.append("type-payment")
    if any(term in combined_text for term in ["auth", "login", "register", "security"]):
        labels.append("type-auth")
    if any(term in combined_text for term in ["admin", "moderation", "management"]):
        labels.append("type-admin")
    
    # Size-based labels (infer from estimated time)
    if task.estimated_time:
        time_str = task.estimated_time.lower()
        if "hour" in time_str:
            try:
                hours = int(''.join(filter(str.isdigit, time_str)))
                if hours <= 4:
                    labels.append("size-small")
                elif hours <= 8:
                    labels.append("size-medium")
                elif hours <= 16:
                    labels.append("size-large")
                else:
                    labels.append("size-xl")
            except:
                pass
    
    return labels


def graphql(session: requests.Session, query: str, variables: dict) -> dict:
    """Execute a GraphQL query against GitHub's API"""
    url = "https://api.github.com/graphql"
    resp = session.post(url, json={"query": query, "variables": variables}, timeout=30)
    if resp.status_code >= 300:
        raise RuntimeError(f"GraphQL error: {resp.status_code} {resp.text}")
    data = resp.json()
    if "errors" in data and data["errors"]:
        raise RuntimeError(f"GraphQL returned errors: {data['errors']}")
    return data["data"]


def resolve_project_v2_id(session: requests.Session, project_url: str) -> str:
    """Resolve GitHub Project v2 ID from URL"""
    # Supports user and org project v2 URLs:
    # https://github.com/users/<USER>/projects/<NUMBER>
    # https://github.com/orgs/<ORG>/projects/<NUMBER>
    m_user = re.match(r"^https://github\.com/users/([^/]+)/projects/(\d+)$", project_url)
    m_org = re.match(r"^https://github\.com/orgs/([^/]+)/projects/(\d+)$", project_url)
    
    if m_user:
        login = m_user.group(1)
        number = int(m_user.group(2))
        query = """
        query($login: String!, $number: Int!) {
          user(login: $login) { projectV2(number: $number) { id } }
        }
        """
        data = graphql(session, query, {"login": login, "number": number})
        node = data.get("user", {}).get("projectV2")
        if not node or not node.get("id"):
            raise RuntimeError("Could not resolve user projectV2 id from URL")
        return node["id"]
    
    if m_org:
        login = m_org.group(1)
        number = int(m_org.group(2))
        query = """
        query($login: String!, $number: Int!) {
          organization(login: $login) { projectV2(number: $number) { id } }
        }
        """
        data = graphql(session, query, {"login": login, "number": number})
        node = data.get("organization", {}).get("projectV2")
        if not node or not node.get("id"):
            raise RuntimeError("Could not resolve org projectV2 id from URL")
        return node["id"]
    
    raise ValueError("Unsupported project URL. Use a Projects (v2) URL like https://github.com/users/<USER>/projects/<NUMBER> or https://github.com/orgs/<ORG>/projects/<NUMBER>")


def add_issue_to_project_v2(session: requests.Session, project_id: str, issue_node_id: str) -> None:
    """Add a GitHub issue to a Project v2 board"""
    mutation = """
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
        item { id }
      }
    }
    """
    graphql(session, mutation, {"projectId": project_id, "contentId": issue_node_id})


def get_issue_node_id(session: requests.Session, repo: str, issue_number: int) -> str:
    """Get the GraphQL node ID for an issue"""
    query = """
    query($owner: String!, $repo: String!, $number: Int!) {
      repository(owner: $owner, name: $repo) {
        issue(number: $number) { id }
      }
    }
    """
    owner, repo_name = repo.split("/")
    data = graphql(session, query, {"owner": owner, "repo": repo_name, "number": issue_number})
    issue = data.get("repository", {}).get("issue")
    if not issue or not issue.get("id"):
        raise RuntimeError(f"Could not find issue #{issue_number}")
    return issue["id"]


def main() -> int:
    parser = argparse.ArgumentParser(description="Parse technical_stages_tasks.md and create GitHub issues.")
    parser.add_argument("--repo", required=True, help="Target repo in the form OWNER/REPO")
    parser.add_argument("--path", default="technical_stages_tasks.md", help="Path to technical_stages_tasks markdown file")
    parser.add_argument("--token", default=os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN"), help="GitHub token (or set GH_TOKEN env)")
    parser.add_argument("--label", action="append", default=["stage-task"], help="Additional labels to add to created issues (can be repeated)")
    parser.add_argument("--since", type=int, default=None, help="Only import tasks with TASK number >= since")
    parser.add_argument("--until", type=int, default=None, help="Only import tasks with TASK number <= until")
    parser.add_argument("--dry-run", action="store_true", help="Print issues instead of creating them")
    parser.add_argument("--purge-all", action="store_true", help="Close all open issues in the repo before creating new ones")
    parser.add_argument("--purge-label", action="append", help="When purging, only close issues that have ALL these labels (repeatable)")
    parser.add_argument("--fix-labels", action="store_true", help="Update existing issues with proper labels based on their titles")
    parser.add_argument("--reset-all", action="store_true", help="Delete all labels and close all issues, then recreate everything")
    parser.add_argument("--project-url", help="GitHub Project v2 URL to add issues to (e.g., https://github.com/users/USER/projects/NUMBER)")

    args = parser.parse_args()

    if not args.token and not args.dry_run:
        print("Error: Provide a GitHub token via --token or GH_TOKEN env.", file=sys.stderr)
        return 2

    tasks = parse_stage_tasks(args.path)
    # Apply range filters
    filtered = [t for t in tasks if (args.since is None or t.task_number >= args.since) and (args.until is None or t.task_number <= args.until)]

    # Handle reset-all mode
    if args.reset_all:
        if not args.token:
            print("Error: Token required for --reset-all", file=sys.stderr)
            return 2
        
        session = get_session(args.token)
        
        print("🔄 Resetting repository...")
        print("1. Closing all issues...")
        delete_all_issues(session, args.repo)
        
        print("2. Deleting all labels...")
        delete_all_labels(session, args.repo)
        
        print("3. Creating new labels with colors...")
        # Collect all unique labels that will be used
        all_unique_labels = set(args.label)
        for t in filtered:
            task_labels = get_task_labels(t)
            all_unique_labels.update(task_labels)
        
        # Create labels with proper colors and descriptions
        for label in all_unique_labels:
            color, description = get_label_color_and_description(label)
            try:
                create_label(session, args.repo, label, color, description)
                print(f"✓ Created label: {label} (color: #{color})")
            except RuntimeError as e:
                print(f"✗ Failed to create label '{label}': {e}")
        
        print("4. Creating issues with proper labels...")
        # Continue with normal issue creation below
        args.purge_all = False  # Already purged above

    # Handle fix-labels mode
    if args.fix_labels:
        if not args.token:
            print("Error: Token required for --fix-labels", file=sys.stderr)
            return 2
        
        session = get_session(args.token)
        existing_issues = list_repo_issues(session, args.repo, state="open")
        
        # Create a mapping of task codes to tasks
        task_map = {t.task_code: t for t in tasks}
        
        updated = 0
        for issue in existing_issues:
            title = issue.get("title", "")
            if title.startswith("[TASK-") and "]" in title:
                task_code = title.split("]")[0][1:]  # Extract TASK-XXX
                if task_code in task_map:
                    task = task_map[task_code]
                    task_labels = get_task_labels(task)
                    all_labels = list(set(task_labels + args.label))
                    
                    print(f"Updating issue #{issue['number']}: {title}")
                    print(f"New labels: {all_labels}")
                    
                    try:
                        update_issue_labels(session, args.repo, issue["number"], all_labels)
                        print(f"✓ Updated issue #{issue['number']}")
                        updated += 1
                    except RuntimeError as e:
                        print(f"✗ Failed to update issue #{issue['number']}: {e}")
        
        print(f"\nUpdated {updated} issues with proper labels.")
        return 0

    if args.dry_run:
        for t in filtered:
            title = f"[{t.task_code}] {t.title}"
            body = format_issue_body(t)
            task_labels = get_task_labels(t)
            all_labels = list(set(task_labels + args.label))
            print("TITLE:", title)
            print("BODY:\n", body)
            print("LABELS:", ", ".join(all_labels))
            print("-" * 80)
        print(f"Would create {len(filtered)} issues.")
        return 0

    session = get_session(args.token)
    
    # Resolve project ID if project URL is provided
    project_id = None
    if args.project_url:
        try:
            project_id = resolve_project_v2_id(session, args.project_url)
            print(f"✓ Resolved project ID: {project_id}")
        except Exception as e:
            print(f"✗ Failed to resolve project: {e}")
            print("Continuing without project integration...")
    
    # Collect all unique labels that will be used
    all_unique_labels = set(args.label)
    for t in filtered:
        task_labels = get_task_labels(t)
        all_unique_labels.update(task_labels)
    
    # Ensure all labels exist (only if not in reset-all mode)
    if not args.reset_all:
        labels = ensure_labels_exist(session, args.repo, list(all_unique_labels))
    else:
        labels = list(all_unique_labels)

    # Optionally purge existing issues first
    if args.purge_all:
        existing = list_repo_issues(session, args.repo, state="open")
        for it in existing:
            if args.purge_label:
                issue_labels = {lbl.get("name") for lbl in it.get("labels", []) if isinstance(lbl, dict)}
                if not all(pl in issue_labels for pl in args.purge_label):
                    continue
            close_issue(session, args.repo, it["number"])

    created = 0
    failed = 0
    for t in filtered:
        title = f"[{t.task_code}] {t.title}"
        body = format_issue_body(t)
        task_labels = get_task_labels(t)
        all_labels = list(set(task_labels + args.label))
        
        print(f"Creating issue: {title}")
        print(f"Labels: {all_labels}")
        
        # Basic retry for secondary rate limits
        attempt = 0
        while True:
            try:
                issue = create_issue(session, args.repo, title, body, all_labels)
                issue_number = issue.get('number')
                print(f"✓ Created issue #{issue_number}")
                
                # Add to project if project URL is provided
                if project_id:
                    try:
                        issue_node_id = get_issue_node_id(session, args.repo, issue_number)
                        add_issue_to_project_v2(session, project_id, issue_node_id)
                        print(f"  ✓ Added to project")
                    except Exception as e:
                        print(f"  ✗ Failed to add to project: {e}")
                
                created += 1
                break
            except RuntimeError as e:
                text = str(e)
                if ("403" in text or "429" in text) and attempt < 3:
                    attempt += 1
                    print(f"Rate limited, retrying in {2 * attempt} seconds...")
                    time.sleep(2 * attempt)
                    continue
                print(f"✗ Failed to create issue: {e}")
                failed += 1
                break

    print(f"\nSummary:")
    print(f"✓ Created {created} GitHub issues in {args.repo}")
    if failed > 0:
        print(f"✗ Failed to create {failed} issues")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
