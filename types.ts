
export interface CalculatorField {
  label: string;
  name: string;
  type: 'number';
  description?: string;
  control?: 'input' | 'slider';
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string;
  unit?: string;
}

export interface CalculatorConfig {
  id: string;
  type: string;
  fields: CalculatorField[];
  formula: string;
  description: string;
  resultPrefix?: string;
  resultSuffix?: string;
  resultDescription: string;
}
