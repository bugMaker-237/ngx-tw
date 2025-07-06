import { InputField } from './input-field-interface';

export interface MaskConfig {
  mask: string | RegExp[];
  guide?: boolean;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  showMask?: boolean;
}

export interface MaskedInputField extends InputField {
  maskConfig: MaskConfig;
  allowAlphanumeric?: boolean;
  validator?: (value: string) => boolean | string;
}
