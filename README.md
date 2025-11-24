## GitHub setup and issue import
   .
Follow these steps to push this project to GitHub and convert `user-stories.md` directly into GitHub Issues.

### 1) Initialize git and create a GitHub repo

You can use GitHub CLI (recommended):

```bash
cd /Users/hamad/Projects/fisal
git init
git add .
git commit -m "chore: initial commit with user stories and tools"

# Create a new repo (set --public or --private)
gh repo create fisal --source . --public --push --confirm
```

If you can't use `gh`, create a repo manually on GitHub, then:

```bash
git remote add origin git@github.com:<YOUR_USER_OR_ORG>/fisal.git
git push -u origin main
```

### 2) Prepare environment and install dependencies

```bash
cd /Users/hamad/Projects/fisal
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a GitHub token (classic or fine-grained) with `repo` scope, then export it:

```bash
export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3) Dry-run: preview the issues to be created

```bash
python tools/create_github_issues.py \
  --repo <YOUR_USER_OR_ORG>/fisal \
  --path user-stories.md \
  --label user-story --dry-run
```

You will see the titles and bodies that will be created as GitHub issues.

Optional filters:

```bash
# Import only MVP range, for example US-001..US-110
python tools/create_github_issues.py \
  --repo <YOUR_USER_OR_ORG>/fisal \
  --since 1 --until 110 \
  --label user-story --label MVP \
  --path user-stories.md --dry-run
```

### 4) Create the issues on GitHub

```bash
python tools/create_github_issues.py \
  --repo <YOUR_USER_OR_ORG>/fisal \
  --path user-stories.md \
  --label user-story
```

This will create one issue per user story with a checklist for the acceptance criteria.

### Monorepo structure

-   frontend — Next.js/React
-   backend — API (NestJS/Node or Laravel)
-   mobile — React Native (future)
-   docs — documentation
-   docker — containerization and ops assets
-   .github — GitHub templates/workflows

### Notes

-   The script parses lines like `US-001: العنوان...` followed by a persona/goal line (e.g., يبدأ بـ "كمستخدم"/"كعميل"/"كمورد"/"كنظام") and a block headed by `معايير القبول:`. All lines in that block are turned into checklist items.
-   You can add additional labels with repeated `--label` flags. Use `--since`/`--until` to batch by phase.
