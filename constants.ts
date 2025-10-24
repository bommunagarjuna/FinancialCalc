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
    resultDescription: 'Monthly EMI Payment',
    chartConfig: {
        total: 'result * N * 12',
        breakdown: [
          { name: 'Principal', value: 'P', color: '#3b82f6' },
          { name: 'Interest', value: 'result * N * 12 - P', color: '#ef4444' },
        ],
      },
    projectionTableConfig: {
      columns: [
        { key: 'month', label: 'Month' },
        { key: 'principal', label: 'Principal' },
        { key: 'interest', label: 'Interest' },
        { key: 'total', label: 'Total' },
        { key: 'balance', label: 'Balance' },
      ],
      generateRows: (formValues, result) => {
        const P = formValues.P;
        const R = formValues.R;
        const N = formValues.N;
        const monthlyInterestRate = R / 1200;
        const emi = result;
        let balance = P;
        const rows = [];
        for (let i = 1; i <= N * 12; i++) {
          const interest = balance * monthlyInterestRate;
          const principal = emi - interest;
          balance -= principal;
          rows.push({
            month: i,
            principal: principal.toFixed(2),
            interest: interest.toFixed(2),
            total: emi.toFixed(2),
            balance: balance.toFixed(2),
          });
        }
        return rows;
      },
    },
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
    resultDescription: 'Maturity Value',
    chartConfig: {
        total: 'result',
        breakdown: [
          { name: 'Principal', value: 'P', color: '#3b82f6' },
          { name: 'Interest', value: 'result - P', color: '#10b981' },
        ],
      },
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
    resultDescription: 'Maturity Value',
    chartConfig: {
        total: 'result',
        breakdown: [
          { name: 'Total Investment', value: 'I * N * 12', color: '#3b82f6' },
          { name: 'Interest Earned', value: 'result - (I * N * 12)', color: '#10b981' },
        ],
      },
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
  {
    id: 'sip',
    type: 'SIP Calculator',
    description: 'Calculate the future value of your Systematic Investment Plan (SIP).',
    fields: [
      { name: 'I', label: 'Monthly Investment', type: 'number', description: 'The amount you invest each month.', control: 'input', defaultValue: '10000' },
      { name: 'R', label: 'Expected Annual Return', type: 'number', description: 'The expected annual rate of return.', control: 'slider', min: 1, max: 30, step: 0.5, defaultValue: '12', unit: '%' },
      { name: 'N', label: 'Investment Period', type: 'number', description: 'The investment duration in years.', control: 'slider', min: 1, max: 40, step: 1, defaultValue: '15', unit: 'Years' },
    ],
    // M = I * [((1 + r)^n - 1) / r] * (1+r), where n is months, r is monthly interest rate
    formula: 'I * ((Math.pow(1 + R/1200, N*12) - 1) / (R/1200)) * (1 + R/1200)',
    resultPrefix: '₹',
    resultDescription: 'Future Value',
    chartConfig: {
        total: 'result',
        breakdown: [
          { name: 'Total Investment', value: 'I * N * 12', color: '#3b82f6' },
          { name: 'Interest Earned', value: 'result - (I * N * 12)', color: '#10b981' },
        ],
      },
    projectionTableConfig: {
      columns: [
        { key: 'year', label: 'Year' },
        { key: 'investment', label: 'Investment' },
        { key: 'interest', label: 'Interest' },
        { key: 'total', label: 'Total' },
      ],
      generateRows: (formValues, result) => {
        const I = formValues.I;
        const R = formValues.R;
        const N = formValues.N;
        const monthlyRate = R / 1200;
        const rows = [];
        let total = 0;
        for (let i = 1; i <= N; i++) {
          let investment = 0;
          let interest = 0;
          for (let j = 1; j <= 12; j++) {
            total = (total + I) * (1 + monthlyRate);
            investment += I;
          }
          interest = total - (I * i * 12);
          rows.push({
            year: i,
            investment: (I * i * 12).toFixed(2),
            interest: interest.toFixed(2),
            total: total.toFixed(2),
          });
        }
        return rows;
      },
    },
  },
  {
    id: 'blade-interest',
    type: 'Blade Interest Calculator',
    description: 'Calculate simple interest for short-term loans, often calculated on a daily or monthly basis.',
    fields: [
      { name: 'P', label: 'Principal Amount', type: 'number', description: 'The total principal loan amount.', control: 'input', defaultValue: '10000' },
      { name: 'R', label: 'Monthly Interest Rate', type: 'number', description: 'The rate of interest per month.', control: 'slider', min: 1, max: 20, step: 0.5, defaultValue: '2', unit: '%' },
      { name: 'T', label: 'Time Period', type: 'number', description: 'The duration of the loan in days.', control: 'slider', min: 1, max: 150, step: 1, defaultValue: '30', unit: 'Days' },
    ],
    formula: '(P * (R/100) * T) / 30', // Assuming a 30-day month for simplicity
    resultPrefix: '₹',
    resultDescription: 'Total Interest Amount',
    chartConfig: {
        total: 'result + P',
        breakdown: [
          { name: 'Principal', value: 'P', color: '#3b82f6' },
          { name: 'Interest', value: 'result', color: '#ef4444' },
        ],
      },
  },
  {
    id: 'debt-payoff',
    type: 'Debt Payoff Calculator',
    description: 'Calculate how long it will take to pay off a debt. This can be used for snowball or avalanche methods by analyzing one debt at a time.',
    fields: [
      { name: 'P', label: 'Total Debt Amount', type: 'number', description: 'The total principal debt amount.', control: 'input', defaultValue: '500000' },
      { name: 'R', label: 'Annual Interest Rate', type: 'number', description: 'The annual rate of interest on the debt.', control: 'slider', min: 1, max: 30, step: 0.1, defaultValue: '15', unit: '%' },
      { name: 'M', label: 'Monthly Payment', type: 'number', description: 'Your fixed monthly payment.', control: 'input', defaultValue: '15000' },
    ],
    // N = -log(1 - (P * r) / M) / log(1 + r), where r is monthly interest rate. Result is in months, convert to years.
    formula: '(-Math.log(1 - (P * (R/1200)) / M) / Math.log(1 + (R/1200))) / 12',
    resultPrefix: '',
    resultDescription: 'Years to Pay Off Debt'
  },
  {
    id: 'loan-payoff',
    type: 'Loan Payoff Calculator',
    description: 'Calculate how much faster you can pay off your loan with extra payments.',
    fields: [
        { name: 'P', label: 'Loan Amount', type: 'number', description: 'The total principal loan amount.', control: 'input', defaultValue: '25000' },
        { name: 'R', label: 'Annual Interest Rate', type: 'number', description: 'The annual rate of interest.', control: 'slider', min: 1, max: 25, step: 0.1, defaultValue: '10', unit: '%' },
        { name: 'M', label: 'Monthly Payment', type: 'number', description: 'Your regular monthly payment.', control: 'input', defaultValue: '500' },
        { name: 'E', label: 'Extra Monthly Payment', type: 'number', description: 'Any extra amount you want to pay each month.', control: 'input', defaultValue: '100' },
    ],
    formula: '(-Math.log(1 - (P * (R/1200)) / (M + E)) / Math.log(1 + (R/1200))) / 12',
    resultPrefix: '',
    resultDescription: 'Years to Pay Off Loan'
  },
  {
    id: 'retirement',
    type: 'Retirement Calculator',
    description: 'Project your savings growth until retirement.',
    fields: [
        { name: 'C', label: 'Current Age', type: 'number', description: 'Your current age.', control: 'slider', min: 18, max: 60, step: 1, defaultValue: '30' },
        { name: 'R', label: 'Retirement Age', type: 'number', description: 'The age you plan to retire.', control: 'slider', min: 50, max: 80, step: 1, defaultValue: '65' },
        { name: 'S', label: 'Current Savings', type: 'number', description: 'Your current retirement savings.', control: 'input', defaultValue: '50000' },
        { name: 'M', label: 'Monthly Contribution', type: 'number', description: 'The amount you contribute monthly.', control: 'input', defaultValue: '500' },
        { name: 'I', label: 'Annual Interest Rate', type: 'number', description: 'Expected annual return on your investments.', control: 'slider', min: 1, max: 20, step: 0.5, defaultValue: '8', unit: '%' },
    ],
    formula: 'S * Math.pow(1 + I/100, R - C) + M * 12 * ((Math.pow(1 + I/100, R - C) - 1) / (I/100))',
    resultPrefix: '₹',
    resultDescription: 'Estimated Retirement Savings'
  },
  {
    id: 'indian-interest',
    type: 'Indian Interest Calculator',
    description: 'Calculate compound interest with annual compounding, based on a start and end date. Assumes a monthly interest rate.',
    fields: [
      { name: 'principal', label: 'Principal Amount', type: 'number', description: 'The total principal loan amount.', control: 'input', defaultValue: '100000' },
      { name: 'monthlyRate', label: 'Monthly Interest Rate', type: 'number', description: 'The interest rate per month (e.g., for 2%, enter 2).', control: 'slider', min: 0.5, max: 5, step: 0.1, defaultValue: '2', unit: '%' },
      { name: 'startDate', label: 'Start Date', type: 'date', description: 'The date the amount was taken.', control: 'input', defaultValue: new Date().toISOString().split('T')[0] },
      { name: 'endDate', label: 'End Date', type: 'date', description: 'The date to calculate the interest to.', control: 'input', defaultValue: new Date().toISOString().split('T')[0] },
    ],
    calculate: (formValues) => {
      const { principal, monthlyRate, startDate, endDate } = formValues;
      const p = parseFloat(principal);
      const r = parseFloat(monthlyRate) / 100; // monthly rate
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(p) || isNaN(r) || !start.getTime() || !end.getTime() || start >= end) {
        return 0;
      }

      let totalInterest = 0;
      let currentPrincipal = p;
      let loopDate = new Date(start);

      // 1. Loop through years for compounding
      while (true) {
        let nextYearDate = new Date(loopDate);
        nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);

        if (nextYearDate <= end) {
          // A full year has passed. Calculate 12 months of interest and compound.
          const interestForYear = currentPrincipal * r * 12;
          totalInterest += interestForYear;
          currentPrincipal += interestForYear;
          loopDate = nextYearDate;
        } else {
          break;
        }
      }

      // 2. Now, from loopDate, calculate remaining interest without compounding
      // `currentPrincipal` is the principal for this final partial year.
      
      // Loop through remaining full months
      while (true) {
        let nextMonthDate = new Date(loopDate);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        if (nextMonthDate <= end) {
          totalInterest += currentPrincipal * r;
          loopDate = nextMonthDate;
        } else {
          break;
        }
      }

      // 3. Calculate interest for remaining days
      const remainingMillis = end.getTime() - loopDate.getTime();
      if (remainingMillis > 0) {
        // Prorate based on the number of days in the current month
        const daysInMonth = new Date(loopDate.getFullYear(), loopDate.getMonth() + 1, 0).getDate();
        const dailyRate = (currentPrincipal * r) / daysInMonth;
        const remainingDays = remainingMillis / (1000 * 60 * 60 * 24);
        totalInterest += dailyRate * remainingDays;
      }

      return totalInterest;
    },
    resultPrefix: '₹',
    resultDescription: 'Total Interest Amount',
    chartConfig: {
        total: 'result + principal',
        breakdown: [
          { name: 'Principal', value: 'principal', color: '#3b82f6' },
          { name: 'Interest', value: 'result', color: '#ef4444' },
        ],
      },
  },
  {
    id: 'lumpsum',
    type: 'Lumpsum Calculator',
    description: 'Calculate the future value of a one-time lumpsum investment.',
    fields: [
      { name: 'P', label: 'Total Investment', type: 'number', description: 'The total principal amount.', control: 'input', defaultValue: '100000' },
      { name: 'R', label: 'Expected Annual Return', type: 'number', description: 'The expected annual rate of return.', control: 'slider', min: 1, max: 30, step: 0.5, defaultValue: '12', unit: '%' },
      { name: 'T', label: 'Investment Period', type: 'number', description: 'The investment duration in years.', control: 'slider', min: 1, max: 40, step: 1, defaultValue: '10', unit: 'Years' },
    ],
    formula: 'P * Math.pow(1 + R/100, T)',
    resultPrefix: '₹',
    resultDescription: 'Future Value',
    chartConfig: {
        total: 'result',
        breakdown: [
          { name: 'Principal', value: 'P', color: '#3b82f6' },
          { name: 'Interest', value: 'result - P', color: '#10b981' },
        ],
      },
  },
  {
    id: 'mutual-fund',
    type: 'Mutual Fund Returns Calculator',
    description: 'Calculate the future value of your mutual fund investments (lumpsum + SIP).',
    fields: [
      { name: 'P', label: 'Initial Investment (Optional)', type: 'number', description: 'A one-time lumpsum amount you have already invested.', control: 'input', defaultValue: '50000' },
      { name: 'I', label: 'Monthly SIP', type: 'number', description: 'The amount you invest each month.', control: 'input', defaultValue: '5000' },
      { name: 'R', label: 'Expected Annual Return', type: 'number', description: 'The expected annual rate of return.', control: 'slider', min: 1, max: 30, step: 0.5, defaultValue: '12', unit: '%' },
      { name: 'N', label: 'Investment Period', type: 'number', description: 'The investment duration in years.', control: 'slider', min: 1, max: 40, step: 1, defaultValue: '15', unit: 'Years' },
    ],
    calculate: ({ P, I, R, N }) => {
      const fvLumpsum = P * Math.pow(1 + R/100, N);
      const fvSip = I * ((Math.pow(1 + R/1200, N*12) - 1) / (R/1200)) * (1 + R/1200);
      return fvLumpsum + fvSip;
    },
    resultPrefix: '₹',
    resultDescription: 'Estimated Future Value',
    chartConfig: {
        total: 'result',
        breakdown: [
          { name: 'Total Investment', value: 'P + (I * N * 12)', color: '#3b82f6' },
          { name: 'Interest Earned', value: 'result - (P + (I * N * 12))', color: '#10b981' },
        ],
      },
  },
  {
    id: 'swp',
    type: 'SWP (Systematic Withdrawal Plan) Calculator',
    description: 'Calculate how long your investment corpus will last with a Systematic Withdrawal Plan (SWP).',
    fields: [
      { name: 'P', label: 'Total Investment', type: 'number', description: 'Your total investment corpus.', control: 'input', defaultValue: '1000000' },
      { name: 'W', label: 'Monthly Withdrawal', type: 'number', description: 'The amount you withdraw each month.', control: 'input', defaultValue: '8000' },
      { name: 'R', label: 'Expected Annual Return', type: 'number', description: 'The expected annual growth rate of your investment.', control: 'slider', min: 1, max: 20, step: 0.5, defaultValue: '7', unit: '%' },
    ],
    formula: '(-Math.log(1 - (P * (R/1200)) / W) / Math.log(1 + (R/1200))) / 12',
    resultSuffix: ' Years',
    resultDescription: 'Your money will last for approximately',
  },
    {
    id: 'ppf',
    type: 'PPF Calculator',
    description: 'Calculate the maturity value of your Public Provident Fund (PPF) investment.',
    fields: [
      { name: 'I', label: 'Yearly Investment', type: 'number', description: 'The amount you invest each year.', control: 'input', defaultValue: '150000' },
      { name: 'R', label: 'Annual Interest Rate', type: 'number', description: 'The current PPF interest rate.', control: 'slider', min: 5, max: 10, step: 0.1, defaultValue: '7.1', unit: '%' },
      { name: 'N', label: 'Investment Period', type: 'number', description: 'The duration of the investment in years (min 15).', control: 'slider', min: 15, max: 50, step: 1, defaultValue: '15', unit: 'Years' },
    ],
    calculate: ({ I, R, N }) => {
      let balance = 0;
      for (let i = 0; i < N; i++) {
        balance = (balance + I) * (1 + R/100);
      }
      return balance;
    },
    resultPrefix: '₹',
    resultDescription: 'Maturity Value',
    chartConfig: {
        total: 'result',
        breakdown: [
          { name: 'Total Investment', value: 'I * N', color: '#3b82f6' },
          { name: 'Interest Earned', value: 'result - (I * N)', color: '#10b981' },
        ],
      },
  },
  {
    id: 'ssy',
    type: 'Sukanya Samriddhi Yojana Calculator',
    description: 'Calculate the maturity value of a Sukanya Samriddhi Yojana (SSY) investment.',
    fields: [
      { name: 'I', label: 'Yearly Investment', type: 'number', description: 'The amount you invest each year.', control: 'input', defaultValue: '150000' },
      { name: 'R', label: 'Annual Interest Rate', type: 'number', description: 'The current SSY interest rate.', control: 'slider', min: 5, max: 12, step: 0.1, defaultValue: '8.2', unit: '%' },
    ],
    calculate: ({ I, R }) => {
      let balance = 0;
      const investmentYears = 15;
      const maturityYears = 21;
      for (let year = 1; year <= maturityYears; year++) {
        if (year <= investmentYears) {
          balance += I;
        }
        balance *= (1 + R / 100);
      }
      return balance;
    },
    resultPrefix: '₹',
    resultDescription: 'Maturity Value (at 21 years)',
    chartConfig: {
        total: 'result',
        breakdown: [
          { name: 'Total Investment', value: 'I * 15', color: '#3b82f6' },
          { name: 'Interest Earned', value: 'result - (I * 15)', color: '#10b981' },
        ],
      },
  },
  {
    id: 'gst-add',
    type: 'GST Adder Calculator',
    description: 'Calculate the net price after adding GST to a base amount.',
    fields: [
      { name: 'A', label: 'Base Amount', type: 'number', description: 'The initial amount before GST.', control: 'input', defaultValue: '1000' },
      { name: 'R', label: 'GST Rate', type: 'number', description: 'The GST percentage to apply.', control: 'slider', min: 1, max: 28, step: 1, defaultValue: '18', unit: '%' },
    ],
    formula: 'A * (1 + R/100)',
    resultPrefix: '₹',
    resultDescription: 'Total Amount (including GST)',
  },
  {
    id: 'gst-remove',
    type: 'GST Remover Calculator',
    description: 'Calculate the base amount and GST by removing the GST component from a total price.',
    fields: [
      { name: 'A', label: 'Total Amount', type: 'number', description: 'The total amount including GST.', control: 'input', defaultValue: '1180' },
      { name: 'R', label: 'GST Rate', type: 'number', description: 'The GST percentage included in the total.', control: 'slider', min: 1, max: 28, step: 1, defaultValue: '18', unit: '%' },
    ],
    formula: 'A / (1 + R/100)',
    resultPrefix: '₹',
    resultDescription: 'Base Amount (before GST)',
    chartConfig: {
        total: 'A',
        breakdown: [
          { name: 'Base Amount', value: 'result', color: '#3b82f6' },
          { name: 'GST', value: 'A - result', color: '#ef4444' },
        ],
      },
  },
  {
    id: 'income-tax',
    type: 'Income Tax Calculator',
    description: 'Estimate your income tax liability based on the new tax regime in India.',
    fields: [
      { name: 'income', label: 'Gross Annual Income', type: 'number', description: 'Your total annual salary and other income.', control: 'input', defaultValue: '1200000' },
    ],
    calculate: ({ income }) => {
      const CESS = 0.04;
      let tax = 0;
      // As per FY 2023-24, income up to 7 lakhs is rebateable, but slabs apply otherwise.
      // Standard Deduction of 50k is applicable.
      const taxableIncome = income - 50000;

      if (taxableIncome <= 700000) {
        return 0; // Tax rebate under 87A
      }

      if (taxableIncome > 300000) tax += (Math.min(taxableIncome, 600000) - 300000) * 0.05;
      if (taxableIncome > 600000) tax += (Math.min(taxableIncome, 900000) - 600000) * 0.10;
      if (taxableIncome > 900000) tax += (Math.min(taxableIncome, 1200000) - 900000) * 0.15;
      if (taxableIncome > 1200000) tax += (Math.min(taxableIncome, 1500000) - 1200000) * 0.20;
      if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
      
      const finalTax = tax > 0 ? tax * (1 + CESS) : 0;
      return finalTax;
    },
    resultPrefix: '₹',
    resultDescription: 'Tax Payable (New Regime, FY 2023-24)',
  },
];