export interface CalculatorConfig {
  id: string;
  type: string;
  fields: CalculatorField[];
  formula?: string; // Make formula optional
  calculate?: (formValues: Record<string, any>) => number; // Add calculate function
  description: string;
  resultPrefix?: string;
  resultSuffix?: string;
  resultDescription: string;
  chartConfig?: {
    total: string;
    breakdown: {
      name: string;
      value: string;
      color: string;
    }[];
  };
  projectionTableConfig?: {
    columns: { key: string; label: string }[];
    generateRows: (formValues: Record<string, number>, result: number) => Record<string, any>[];
  };
}

export interface CalculatorField {
  name: string;
  label: string;
  type: 'number' | 'date'; // Add 'date' type
  control: 'input' | 'slider';
  description?: string;
  defaultValue?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}
