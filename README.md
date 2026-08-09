# GrantWitness

Money moves after proof—not after presentation.

GrantWitness turns a public grant into a sequence of visible release gates. A witness package carries the frozen mission, its obligations, the milestone under review, and the submitted evidence. GenLayer validators read those terms semantically and return a fulfillment decision without transferring funds automatically.

## Decision model

The intelligent contract distinguishes:

- `FULFILLED` — the evidence covers the frozen obligations
- `CONDITIONAL` — meaningful delivery exists, with explicit gaps
- `NOT_FULFILLED` — the release gate has not been earned

The UI uses a single `submit_witness_package` transaction for the complete witness request, avoiding duplicate wallet prompts. Results preserve covered obligations, missing obligations, a rationale, and validator confidence.

## Safety boundary

GrantWitness records eligibility only. It contains no token-transfer or automatic payout path. A treasury can inspect the on-chain witness result and apply its own authorized release process.

Deployed on GenLayer Bradbury: `0x3949C1866c3eADEbD13C1F48c4927E34B75b3902`

## Local studio

```bash
cd frontend
npm install
npm run dev
```

Use `npm run build` for the static production export.
