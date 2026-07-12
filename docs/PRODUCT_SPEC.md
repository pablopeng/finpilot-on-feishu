# FinPilot on Feishu - MVP Product Specification

Live demo: <https://finpilot.zeabur.app/>

## 1. Product Positioning

FinPilot is not an automated stock-picking bot. It is a traceable financial research and wealth-service operating system designed for individual investors and small advisory teams.

The MVP demonstrates three promises:

1. Framework before recommendation.
2. Evidence before conclusion.
3. Compliance before external delivery.

## 2. Judge Experience

The judge should understand the product within one minute:

- Select a C-side or B-side scenario.
- Submit a prefilled user question.
- Watch the seven-agent execution trace.
- Inspect structured evidence, suitability checks, and generated content.
- Trigger a compliance approval.
- See the final record written back to a Feishu-style service ledger.

The demo uses clearly labeled sample data. It demonstrates product logic and orchestration rather than claiming production financial advice.

## 3. Shared State

All agents read and write structured fields. They do not pass free-form chat messages to one another.

```json
{
  "request_id": "FP-2026-001",
  "channel": "c_end | b_end",
  "user_profile": {
    "risk_level": "R2",
    "knowledge_level": "beginner",
    "goal": "education_fund",
    "horizon_months": 36,
    "liquidity_need": "medium",
    "profile_updated_at": "2026-07-01"
  },
  "intent": "market_volatility",
  "evidence": [],
  "product_facts": [],
  "draft": {},
  "compliance": {
    "risk_level": "medium",
    "hits": [],
    "approval_required": true
  },
  "approval": {
    "status": "pending",
    "reviewer": "compliance_owner"
  },
  "audit": []
}
```

## 4. Seven-Agent Orchestration

### 4.1 Risk Profile Agent

- Reads: profile, questionnaire, goal, horizon, liquidity need.
- Writes: risk level, knowledge level, missing fields, profile freshness.
- Gate: blocks personalized output when required fields are missing or stale.

### 4.2 Investment Framework Agent

- Reads: validated profile and intent.
- Writes: goal-risk-horizon-liquidity framework, action checklist, review cycle.
- Boundary: does not predict returns or output buy/sell instructions.

### 4.3 Evidence Retrieval Agent

- Reads: user question, topic, approved knowledge sources.
- Writes: evidence cards with source, date, summary, confidence, and uncertainty.
- Boundary: unsupported facts are marked for verification.

### 4.4 Product Understanding Agent

- Reads: product facts, fees, term, liquidity, risk rating.
- Writes: beginner explanation, advisor explanation, and risk disclosure checklist.
- Boundary: does not omit or soften product risk.

### 4.5 Viewpoint Challenger Agent

- Reads: user thesis, evidence, past reviews.
- Writes: counterarguments, fragile assumptions, monitoring indicators.
- Routing: primarily for advanced and research-oriented users.

### 4.6 Compliance Review Agent

- Reads: proposed external content and suitability state.
- Writes: prohibited-expression hits, missing disclosures, revised wording, approval level.
- Gate: high-risk content cannot be externally delivered without human approval.

### 4.7 Service Trace Agent

- Reads: final content, evidence, edits, approval, meeting/chat context.
- Writes: service record, follow-up task, dashboard fields, immutable audit timeline.

## 5. Orchestration Flow

```text
Request intake
  -> Risk Profile Agent
  -> Intent and user-tier routing
     -> Conservative beginner: Investment Framework Agent
     -> Advanced/research user: Viewpoint Challenger Agent
  -> Evidence Retrieval Agent + Product Understanding Agent
  -> Draft composition
  -> Compliance Review Agent
  -> Human approval when required
  -> Service Trace Agent
  -> Feishu Base writeback + Task creation + Dashboard update
```

## 6. Feishu Mapping

| Capability | Feishu component | MVP representation |
|---|---|---|
| Agent entry and routing | Feishu AI / intelligent partner | Scenario runner and execution trace |
| Shared workflow state | Base | Profile, source, product, service, and rule tables |
| Research corpus | Docs / Wiki | Evidence cards with source and timestamp |
| Compliance gate | Approval | Pending, approved, and returned states |
| Customer intake | IM / Form | Prefilled scenario question |
| Follow-up ownership | Tasks | Generated follow-up task |
| Conversation capture | Minutes | Meeting-summary writeback example |
| Metrics | Base dashboard | Response time, source coverage, approval rate |

## 7. Golden Path A - Conservative Beginner

Persona: Lin Xiaoyu, risk level R2, beginner, three-year education-fund goal.

Question: "The market is volatile. Should I adjust now?"

Expected flow:

1. Validate profile freshness.
2. Explain the goal-risk-horizon-liquidity framework.
3. Retrieve dated public evidence and mark uncertainty.
4. Explain product characteristics without recommending a transaction.
5. Run compliance review.
6. Produce an action checklist and 30-day review task.

## 8. Golden Path B - Advisor Workflow

Persona: Advisor Chen, serving customer Zhang Wei.

Task: Prepare a customer-facing explanation for a volatile market and a medium-risk fund product.

Expected flow:

1. Load customer profile and service history.
2. Build evidence pack and product explanation.
3. Generate customer copy and advisor notes.
4. Detect risky phrases and missing disclosures.
5. Submit to simulated Feishu approval.
6. Approve and write the final version to the service ledger.
7. Generate a follow-up task and update metrics.

## 9. MVP Screens

1. Overview dashboard and scenario selector.
2. Scenario workspace with customer profile and question.
3. Live seven-agent execution trace.
4. Evidence and product explanation panel.
5. Compliance review and approval panel.
6. Service ledger and KPI summary.

## 10. Out of Scope for the Submission MVP

- Real investment transactions.
- Personalized buy/sell recommendations.
- Production-grade model calls or financial data feeds.
- Claims that sample content is real financial advice.
- Full Feishu tenant integration before credentials and permissions are available.
