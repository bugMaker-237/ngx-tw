import { ColorTypes } from '../color-types';

export type ButtonType = 'basic' | 'outlined' | 'filled';
export type RoundedTypes = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface TwButton {
  /**
   * The type fo the button : basic, outlined, filled
   * @default basic
   */
  type?: ButtonType;
  /**
   * @default md
   */
  rounded?: RoundedTypes;
  color?: ColorTypes;
  isSubmit?: boolean;
  disabled?: boolean;
  twClass?: string;
  title?: string;
}
