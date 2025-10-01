
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
];