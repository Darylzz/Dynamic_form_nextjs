'use client';

import { useEffect, useState } from 'react';
import { FormConfig, HasButtonInForm, SetFormValue } from '../component/controls/FormConfig';
import { ControlType } from '../component/controls/FormControlType';
import FormComponent from '../component/controls/FormComponent';

export default function FormPlayground() {
  const [initialFormValue, setInitialFormValue] = useState<SetFormValue[]>([]);
  const formConfig: FormConfig[] = [
    {
      CTRL_KEY: 'name',
      CTRL_TYPE: ControlType.INPUT,
      LABEL: 'Name',
      PLACEHOLDER: 'Enter your name',
      REQUIRED: false,
      ERROR_MESSAGE: 'Name is required',
      onChange: (value: string) => {},
      DISABLED: true,
      WIDTH: 'col-span-2',
    },
    {
      CTRL_KEY: 'number',
      CTRL_TYPE: ControlType.NUMBER,
      LABEL: 'number',
      PLACEHOLDER: 'Enter your number',
      REQUIRED: true,
      ERROR_MESSAGE: 'number is required',
      onChange: (value: number) => {},
      DISABLED: false,
    },
    {
      CTRL_KEY: 'phone',
      CTRL_TYPE: ControlType.PHONE,
      LABEL: 'phone',
      PLACEHOLDER: '(+669) 9999-9999',
      REQUIRED: true,
      ERROR_MESSAGE: 'phone is required',
      DISABLED: false,
      onChange: (value: string) => {},
    },
    {
      CTRL_KEY: 'autocomplete',
      CTRL_TYPE: ControlType.AUTOCOMPLETE,
      LABEL: 'autocomplete',
      PLACEHOLDER: 'Enter your autocomplete',
      REQUIRED: true,
      ERROR_MESSAGE: 'autocomplete is required',
      DISABLED: false,
      OPTIONS: [],
      OPTION_LABEL: 'name',
      onChange: (value: string) => {
        console.log(value);
      },
    },
    {
      CTRL_KEY: 'checkbox',
      CTRL_TYPE: ControlType.CHECKBOX,
      LABEL: 'checkbox',
      PLACEHOLDER: 'Enter your checkbox',
      REQUIRED: true,
      ERROR_MESSAGE: 'checkbox is required',
      DISABLED: false,
      onChange: (value: boolean) => {
        console.log(value);
      },
      DEFAULT_VALUE: false,
    },
    {
      CTRL_KEY: 'multiselect',
      CTRL_TYPE: ControlType.MULTICHIP,
      LABEL: 'multiselect',
      PLACEHOLDER: 'Enter your multiselect',
      REQUIRED: true,
      ERROR_MESSAGE: 'multiselect is required',
      DISABLED: false,
      onChange: (value: any[]) => {
        console.log(value);
      },
      OPTIONS: [],
      FILTER_MULTISELECT: true,
      OPTION_LABEL: 'name',
      MAX_SELECTED_LABEL: 2,
    },
    {
      CTRL_KEY: 'datepicker',
      CTRL_TYPE: ControlType.DATEPICKER,
      LABEL: 'datepicker',
      PLACEHOLDER: 'Enter your date',
      REQUIRED: true,
      ERROR_MESSAGE: 'datepicker is required',
      DISABLED: false,
      onChange: (value: Date) => {
        console.log(value);
      },
      DEFAULT_VALUE: new Date(),
      MIN_DATE: new Date(),
      MAX_DATE: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      SHOW_ICON_CARLENDAR: true,
    },
    {
      CTRL_KEY: 'password',
      CTRL_TYPE: ControlType.PASSWORD,
      LABEL: 'password',
      PLACEHOLDER: 'Enter your password',
      REQUIRED: true,
      ERROR_MESSAGE: 'password is required',
      DISABLED: false,
      onChange: (value: string) => {
        console.log(value);
      },
      TOGGLE_MASK_PASSWORD: true,
    },
    {
      CTRL_KEY: 'textarea',
      CTRL_TYPE: ControlType.TEXTAREA,
      LABEL: 'textarea',
      PLACEHOLDER: 'Enter your textarea',
      REQUIRED: true,
      ERROR_MESSAGE: 'textarea is required',
      DISABLED: false,
      onChange: (value: string) => console.log(value),
      ROW_TEXTAREA: 5,
      COL_TEXTAREA: 20,
      AUTO_RESIZE_TEXTAREA: true,
    },
    {
      CTRL_KEY: 'radiobutton',
      CTRL_TYPE: ControlType.RADIOBUTTON,
      LABEL: 'radiobutton',
      PLACEHOLDER: 'Enter your radiobutton',
      REQUIRED: true,
      ERROR_MESSAGE: 'radiobutton is required',
      DISABLED: false,
      onChange: (value: string) => console.log(value),
      OPTIONS: [],
    },
  ];

  const formConfigButton: HasButtonInForm = {
    HAS_BUTTON_SUBMIT: true,
    HAS_BUTTON_RESET: true,
  };

  useEffect(() => {
    const options = [
      { name: 'test1', code: 'test1' },
      { name: 'test2', code: 'test2' },
      { name: 'test3', code: 'test3' },
      { name: 'test4', code: 'test4' },
    ];
    const indexAutoComplete = formConfig.findIndex((item: FormConfig) => item.CTRL_TYPE === ControlType.AUTOCOMPLETE);
    const indexMultiSelect = formConfig.findIndex((item: FormConfig) => item.CTRL_TYPE === ControlType.MULTISELECT);
    const indexMultiChip = formConfig.findIndex((item: FormConfig) => item.CTRL_TYPE === ControlType.MULTICHIP);
    const indexRadioButton = formConfig.findIndex((item: FormConfig) => item.CTRL_TYPE === ControlType.RADIOBUTTON);
    if (indexAutoComplete !== -1) {
      formConfig[indexAutoComplete].OPTIONS = options;
    }
    if (indexMultiSelect !== -1) {
      formConfig[indexMultiSelect].OPTIONS = options;
    }
    if (indexMultiChip !== -1) {
      formConfig[indexMultiChip].OPTIONS = options;
    }
    if (indexRadioButton !== -1) {
      formConfig[indexRadioButton].OPTIONS = options;
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    if (data.name === 'test') {
      setInitialFormValue([
        { name: 'name', value: 'testSetFormValue' },
        { name: 'number', value: 123456789 },
      ]);
      //วิธี set value ของ form ให้ส่ง name ที่มีค่าเดียวกันกับ field พร้อมกับ value ที่ต้องการจะ set เข้าไป
    }
  };

  return (
    <FormComponent formConfig={formConfig} onSubmit={onSubmit} formConfigButton={formConfigButton} initialFormValue={initialFormValue}>
      {/* <Button type='submit' label='submit'></Button> */}
    </FormComponent>
  );
}
