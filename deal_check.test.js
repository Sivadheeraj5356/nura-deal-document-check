import test from 'node:test';
import assert from 'node:assert/strict';
import {summarizeDocument, validateDealDocument} from './deal_check.js';

test('accepts a complete deal document', () => {
  const result = validateDealDocument({parcelId:'P-100',address:'1 Main St',loanAmount:400000,estimatedValue:650000});
  assert.deepEqual(result, {valid:true,missing:[],warnings:[]});
});

test('flags missing underwriting fields', () => {
  const result = validateDealDocument({parcelId:'P-101',loanAmount:400000});
  assert.equal(result.valid, false);
  assert.deepEqual(result.missing, ['address', 'estimatedValue']);
});

test('warns when the requested loan exceeds estimated value', () => {
  const document = {parcelId:'P-102',address:'2 Market St',loanAmount:900000,estimatedValue:700000};
  assert.equal(validateDealDocument(document).warnings[0], 'loan amount exceeds estimated value');
  assert.equal(summarizeDocument(document), 'Deal document needs review: warnings: loan amount exceeds estimated value.');
});
