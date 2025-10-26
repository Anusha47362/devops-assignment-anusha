# GitHub Branching Strategy

## Overview
This document outlines the branching strategy for the DevOps assignment, demonstrating GitFlow workflow with feature, release, and hotfix branches.

## 🌳 Branch Structure

```
main (production)
├── hotfix/fix-critical-issue
├── release/v1.0.0
└── develop (integration)
    ├── feature/user-authentication
    ├── feature/api-endpoints
    └── feature/database-setup
```

## Branch Types

### 1. Main Branch (`main`)
- **Purpose**: Production-ready code
- **Protection**: Requires PR reviews before merge
- **Direct commits**: ❌ Not allowed

### 2. Develop Branch (`develop`) 
- **Purpose**: Integration branch for development
- **Source**: Branched from `main`
- **Target**: Features merge here first

### 3. Feature Branches (`feature/*`)
- **Purpose**: New features and enhancements
- **Naming**: `feature/feature-name`
- **Source**: Branched from `develop`
- **Target**: Merges back to `develop` via PR

### 4. Release Branches (`release/*`)
- **Purpose**: Prepare production releases
- **Naming**: `release/v1.0.0`
- **Source**: Branched from `develop`
- **Target**: Merges to both `main` and `develop`

### 5. Hotfix Branches (`hotfix/*`)
- **Purpose**: Critical production fixes
- **Naming**: `hotfix/fix-description`
- **Source**: Branched from `main`
- **Target**: Merges to both `main` and `develop`

## Workflow Process

### Feature Development
1. Create branch from `develop`: `git checkout -b feature/user-auth`
2. Implement feature and commit changes
3. Push branch: `git push origin feature/user-auth`
4. Create Pull Request to `develop`
5. Code review and approval
6. Merge to `develop`

### Release Process
1. Create release branch: `git checkout -b release/v1.0.0`
2. Final testing and bug fixes
3. Create PR to `main`
4. After merge, tag release: `git tag v1.0.0`
5. Merge back to `develop`

### Hotfix Process
1. Create hotfix branch from `main`: `git checkout -b hotfix/critical-fix`
2. Apply fix and test
3. Create PR to `main` for immediate deployment
4. Merge to `develop` to include fix

## Pull Request Requirements
- Descriptive title and description
- Code review by at least 1 reviewer
- All tests must pass
- No merge conflicts

## Code Review Guidelines
- Check code quality and standards
- Verify functionality works as expected
- Ensure proper testing is included
- Review security implications
- Provide constructive feedback

---

This branching strategy ensures code quality, enables parallel development, and maintains stable production releases.

## 📋 Naming Conventions

### Branch Naming Rules
```
feature/TICKET-NUMBER-short-description
release/vMAJOR.MINOR.PATCH
hotfix/TICKET-NUMBER-short-description
bugfix/TICKET-NUMBER-short-description
```

### Examples
- `feature/JIRA-123-user-login-system`
- `feature/GITHUB-456-api-rate-limiting`
- `release/v2.1.0`
- `hotfix/CRITICAL-789-sql-injection-fix`
- `bugfix/BUG-101-fix-email-validation`

### Commit Message Convention
```
type(scope): description

feat(auth): add OAuth2 integration
fix(api): resolve rate limiting issue
docs(readme): update branching strategy
chore(deps): update dependencies
```

## 🔄 Pull Request Review Process

### PR Requirements
- [ ] Descriptive title and detailed description
- [ ] Link to relevant ticket/issue
- [ ] All CI/CD checks pass
- [ ] Code coverage maintained (minimum 80%)
- [ ] At least 2 approving reviews required
- [ ] No merge conflicts
- [ ] Updated documentation (if applicable)

### Review Checklist
- [ ] Code follows project standards
- [ ] No hardcoded secrets or credentials
- [ ] Proper error handling implemented
- [ ] Security considerations addressed
- [ ] Performance impact evaluated
- [ ] Tests added for new functionality

### Reviewer Responsibilities
1. **Code Quality**: Check for best practices and standards
2. **Security**: Look for vulnerabilities and security issues
3. **Performance**: Evaluate impact on application performance
4. **Documentation**: Ensure code is well-documented
5. **Testing**: Verify adequate test coverage

## 🚀 Git Commands and Workflow

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/Anusha47362/devops-assignment-anusha.git
cd devops-assignment-anusha

# Create and switch to develop branch
git checkout -b develop
git push -u origin develop
```

### Feature Development Workflow

#### 1. Create Feature Branch
```bash
# Ensure you're on develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/JIRA-123-add-user-authentication
git push -u origin feature/JIRA-123-add-user-authentication
```

#### 2. Development and Commits
```bash
# Make your changes and commit
git add .
git commit -m "feat(auth): implement user login endpoint"

