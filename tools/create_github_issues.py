#!/usr/bin/env python3
import argparse
import os
import re
import sys
from dataclasses import dataclass
from typing import List, Optional, Tuple

import requests


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


def main() -> int:
    parser = argparse.ArgumentParser(description="Parse user-stories.md and create GitHub issues.")
    parser.add_argument("--repo", required=True, help="Target repo in the form OWNER/REPO")
    parser.add_argument("--path", default="user-stories.md", help="Path to user-stories markdown file")
    parser.add_argument("--token", default=os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN"), help="GitHub token (or set GH_TOKEN env)")
    parser.add_argument("--label", action="append", default=["user-story"], help="Label to add to created issues (can be repeated)")
    parser.add_argument("--since", type=int, default=None, help="Only import stories with US number >= since")
    parser.add_argument("--until", type=int, default=None, help="Only import stories with US number <= until")
    parser.add_argument("--dry-run", action="store_true", help="Print issues instead of creating them")

    args = parser.parse_args()

    if not args.token and not args.dry_run:
        print("Error: Provide a GitHub token via --token or GH_TOKEN env.", file=sys.stderr)
        return 2

    stories = parse_user_stories(args.path)
    # Apply range filters
    filtered = [s for s in stories if (args.since is None or s.us_number >= args.since) and (args.until is None or s.us_number <= args.until)]

    if args.dry_run:
        for s in filtered:
            title = f"[{s.us_code}] {s.title}"
            body = format_issue_body(s)
            print("TITLE:", title)
            print("BODY:\n", body)
            print("LABELS:", ", ".join(args.label))
            print("-" * 80)
        print(f"Would create {len(filtered)} issues.")
        return 0

    session = get_session(args.token)

    created = 0
    for s in filtered:
        title = f"[{s.us_code}] {s.title}"
        body = format_issue_body(s)
        create_issue(session, args.repo, title, body, args.label)
        created += 1

    print(f"Created {created} GitHub issues in {args.repo}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())


