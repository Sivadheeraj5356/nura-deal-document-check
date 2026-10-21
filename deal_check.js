const REQUIRED_FIELDS = ['parcelId', 'address', 'loanAmount', 'estimatedValue'];

export function validateDealDocument(document) {
  const missing = REQUIRED_FIELDS.filter((field) => document[field] === undefined || document[field] === null || document[field] === '');
  const warnings = [];
  if (!missing.includes('loanAmount') && !missing.includes('estimatedValue') && document.loanAmount > document.estimatedValue) {
    warnings.push('loan amount exceeds estimated value');
  }
  return {valid: missing.length === 0 && warnings.length === 0, missing, warnings};
}

export function summarizeDocument(document) {
  const result = validateDealDocument(document);
  if (result.valid) return `Deal document ${document.parcelId} is ready for underwriting review.`;
  const parts = [];
  if (result.missing.length) parts.push(`missing ${result.missing.join(', ')}`);
  if (result.warnings.length) parts.push(`warnings: ${result.warnings.join('; ')}`);
  return `Deal document needs review: ${parts.join(' and ')}.`;
}
