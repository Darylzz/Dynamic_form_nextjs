import { ControlType } from './FormControlType';

export interface FormConfig {
  CTRL_KEY: string;
  CTRL_TYPE: ControlType;
  LABEL: string;
  REQUIRED: boolean;
  PLACEHOLDER?: string;
  OPTION?: any[]; // for select, radio
  OPTION_LABEL?: string;
  OPTION_VALUE?: string;
  MASK_PLACE?: string;
  DEFAULT_VALUE?: any;
  SHOW_ICON?: boolean;
  SHOW_ICON_CLEAR?: boolean;
  DISABLED: boolean;
  ERROR_MESSAGE?: string;
  AUTO_RESIZE?: boolean;
  MIN?: number;
  MAX?: number;
  EMPTY_MESSAGE?: string;
  OPTIONS?: any[];
  WIDTH?: string;
  FILTER_MULTISELECT?: boolean;
  MAX_SELECTED_LABEL?: number;
  MIN_DATE?: Date;
  MAX_DATE?: Date;
  SHOW_ICON_CARLENDAR?: boolean;
  TOGGLE_MASK_PASSWORD?: boolean;
  ROW_TEXTAREA?: number;
  COL_TEXTAREA?: number;
  AUTO_RESIZE_TEXTAREA?: boolean;
  onChange?: (value: any) => void;
}

export interface HasButtonInForm {
  HAS_BUTTON_SUBMIT?: boolean;
  HAS_BUTTON_RESET?: boolean;
}

export interface SetFormValue {
  name: string;
  value: any;
}

export interface Options {
  name: string;
  code: string;
}

export interface SetErrorType {
  name: string;
  type: string;
  message: string;
}
