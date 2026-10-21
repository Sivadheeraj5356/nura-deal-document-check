# Nura Deal Document Check

A small Node.js utility for validating real-estate deal intake documents before underwriting review. It checks required parcel, address, loan, and valuation fields and flags a loan request that exceeds the estimated property value.

Built as a focused Nura application project for deal analysis, document intake, and production data-quality workflows.

## Run tests

```bash
npm test
```

## Scope

- deterministic deal-document validation;
- missing-field reporting;
- loan-to-value sanity warnings;
- concise reviewer summaries.
