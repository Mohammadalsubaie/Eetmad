#!/usr/bin/env python3
import argparse
import os
import re
import sys
from dataclasses import dataclass
from typing import List, Optional, Tuple

import requests
import time


US_HEADER_RE = re.compile(r"^US-(\d+):\s*(.+)$")


@dataclass
class UserStory:
    us_number: int
    us_code: str
    title: str
    persona: Optional[str]
    acceptance_criteria: List[str]


def _strip(line: str) -> str:
    return line.strip("\n").rstrip()


def parse_user_stories(markdown_path: str) -> List[UserStory]:
    with open(markdown_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    stories: List[UserStory] = []
    i = 0
    n = len(lines)

    def is_us_header(idx: int) -> Optional[Tuple[int, str]]:
        m = US_HEADER_RE.match(_strip(lines[idx]))
        if not m:
            return None
        return int(m.group(1)), m.group(2)

    while i < n:
        header = is_us_header(i)
        if not header:
            i += 1
            continue

        us_number, title = header
        us_code = f"US-{us_number:03d}"

        # Persona/goal line is typically the next non-empty line
        persona: Optional[str] = None
        j = i + 1
        while j < n and _strip(lines[j]) == "":
            j += 1
        if j < n:
            next_line = _strip(lines[j])
            # Heuristic: persona lines often start with Arabic "كمستخدم"/"كعميل"/"كمورد"/"كنظام"
            if next_line.startswith("كمستخدم") or next_line.startswith("كعميل") or next_line.startswith("كمورد") or next_line.startswith("كنظام"):
                persona = next_line
                j += 1

        # Seek for acceptance criteria start: line equals or starts with "معايير القبول"
        acceptance: List[str] = []
        while j < n and not _strip(lines[j]).startswith("معايير القبول"):
            # Skip until criteria heading
            if is_us_header(j):
                break  # No criteria block found; start of next US
            j += 1

        if j < n and _strip(lines[j]).startswith("معايير القبول"):
            j += 1  # move past the heading
            # Collect lines until we hit a new user story header or a new section header
            while j < n:
                line = _strip(lines[j])
                if line == "":
                    # Blank line might separate paragraphs inside criteria; keep as separator
                    # but collapse multiple blanks
                    if acceptance and acceptance[-1] != "":
                        acceptance.append("")
                    j += 1
                    continue
                if is_us_header(j):
                    break
                # Section headers like "1.2 ..." or a top-level number start: conservative check
                if re.match(r"^[0-9]+(\.[0-9]+)*\s", line):
                    break
                acceptance.append(line)
                j += 1

        # Normalize acceptance: remove consecutive blanks
        normalized: List[str] = []
        for item in acceptance:
            if item == "" and (not normalized or normalized[-1] == ""):
                continue
            normalized.append(item)

        stories.append(UserStory(us_number=us_number, us_code=us_code, title=title, persona=persona, acceptance_criteria=normalized))
        # Continue from j if we advanced, else from i+1 to avoid infinite loop
        i = j if j > i else i + 1

    # Sort by US number just in case
    stories.sort(key=lambda s: s.us_number)
    return stories


def format_issue_body(story: UserStory) -> str:
    parts: List[str] = []
    if story.persona:
        parts.append(f"{story.persona}\n")
    if story.acceptance_criteria:
        parts.append("\nالمعايير (قائمة مهام):")
        for line in story.acceptance_criteria:
            if line == "":
                parts.append("")
                continue
            # Convert to checklist items
            parts.append(f"- [ ] {line}")
    return "\n".join(parts).strip()


def create_issue(session: requests.Session, repo: str, title: str, body: str, labels: List[str]) -> dict:
    url = f"https://api.github.com/repos/{repo}/issues"
    payload = {"title": title, "body": body}
    if labels:
        payload["labels"] = labels
    resp = session.post(url, json=payload, timeout=30)
    if resp.status_code >= 300:
        raise RuntimeError(f"Failed to create issue: {resp.status_code} {resp.text}")
    return resp.json()


def get_session(github_token: str) -> requests.Session:
    session = requests.Session()
    session.headers.update({
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {github_token}",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "user-stories-importer"
    })
    return session


def graphql(session: requests.Session, query: str, variables: dict) -> dict:
    url = "https://api.github.com/graphql"
    resp = session.post(url, json={"query": query, "variables": variables}, timeout=30)
    if resp.status_code >= 300:
        raise RuntimeError(f"GraphQL error: {resp.status_code} {resp.text}")
    data = resp.json()
    if "errors" in data and data["errors"]:
        raise RuntimeError(f"GraphQL returned errors: {data['errors']}")
    return data["data"]


def resolve_project_v2_id(session: requests.Session, project_url: str) -> str:
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
    mutation = """
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
        item { id }
      }
    }
    """
    graphql(session, mutation, {"projectId": project_id, "contentId": issue_node_id})


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
    for l in missing:
        # choose a deterministic color for consistency
        try:
            create_label(session, repo, l, color="0366d6")
            existing.add(l)
        except RuntimeError:
            # No permission to create labels; continue with what exists
            pass
    # Return only labels that actually exist
    return [l for l in unique if l in existing]


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


def main() -> int:
    parser = argparse.ArgumentParser(description="Parse user-stories.md and create GitHub issues.")
    parser.add_argument("--repo", required=True, help="Target repo in the form OWNER/REPO")
    parser.add_argument("--path", default="user-stories.md", help="Path to user-stories markdown file")
    parser.add_argument("--token", default=os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN"), help="GitHub token (or set GH_TOKEN env)")
    parser.add_argument("--label", action="append", default=["user-story"], help="Label to add to created issues (can be repeated)")
    parser.add_argument("--since", type=int, default=None, help="Only import stories with US number >= since")
    parser.add_argument("--until", type=int, default=None, help="Only import stories with US number <= until")
    parser.add_argument("--dry-run", action="store_true", help="Print issues instead of creating them")
    parser.add_argument("--project-url", help="GitHub Projects (v2) URL to add created issues to")
    parser.add_argument("--mode", choices=["story", "criteria"], default="story", help="story: one issue per user story; criteria: one issue per acceptance criterion")
    parser.add_argument("--purge-all", action="store_true", help="Close all open issues in the repo before creating new ones")
    parser.add_argument("--purge-label", action="append", help="When purging, only close issues that have ALL these labels (repeatable)")

    args = parser.parse_args()

    if not args.token and not args.dry_run:
        print("Error: Provide a GitHub token via --token or GH_TOKEN env.", file=sys.stderr)
        return 2

    stories = parse_user_stories(args.path)
    # Apply range filters
    filtered = [s for s in stories if (args.since is None or s.us_number >= args.since) and (args.until is None or s.us_number <= args.until)]

    if args.dry_run:
        for s in filtered:
            if args.mode == "story":
                title = f"[{s.us_code}] {s.title}"
                body = format_issue_body(s)
                print("TITLE:", title)
                print("BODY:\n", body)
                print("LABELS:", ", ".join(args.label))
                print("-" * 80)
            else:
                for line in s.acceptance_criteria:
                    if not line:
                        continue
                    title = f"[{s.us_code}] {line}"
                    body = (s.persona or "")
                    print("TITLE:", title)
                    print("BODY:\n", body)
                    print("LABELS:", ", ".join(args.label))
                    print("-" * 80)
        print(f"Would create {len(filtered)} issues.")
        return 0

    session = get_session(args.token)
    # Ensure labels exist once upfront to avoid 422 errors
    # Dedupe labels provided by user
    dedup_labels = []
    seen = set()
    for l in args.label:
        if l not in seen:
            dedup_labels.append(l)
            seen.add(l)

    # In criteria mode, add a default label to distinguish technical tasks
    if args.mode == "criteria" and "tech-task" not in dedup_labels:
        dedup_labels.append("tech-task")
    labels = ensure_labels_exist(session, args.repo, dedup_labels)

    # Optionally purge existing issues first
    if args.purge_all:
        existing = list_repo_issues(session, args.repo, state="open")
        for it in existing:
            if args.purge_label:
                issue_labels = {lbl.get("name") for lbl in it.get("labels", []) if isinstance(lbl, dict)}
                if not all(pl in issue_labels for pl in args.purge_label):
                    continue
            close_issue(session, args.repo, it["number"])

    project_id: Optional[str] = None
    if args.project_url and not args.dry_run:
        project_id = resolve_project_v2_id(session, args.project_url)

    created = 0
    for s in filtered:
        if args.mode == "story":
            title = f"[{s.us_code}] {s.title}"
            body = format_issue_body(s)
            # Basic retry for secondary rate limits
            attempt = 0
            while True:
                try:
                    issue = create_issue(session, args.repo, title, body, labels)
                    break
                except RuntimeError as e:
                    text = str(e)
                    if ("403" in text or "429" in text) and attempt < 3:
                        attempt += 1
                        time.sleep(2 * attempt)
                        continue
                    raise
            if project_id:
                node_id = issue.get("node_id")
                if node_id:
                    try:
                        add_issue_to_project_v2(session, project_id, node_id)
                    except RuntimeError:
                        pass
            created += 1
        else:
            # criteria-per-issue: each non-empty acceptance criterion becomes an issue
            for line in s.acceptance_criteria:
                if not line:
                    continue
                title = f"[{s.us_code}] {line}"
                body = s.persona or ""
                attempt = 0
                while True:
                    try:
                        issue = create_issue(session, args.repo, title, body, labels)
                        break
                    except RuntimeError as e:
                        text = str(e)
                        if ("403" in text or "429" in text) and attempt < 3:
                            attempt += 1
                            time.sleep(2 * attempt)
                            continue
                        raise
                if project_id:
                    node_id = issue.get("node_id")
                    if node_id:
                        try:
                            add_issue_to_project_v2(session, project_id, node_id)
                        except RuntimeError:
                            pass
                created += 1

    print(f"Created {created} GitHub issues in {args.repo}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


