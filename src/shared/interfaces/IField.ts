interface IOptionBase {
  disabled?: boolean;
}

interface IStandardOption extends IOptionBase {
  value: string | number;
  label: string;
  icon?: string;
}

interface ICommonOption extends IOptionBase {
  id: string | number;
  name: string;
}

export type OptionType = IStandardOption | ICommonOption;
