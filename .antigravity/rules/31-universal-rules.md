# The 31 Universal Rules for AI Agents

These rules form the mandatory baseline constraints for all agents operating in this repository (`plan`, `build`, `surgical`, `advisor`, and any auxiliary subagents). Every agent must strictly adhere to these rules at all times.

---

## Pillar I: Truth & Verification

1. **Verify Before Claiming**: Never declare a task complete, a bug fixed, or a test passing without executing the appropriate verification command or test suite and inspecting the actual output.
2. **Zero Fabrication**: Never invent or hallucinate command outputs, test results, line numbers, API schemas, or file contents.
3. **No Silent Failures**: Never swallow, ignore, or obscure error codes, stderr streams, failed assertions, or compiler warnings.
4. **Grounded Diagnostics**: Every diagnostic hypothesis must cite concrete, reproducible evidence (stack traces, logs, or failing test outputs).
5. **Exact References**: Always refer to code locations using precise file paths and line ranges (`file#L<line>` or `file#L<start>-L<end>`).
6. **Explicit Uncertainty**: Clearly articulate assumptions, unknowns, and trade-offs rather than proceeding on unverified guesses.
7. **Fresh State Inspection**: Always inspect the current filesystem and environment state directly rather than assuming past conversation context remains accurate.

---

## Pillar II: Testing & Red-Green TDD at Seams

8. **Strict Red-Green-Refactor Flow**: When developing features or fixing bugs, first write a failing test demonstrating the target behavior or defect, confirm failure, implement the minimum viable solution, and verify green.
9. **Narrow Vertical Slices**: Implement features in thin, discrete, end-to-end vertical slices that connect interfaces and data flows rather than sweeping horizontal rewrites.
10. **Test at Interface Seams**: Place test boundaries at stable component, module, and API interface seams rather than coupling tests to brittle internal implementation details.
11. **Deterministic Test Execution**: Ensure all tests run deterministically without timing flakiness, race conditions, or unmanaged shared state.
12. **Behavioral Assertions**: Test behavior, contracts, user interactions, and external side effects rather than private variable state.
13. **Assertion & Suite Integrity**: Never weaken assertions, delete existing tests, or comment out suites to manufacture a green test run.
14. **Mandatory Regression Gating**: Every bug fix must include an automated regression test that fails prior to the fix and passes thereafter.

---

## Pillar III: Safety & Circuit Breakers

15. **Circuit Breaker Cap**: Never exceed a ~10% change budget or file modification limit in a single pass without explicit human review and approval.
16. **No Unauthorized Commits or Pushes**: Never run `git commit`, `git push`, branch deletions, or remote modifications without explicit, user-granted authorization.
17. **Destructive Command Ban**: Strictly forbid destructive actions (`rm -rf`, `git reset --hard`, destructive database operations, or force-pushes) without prior human sign-off.
18. **Strict Scope Containment**: Confine code modifications exclusively to files and symbols directly required for the active objective.
19. **Reversible Changes**: Maintain clear rollback readiness; all code modifications must remain cleanly diffable and easy to revert.
20. **Secret & Credential Isolation**: Never commit, log, or transmit secrets, environment tokens, private keys, or credentials.

---

## Pillar IV: Operational Hygiene & Code Craftsmanship

21. **Strict TypeScript & Linter Compliance**: Ensure all code passes TypeScript compilation (`tsc`) and linter checks with zero unresolved type errors or unjustified `any` usages.
22. **Component Modularity**: Maintain single-responsibility React components, clean separation of concerns, and clean hooks/utilities.
23. **Preserve Documentation Integrity**: Retain all existing code comments, docstrings, and architectural documentation unless they are directly invalidated by intentional changes.
24. **Dependency Discipline**: Do not add new external npm dependencies without evaluating bundle size, security, and obtaining explicit confirmation.
25. **Repository Tech Stack Alignment**: Conform strictly to the established workspace stack (Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Prisma, Clerk).
26. **Single-Purpose Modality**: Do not bundle unrelated refactors, formatting sweeps, or opportunistic cleanups into functional changes or bug fixes.

---

## Pillar V: Review, Subagent Governance & Human-in-the-Loop

27. **Two-Axis Code Review**: Evaluate changes along both Spec Compliance (functional correctness against requirements) and Standards Compliance (architectural integrity and style).
28. **Severity-Categorized Feedback**: Categorize all review findings into standardized severities: `P1` (Blocker / Correctness / Security), `P2` (Maintainability / High Risk), and `P3` (Polish / Optimization).
29. **Subagent Role Demarcation**: Primary agents must delegate review and test validation to specialized subagents (`advisor`, `tester`) and honor separation of responsibilities.
30. **Actionable Remediation**: Provide concrete, line-referenced remediation proposals and code diffs for every identified defect.
31. **Human-in-the-Loop Gating**: Require explicit human sign-off on implementation plans, architecture designs, and breaking changes before applying changes to the codebase.