# Push changes
git push origin feature/JIRA-123-add-user-authentication
```

#### 3. Create Pull Request
```bash
# Via GitHub CLI (optional)
gh pr create --title "Add User Authentication System" \
  --body "Implements OAuth2 authentication with JWT tokens. Fixes JIRA-123" \
  --base develop \
  --head feature/JIRA-123-add-user-authentication
```

#### 4. After PR Approval and Merge
```bash
# Switch back to develop and clean up
git checkout develop
git pull origin develop
git branch -d feature/JIRA-123-add-user-authentication
git push origin --delete feature/JIRA-123-add-user-authentication
```

### Release Workflow

#### 1. Create Release Branch
```bash
# From develop branch
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0
git push -u origin release/v1.2.0
```

#### 2. Prepare Release
```bash
# Update version numbers, changelog, etc.
git add .
git commit -m "chore(release): prepare v1.2.0"
git push origin release/v1.2.0
```

#### 3. Merge to Main
```bash
# Create PR to main branch
gh pr create --title "Release v1.2.0" \
  --body "Release version 1.2.0 with new features and bug fixes" \
  --base main \
  --head release/v1.2.0

# After approval and merge, tag the release
git checkout main
git pull origin main
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin v1.2.0
```

#### 4. Merge Back to Develop
```bash
# Create PR to merge release changes back to develop
gh pr create --title "Merge release/v1.2.0 to develop" \
  --body "Merge release changes back to develop branch" \
  --base develop \
  --head release/v1.2.0
```

### Hotfix Workflow

#### 1. Create Hotfix Branch
```bash
# From main branch
git checkout main
git pull origin main
git checkout -b hotfix/CRITICAL-789-fix-security-vulnerability
git push -u origin hotfix/CRITICAL-789-fix-security-vulnerability
```

#### 2. Apply Fix and Test
```bash
# Make the critical fix
git add .
git commit -m "fix(security): patch SQL injection vulnerability"
git push origin hotfix/CRITICAL-789-fix-security-vulnerability
```

#### 3. Merge to Main (Emergency Process)
```bash
# Create PR to main
gh pr create --title "HOTFIX: Critical Security Vulnerability" \
  --body "Fixes critical SQL injection vulnerability. Requires immediate deployment." \
  --base main \
  --head hotfix/CRITICAL-789-fix-security-vulnerability

# After merge, create tag
git checkout main
git pull origin main
git tag -a v1.1.1 -m "Hotfix v1.1.1 - Security patch"
git push origin v1.1.1
```

#### 4. Merge to Develop
```bash
# Ensure hotfix is also in develop
gh pr create --title "Merge hotfix to develop" \
  --body "Merge hotfix changes to develop branch" \
  --base develop \
  --head hotfix/CRITICAL-789-fix-security-vulnerability
```

## 🛡️ Branch Protection Rules

### Main Branch Protection
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Restrict pushes that create files larger than 100MB
- Require signed commits

### Develop Branch Protection
- Require pull request reviews before merging
- Require status checks to pass before merging
- Allow force pushes (for emergency situations)

## 🔧 GitHub Repository Settings

### Required Status Checks
- Continuous Integration (CI) pipeline
- Code quality checks (SonarQube/CodeClimate)
- Security scanning (Snyk/Dependabot)
- Unit test coverage (minimum 80%)

### Auto-merge Conditions
- All required reviews approved
- All status checks passed
- No merge conflicts
- Branch is up to date

## 📚 Additional Resources

### Useful Git Aliases
```bash
# Add these to your ~/.gitconfig
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    lg = log --oneline --decorate --graph --all
```

### GitHub CLI Commands
```bash
# Install GitHub CLI
# Ubuntu/Debian: sudo apt install gh
# macOS: brew install gh

# Common commands
gh auth login
gh repo clone Anusha47362/devops-assignment-anusha
gh pr list
gh pr create
gh pr merge
gh issue list
```

## 🎯 Best Practices

1. **Keep branches small and focused**: One feature per branch
2. **Regular commits**: Commit early and often with meaningful messages
3. **Stay updated**: Regularly pull from develop to avoid conflicts
4. **Test before PR**: Ensure all tests pass locally
5. **Clean history**: Use interactive rebase to clean up commit history
6. **Delete merged branches**: Clean up after successful merges
7. **Use draft PRs**: For work-in-progress that needs early feedback

## 📊 Workflow Diagram

```
main ←--- hotfix/fix-critical-bug
  ↑           ↓
  └─── release/v1.2.0
         ↑     ↓
      develop ←┘
         ↑
    feature/add-login
    feature/new-api
    feature/ui-update
```

---

**Repository**: devops-assignment-anusha  
**Owner**: Anusha47362  
**Current Branch**: main