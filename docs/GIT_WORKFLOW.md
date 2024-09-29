# Git Workflow Guide

## Branching Strategy
- **Main**: Stable production-ready code.
- **Develop**: Active development and integration of new features.
- **Feature Branches**: Created from `develop` for specific tasks.

## Commit Message Format
- **Format**: `[Type] Short Description (Max 50 Characters)`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

## Code Review Process
- Open a Pull Request (PR) from `feature` to `develop`.
- Request a code review and await approval before merging.

## Common Commands
- **Create a branch**: `git checkout -b feature/branch-name`
- **Commit changes**: `git commit -m "[Type] Short description"`
- **Push to GitHub**: `git push origin feature/branch-name`
- **Merge**: Use GitHub’s interface to merge PRs after approval.
