# Agent Instructions and Guidelines

This file defines project-level rules, workflows, and guidelines for AI agents operating in this repository (`anastasya/anastasya-store`).

## Workspace Guidelines
- **Framework & Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Prisma (PostgreSQL), Clerk auth.
- **Review & Verification**: Always verify builds and tests before marking tasks complete.
- **Code Style**: Maintain clean component structure, modular styling, and strict TypeScript types.

---

## The Core Agents

The repository is configured with 5 specialized agents defined under [`.antigravity/`](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/manifest.json):

1. **`plan`** ([manifest](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/plan.json) | [instructions](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/plan.md))
   - **Role**: Read-only architect.
   - **Mode**: `sandbox` (read-only; file edit/write tools disabled).
   - **Task**: Execute design-tree grilling, ingest `CONTEXT.md` and the existing codebase, and output `implementation_plan.md` and `PLAN.md` for explicit user approval before any code changes start.
   - **Scope**: Forbidden from modifying source code files; limited solely to reading the codebase and writing/updating the plan files.

2. **`build`** ([manifest](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/build.json) | [instructions](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/build.md))
   - **Role**: TDD implementer.
   - **Mode**: `auto` (permitted to run terminal commands and project test runners).
   - **Task**: Implement narrow vertical slices at interface seams. Enforce strict Red-Green TDD (write a failing test first, implement minimum viable code, verify it passes).
   - **Subagent Integration**: Automatically invoke the `advisor` and `tester` subagents for validation before marking any task as complete.

3. **`surgical`** ([manifest](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/surgical.json) | [instructions](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/surgical.md))
   - **Role**: Minimal-diff bug fixer.
   - **Mode**: `sandbox` (restricted writes, controlled tool calls).
   - **Task**: Diagnose the root cause first, then apply the fix using the smallest possible diff.
   - **Safety Rule**: Enforce the Circuit Breaker (~10% change cap per pass). Absolutely no opportunistic refactoring, style cleanup, or modifications outside the immediate bug target.

4. **`advisor`** ([manifest](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/advisor.json) | [instructions](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/advisor.md))
   - **Role**: Two-axis code reviewer (Standards + Spec compliance).
   - **Mode**: `subagent-only` (sandbox / read-only).
   - **Access Restriction**: This agent must **NOT** be selectable as a primary chat agent. It must only be invoked programmatically as a subagent (via `invoke_subagent`) by primary agents or during verification passes.
   - **Output Format**: Deliver structured reviews categorized by severity (`P1` / `P2` / `P3`), linking exact line references (`file#L<line>`) alongside actionable fixes.

5. **`tester`** ([manifest](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/tester.json) | [instructions](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/agents/tester.md))
   - **Role**: Automated test executor & regression verifier.
   - **Mode**: `subagent-only` (sandbox / test runner execution).
   - **Access Restriction**: Programmatically invoked by primary agents (`build`, `surgical`) or automated workflows.
   - **Output Format**: Reports exact exit codes, stdout, and failing assertions without truncation or fabrication.

---

## Global Baseline Constraints: 31 Universal Rules

All agents operating in this repository must strictly adhere to [The 31 Universal Rules](file:///home/xavierzaidane/projects/anastasya/anastasya-store/.antigravity/rules/31-universal-rules.md):
- **Truth & Verification**: Verify before claiming; zero fabrication; no silent failures; grounded diagnostics; exact line references.
- **Testing & TDD at Seams**: Red-Green-Refactor sequence; narrow vertical slices; test against interface seams; maintain regression gating.
- **Safety & Circuit Breakers**: ~10% change cap per pass; no unauthorized commits or pushes; no destructive terminal commands; zero collateral modifications.
- **Operational Hygiene**: Strict TypeScript and lint clean state; maintain existing comments; follow repository tech stack.
- **Review & Governance**: Structured two-axis reviews; triaged severities (P1/P2/P3); human-in-the-loop sign-off before plan execution.
