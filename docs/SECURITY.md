# Security Policy

## Reporting a Vulnerability
If you discover a security vulnerability, please report it responsibly to [email@example.com]. Do not publicly disclose the vulnerability until it has been addressed.

## Data Handling
- Avoid hardcoding sensitive credentials in the codebase.
- Use environment variables for sensitive information.
- Ensure data backups follow secure protocols as outlined in `BACKUP_STRATEGY.md`.

## Dependencies
- Regularly update dependencies to patch known vulnerabilities.
- Run `npm audit` regularly to check for security advisories.
