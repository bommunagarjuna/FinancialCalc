export interface CalculatorConfig {
  id: string;
  type: string;
  fields: CalculatorField[];
  formula: string;
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
