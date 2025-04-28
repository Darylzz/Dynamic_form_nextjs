import { ControlType } from "./FormControlType";

export interface FormConfig {
  CTRL_KEY: string;
  CTRL_TYPE: ControlType;
  LABEL: string;
  REQUIRED?: boolean;
  PLACEHOLDER?: string;
  OPTION?: any[]; // for select, radio
  OPTION_LABEL?: string;
  OPTION_VALUE?: string;
  MASK_PLACE?: string;
  DEFAULT_VALUE?: any;
  SHOW_ICON?: boolean;
  SHOW_ICON_CLEAR?: boolean;
  DISABLED?: boolean;
  ERROR_MESSAGE?: string;
  AUTO_RESIZE?: boolean;
}

export interface HasButtonInForm {
  HAS_BUTTON_SUBMIT?: boolean;
  HAS_BUTTON_RESET?: boolean;
}
