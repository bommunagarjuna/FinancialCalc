import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CALCULATORS_CONFIG } from '../constants.ts';
import type { CalculatorConfig, CalculatorField } from '../types.ts';
import Card from './ui/Card.tsx';
import Input from './ui/Input.tsx';
import Slider from './ui/Slider.tsx';
import { AlertCircleIcon, TrendingUpIcon } from './icons.tsx';

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const numToWords = (n: number): string => {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
};

const numberToIndianWords = (numStr: string): string => {
    if (!numStr || isNaN(parseFloat(numStr.replace(/,/g, '')))) {
        return '';
    }

    let n = parseInt(numStr.replace(/,/g, ''), 10);
    if (n === 0) return 'Zero';
    if (n > 999999999) {
        return 'Number is too large to display in words.';
    }

    const crore = Math.floor(n / 10000000);
    n %= 10000000;
    const lakh = Math.floor(n / 100000);
    n %= 100000;
    const thousand = Math.floor(n / 1000);
    n %= 1000;
    const hundred = Math.floor(n / 100);
    n %= 100;

    let res = '';
    if (crore > 0) res += numToWords(crore) + ' Crore ';
    if (lakh > 0) res += numToWords(lakh) + ' Lakh ';
    if (thousand > 0) res += numToWords(thousand) + ' Thousand ';
    if (hundred > 0) res += numToWords(hundred) + ' Hundred ';

    if (res !== '' && n > 0) res += 'and ';
    if (n > 0) res += numToWords(n);

    return res.trim();
};


const Calculator: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const [calculator, setCalculator] = useState<CalculatorConfig | undefined>(undefined);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getInitialFormValues = useCallback((calc: CalculatorConfig) => {
    return calc.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || '';
        return acc;
    }, {} as Record<string, string>);
  }, []);

  // Effect to setup calculator on ID change
  useEffect(() => {
    const currentCalculator = CALCULATORS_CONFIG.find(c => c.id === calculatorId);
    setCalculator(currentCalculator);
    
    if (currentCalculator) {
      setFormValues(getInitialFormValues(currentCalculator));
    }

    setResult(null);
    setError(null);
  }, [calculatorId, getInitialFormValues]);

  // Effect to perform calculation whenever form values change
  useEffect(() => {
    if (!calculator) return;

    const values: Record<string, number> = {};
    let isReadyForCalculation = true;

    // Validate all fields before calculating
    for (const field of calculator.fields) {
        const strValue = formValues[field.name];
        if (strValue === undefined || strValue.trim() === '') {
            isReadyForCalculation = false;
            break;
        }
        const numValue = parseFloat(strValue);
        if (isNaN(numValue) || numValue < 0) {
            isReadyForCalculation = false;
            break;
        }
        values[field.name] = numValue;
    }

    // If not all fields are valid and filled, reset result/error and exit
    if (!isReadyForCalculation) {
        setResult(null);
        setError(null);
        return;
    }

    setError(null); // Clear previous errors

    try {
        const paramNames = calculator.fields.map(f => f.name);
        const paramValues = paramNames.map(name => values[name]);
      
        // Using Function constructor as per original design for dynamic formulas
        const formula = calculator.formula;
        const calculate = new Function(...paramNames, `return ${formula}`);
        const calculatedResult = calculate(...paramValues);
      
        if (!isFinite(calculatedResult) || isNaN(calculatedResult)) {
            throw new Error("Calculation resulted in an invalid number. Please check your inputs.");
        }

        setResult(calculatedResult);
    } catch (e) {
        console.error("Calculation Error:", e);
        setError(e instanceof Error ? e.message : "An unexpected error occurred during calculation.");
        setResult(null);
    }
  }, [formValues, calculator]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  if (!calculator) {
    return <Card><p>Calculator not found.</p></Card>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{calculator.type}</h1>
        <p className="text-muted-foreground mt-2">{calculator.description}</p>
      </header>

      <Card>
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              {calculator.fields.map((field: CalculatorField) => {
                const isSlider = field.control === 'slider';
                const isAmountField = field.control === 'input';
                const amountInWords = isAmountField && formValues[field.name] ? numberToIndianWords(formValues[field.name]) : null;
                const fieldSpan = !isSlider ? 'md:col-span-2' : 'md:col-span-1';

                return (
                  <div key={field.name} className={fieldSpan}>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor={field.name} className="block text-sm font-medium text-foreground">{field.label}</label>
                      {isSlider && (
                        <span className="w-24 text-right text-sm font-semibold text-primary">
                          {formValues[field.name] || field.min} {field.unit}
                        </span>
                      )}
                    </div>
                    {isSlider ? (
                      <Slider
                        id={field.name}
                        name={field.name}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={formValues[field.name] || field.min}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formValues[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="mt-1"
                      />
                    )}
                    
                    {amountInWords && (
                      <p className="mt-2 text-xs text-primary font-medium" aria-live="polite">
                        {amountInWords} Rupees Only
                      </p>
                    )}

                    {field.description && <p className={`${amountInWords ? 'mt-1' : 'mt-2'} text-xs text-muted-foreground`}>{field.description}</p>}
                  </div>
                );
              })}
            </div>
        </div>
      </Card>

      {error && (
        <Card className="bg-red-50 border-red-200">
           <div className="p-4 flex items-start text-red-700">
            <AlertCircleIcon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Input Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {result !== null && (
        <Card className="bg-green-50 border-green-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUpIcon className="h-6 w-6 text-green-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-green-800 font-medium">{calculator.resultDescription}</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-900">
                    {calculator.resultPrefix}{result.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}{calculator.resultSuffix}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Calculator;