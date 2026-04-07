# Security Guide

This project now includes free baseline protections in the repository, but continuous security is a mix of code, CI, platform settings, and secret hygiene.

## Already Set Up In This Repo

- Security response headers in `next.config.mjs`
- Weekly Dependabot dependency update checks in `.github/dependabot.yml`
- A scheduled GitHub Actions vulnerability audit in `.github/workflows/security.yml`
- Existing CI build validation in `.github/workflows/webpack.yml`

## Free Controls To Enable In GitHub

In your repository settings:

1. Enable `Dependency graph`
2. Enable `Dependabot alerts`
3. Enable `Dependabot security updates`
4. Enable `Secret scanning` and `Push protection` if available for your repository plan/type
5. Turn on branch protection for `main`
6. Require pull requests before merge
7. Require status checks to pass before merge
8. Require 2FA on the account that owns the repo

Official GitHub docs:

- Dependabot security updates: https://docs.github.com/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates
- Dependabot version updates: https://docs.github.com/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates

## Free Controls To Enable In Vercel

In your Vercel project:

1. Store all secrets only in Vercel environment variables
2. Never commit production credentials into `.env`
3. Rotate API keys if any value has ever been exposed in screenshots, logs, commits, or chat
4. Restrict team/project access to only the people who need it
5. Review deployment logs regularly

## Secret Management Rules

- Keep production secrets only in Vercel/GitHub secrets
- Use different credentials for local, preview, and production
- Rotate these first if you suspect exposure:
  - `CLERK_SECRET_KEY`
  - `STRIPE_CLIENT_SECRET`
  - `OPEN_AI_KEY`
  - Instagram/Meta app secrets
  - `DATABASE_URL`

## Database Safety

- Use a managed PostgreSQL database with SSL enabled
- Create a least-privilege database user for the app
- Back up the database automatically
- Review Prisma migrations before deployment

## App-Level Recommendations

- Keep Clerk authentication required on protected routes
- Validate webhook verify tokens in production
- Return safe errors without leaking secrets or stack traces to clients
- Avoid logging tokens, session IDs, or full webhook payloads in production

## Ongoing Security Routine

Every week:

1. Review GitHub Security tab
2. Merge safe Dependabot PRs
3. Review failed audit workflow runs
4. Check Vercel environment variables and team access
5. Rotate any credentials that may have been exposed

Every month:

1. Update dependencies that are behind
2. Review Meta, Stripe, Clerk, and OpenAI app permissions
3. Review database access and backups

## Important Limitation

No setup can make an application "unhackable." The goal is layered defense:

- reduce attack surface
- detect issues early
- keep secrets out of code
- patch vulnerabilities quickly
- limit blast radius if something goes wrong
