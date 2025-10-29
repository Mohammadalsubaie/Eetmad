#!/usr/bin/env python3
import argparse
import os
import re
import sys
from dataclasses import dataclass
from typing import List, Optional, Tuple

import requests
import time


TECH_HEADER_RE = re.compile(r"^### TECH-(\d+):\s*(.+)$")


@dataclass
class TechnicalTask:
    tech_number: int
    tech_code: str
    title: str
    priority: str
    epic: str
    story_reference: str
    technical_requirements: List[str]
    acceptance_criteria: List[str]
    dependencies: str


def _strip(line: str) -> str:
    return line.strip("\n").rstrip()


def parse_technical_tasks(markdown_path: str) -> List[TechnicalTask]:
    with open(markdown_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    tasks: List[TechnicalTask] = []
    i = 0
    n = len(lines)

    def is_tech_header(idx: int) -> Optional[Tuple[int, str]]:
        m = TECH_HEADER_RE.match(_strip(lines[idx]))
        if not m:
            return None
        return int(m.group(1)), m.group(2)

    while i < n:
        header = is_tech_header(i)
        if not header:
            i += 1
            continue

        tech_number, title = header
        tech_code = f"TECH-{tech_number:03d}"

        # Parse metadata (Priority, Epic, Story Reference)
        priority = ""
        epic = ""
        story_reference = ""
        
        j = i + 1
        while j < n and not _strip(lines[j]).startswith("**Technical Requirements:**"):
            line = _strip(lines[j])
            if line.startswith("**Priority:**"):
                priority = line.replace("**Priority:**", "").strip()
            elif line.startswith("**Epic:**"):
                epic = line.replace("**Epic:**", "").strip()
            elif line.startswith("**Story Reference:**"):
                story_reference = line.replace("**Story Reference:**", "").strip()
            j += 1

        # Parse Technical Requirements
        technical_requirements: List[str] = []
        if j < n and _strip(lines[j]).startswith("**Technical Requirements:**"):
            j += 1  # Skip the header
            while j < n and not _strip(lines[j]).startswith("**Acceptance Criteria:**"):
                line = _strip(lines[j])
                if line.startswith("-   "):
                    technical_requirements.append(line[4:])  # Remove "-   " prefix
                elif line.startswith("- "):
                    technical_requirements.append(line[2:])  # Remove "- " prefix
                j += 1

        # Parse Acceptance Criteria
        acceptance_criteria: List[str] = []
        if j < n and _strip(lines[j]).startswith("**Acceptance Criteria:**"):
            j += 1  # Skip the header
            while j < n and not _strip(lines[j]).startswith("**Dependencies:**"):
                line = _strip(lines[j])
                if line.startswith("-   [ ] "):
                    acceptance_criteria.append(line[7:])  # Remove "-   [ ] " prefix
                elif line.startswith("- [ ] "):
                    acceptance_criteria.append(line[6:])  # Remove "- [ ] " prefix
                j += 1

        # Parse Dependencies
        dependencies = ""
        if j < n and _strip(lines[j]).startswith("**Dependencies:**"):
            dependencies = _strip(lines[j]).replace("**Dependencies:**", "").strip()
            j += 1

        tasks.append(TechnicalTask(
            tech_number=tech_number,
            tech_code=tech_code,
            title=title,
            priority=priority,
            epic=epic,
            story_reference=story_reference,
            technical_requirements=technical_requirements,
            acceptance_criteria=acceptance_criteria,
            dependencies=dependencies
        ))

        # Move to next task (skip separator lines)
        while j < n and (_strip(lines[j]) == "" or _strip(lines[j]) == "---"):
            j += 1
        i = j

    # Sort by TECH number
    tasks.sort(key=lambda t: t.tech_number)
    return tasks


def format_issue_body(task: TechnicalTask) -> str:
    parts: List[str] = []
    
    # Add metadata
    if task.priority or task.epic or task.story_reference:
        parts.append("## Metadata")
        if task.priority:
            parts.append(f"**Priority:** {task.priority}")
        if task.epic:
            parts.append(f"**Epic:** {task.epic}")
        if task.story_reference:
            parts.append(f"**Story Reference:** {task.story_reference}")
        parts.append("")

    # Add Technical Requirements
    if task.technical_requirements:
        parts.append("## Technical Requirements")
        for req in task.technical_requirements:
            parts.append(f"- {req}")
        parts.append("")

    # Add Acceptance Criteria as checklist
    if task.acceptance_criteria:
        parts.append("## Acceptance Criteria")
        for criteria in task.acceptance_criteria:
            parts.append(f"- [ ] {criteria}")
        parts.append("")

    # Add Dependencies
    if task.dependencies:
        parts.append("## Dependencies")
        parts.append(task.dependencies)

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
        "User-Agent": "tech-tasks-importer"
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
        try:
            create_label(session, repo, l, color="0366d6")
            existing.add(l)
        except RuntimeError:
            # No permission to create labels; continue with what exists
            pass
    return [l for l in unique if l in existing]


def main() -> int:
    parser = argparse.ArgumentParser(description="Parse Technical_Tasks.md and create GitHub issues.")
    parser.add_argument("--repo", required=True, help="Target repo in the form OWNER/REPO")
    parser.add_argument("--path", default="Technical_Tasks.md", help="Path to Technical_Tasks markdown file")
    parser.add_argument("--token", default=os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN"), help="GitHub token (or set GH_TOKEN env)")
    parser.add_argument("--label", action="append", default=["tech-task"], help="Label to add to created issues (can be repeated)")
    parser.add_argument("--since", type=int, default=None, help="Only import tasks with TECH number >= since")
    parser.add_argument("--until", type=int, default=None, help="Only import tasks with TECH number <= until")
    parser.add_argument("--dry-run", action="store_true", help="Print issues instead of creating them")
    parser.add_argument("--purge-all", action="store_true", help="Close all open issues in the repo before creating new ones")
    parser.add_argument("--purge-label", action="append", help="When purging, only close issues that have ALL these labels (repeatable)")

    args = parser.parse_args()

    if not args.token and not args.dry_run:
        print("Error: Provide a GitHub token via --token or GH_TOKEN env.", file=sys.stderr)
        return 2

    tasks = parse_technical_tasks(args.path)
    # Apply range filters
    filtered = [t for t in tasks if (args.since is None or t.tech_number >= args.since) and (args.until is None or t.tech_number <= args.until)]

    if args.dry_run:
        for t in filtered:
            title = f"[{t.tech_code}] {t.title}"
            body = format_issue_body(t)
            print("TITLE:", title)
            print("BODY:\n", body)
            print("LABELS:", ", ".join(args.label))
            print("-" * 80)
        print(f"Would create {len(filtered)} issues.")
        return 0

    session = get_session(args.token)
    
    # Dedupe labels
    dedup_labels = []
    seen = set()
    for l in args.label:
        if l not in seen:
            dedup_labels.append(l)
            seen.add(l)

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

    created = 0
    for t in filtered:
        title = f"[{t.tech_code}] {t.title}"
        body = format_issue_body(t)
        
        # Basic retry for secondary rate limits
        attempt = 0
        while True:
            try:
                create_issue(session, args.repo, title, body, labels)
                break
            except RuntimeError as e:
                text = str(e)
                if ("403" in text or "429" in text) and attempt < 3:
                    attempt += 1
                    time.sleep(2 * attempt)
                    continue
                raise
        created += 1

    print(f"Created {created} GitHub issues in {args.repo}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
