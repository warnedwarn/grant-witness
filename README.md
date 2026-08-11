# GrantWitness

Money moves after proof—not after presentation.

GrantWitness turns a public grant into visible release gates. The contract freezes the mission and every obligation, fetches the submitted public source itself, stores an authenticated snapshot, and records the validator witness for the application to render.

## Decision model

The intelligent contract distinguishes:

- `FULFILLED` — the evidence covers the frozen obligations
- `CONDITIONAL` — meaningful delivery exists, with explicit gaps
- `NOT_FULFILLED` — the release gate has not been earned

The UI uses `submit_witness_package` for the complete witness request and then reads `get_charter`, `get_milestone`, and `get_witness`. The displayed result is contract state, not a caller-written or hard-coded claim.

## Safety boundary

GrantWitness records eligibility only. It contains no token-transfer or automatic payout path. A treasury can inspect the on-chain witness result and apply its own authorized release process.

## Verified StudioNet deployment

- Contract: `0xB57E4a8Dc5CB8b63E05aa2665de5f7579c738991`
- Deploy transaction: `0xf2f9657f152e9719094e6b6ed24b874563b1c8d197a6b9574d82eac2ebeb6dd3`
- Accepted workflow transaction: `0xd398db4c5a849d14a5a46d163c42bb2c74e6b6f587cd3897c90d6fab25f77d7a`
- Verified package: `GW-WEB-1786470592`

## Local studio

```bash
cd frontend
npm install
npm run dev
```

Use `npm run build` for the static production export.
