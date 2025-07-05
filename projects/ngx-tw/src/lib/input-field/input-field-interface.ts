import { ColorTypes } from '../color-types';

export type InputTypes =
  | 'text'
  | 'password'
  | 'email'
  | 'color'
  | 'date'
  | 'email'
  | 'number'
  | 'month'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'week';

export interface InputField {
  iconSuffix?: string;
  iconSuffixClass?: string;
  iconPrefix?: string;
  iconPrefixClass?: string;
  twClass?: string;
  name: string;
  label: string;
  maxLength?: number;
  minLength?: number;
  required: string | boolean;
  pattern: string | RegExp;
  placeholder: string;
  disabled: boolean;
  inputType: InputTypes;
  color?: ColorTypes;
  showLabel: boolean;
  multiline: boolean;
}
