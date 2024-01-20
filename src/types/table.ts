interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType;
}

export interface FilterOption {
  title: string;
  value: string;
  options: Option[];
}
