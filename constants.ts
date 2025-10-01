
import { CalculatorConfig } from './types.ts';

export const CALCULATORS_CONFIG: CalculatorConfig[] = [
  {
    id: 'emi',
    type: 'EMI Calculator',
    description: 'Calculate your Equated Monthly Installment (EMI) for a loan.',
    fields: [
      { name: 'P', label: 'Loan Amount', type: 'number', description: 'The total principal loan amount.', control: 'input', defaultValue: '1000000' },
      { name: 'R', label: 'Annual Interest Rate', type: 'number', description: 'The annual rate of interest.', control: 'slider', min: 1, max: 25, step: 0.1, defaultValue: '8.5', unit: '%' },
      { name: 'N', label: 'Loan Tenure', type: 'number', description: 'The duration of the loan in years.', control: 'slider', min: 1, max: 40, step: 1, defaultValue: '20', unit: 'Years' },
    ],
    formula: '(P * (R/1200) * Math.pow(1 + (R/1200), N*12)) / (Math.pow(1 + (R/1200), N*12) - 1)',
    resultPrefix: '₹',
    resultDescription: 'Monthly EMI Payment'
  },
  {
    id: 'fixed-deposit',
    type: 'Fixed Deposit Calculator',
    description: 'Calculate the maturity value of your fixed deposit investment.',
    fields: [
      { name: 'P', label: 'Principal Amount', type: 'number', description: 'The initial amount of your investment.', control: 'input', defaultValue: '100000' },
      { name: 'R', label: 'Annual Interest Rate', type: 'number', description: 'The annual rate of interest.', control: 'slider', min: 1, max: 15, step: 0.1, defaultValue: '6.5', unit: '%' },
      { name: 'T', label: 'Tenure', type: 'number', description: 'The investment duration in years.', control: 'slider', min: 1, max: 20, step: 1, defaultValue: '5', unit: 'Years'},
    ],
    formula: 'P * Math.pow((1 + R/100), T)',
    resultPrefix: '₹',
    resultDescription: 'Maturity Value'
  },
  {
    id: 'recurring-deposit',
    type: 'Recurring Deposit Calculator',
    description: 'Calculate the maturity value of your recurring deposit investment.',
    fields: [
      { name: 'I', label: 'Monthly Installment', type: 'number', description: 'The amount you invest each month.', control: 'input', defaultValue: '5000' },
      { name: 'R', label: 'Annual Interest Rate', type: 'number', description: 'The annual rate of interest.', control: 'slider', min: 1, max: 15, step: 0.1, defaultValue: '7', unit: '%' },
      { name: 'N', label: 'Tenure', type: 'number', description: 'The investment duration in years.', control: 'slider', min: 1, max: 20, step: 1, defaultValue: '10', unit: 'Years' },
    ],
    // M = I * [((1 + r)^n - 1) / r], where n is months, r is monthly interest rate
    formula: 'I * ((Math.pow(1 + R/1200, N*12) - 1) / (R/1200))',
    resultPrefix: '₹',
    resultDescription: 'Maturity Value'
  },
  {
    id: 'loan-eligibility',
    type: 'Loan Eligibility Calculator',
    description: 'Estimate the loan amount you may be eligible for.',
    fields: [
      { name: 'I', label: 'Monthly Income', type: 'number', description: 'Your gross monthly income.', control: 'input', defaultValue: '50000' },
      { name: 'E', label: 'Monthly Expenses', type: 'number', description: 'Your total monthly expenses.', control: 'input', defaultValue: '20000' },
      { name: 'R', label: 'Annual Interest Rate', type: 'number', description: 'The expected annual interest rate.', control: 'slider', min: 1, max: 25, step: 0.1, defaultValue: '10', unit: '%' },
      { name: 'N', label: 'Loan Tenure', type: 'number', description: 'The desired loan tenure in years.', control: 'slider', min: 1, max: 40, step: 1, defaultValue: '20', unit: 'Years' },
      { name: 'EMI_PERCENT', label: 'Affordable EMI Percentage', type: 'number', description: 'The percentage of your disposable income you want to use for the EMI.', control: 'slider', min: 1, max: 80, step: 1, defaultValue: '50', unit: '%' },
    ],
    formula: '(((I - E) * (EMI_PERCENT/100)) * (Math.pow(1 + (R/1200), N*12) - 1)) / ((R/1200) * Math.pow(1 + (R/1200), N*12))',
    resultPrefix: '₹',
    resultDescription: 'Eligible Loan Amount'
  },
];