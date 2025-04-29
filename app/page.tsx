'use client';
import { FormConfig, HasButtonInForm, SetFormValue } from './component/controls/FormConfig';
import FormComponent from './component/controls/FormComponent';
import { ControlType } from './component/controls/FormControlType';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';

export default function Home() {
  const [initialFormValue, setInitialFormValue] = useState<SetFormValue[]>([]);
  const formConfig: FormConfig[] = [
    {
      CTRL_KEY: 'name',
      CTRL_TYPE: ControlType.INPUT,
      LABEL: 'Name',
      PLACEHOLDER: 'Enter your name',
      REQUIRED: true,
      ERROR_MESSAGE: 'Name is required',
      onChange: (value: string) => {},
      DISABLED: false,
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
      onChange: (value: string) => {
        console.log(value);
      },
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
    formConfig[indexAutoComplete].OPTIONS = options;
  });

  const onSubmit = (data: any) => {
    console.log(data);
    if (data.name === 'test') {
      setInitialFormValue([
        { name: 'name', value: 'testSetFormValue' },
        { name: 'number', value: 123456789 },
      ]);
    }
  };

  return (
    <FormComponent formConfig={formConfig} onSubmit={onSubmit} formConfigButton={formConfigButton} initialFormValue={initialFormValue}>
      {/* <Button type='submit' label='submit'></Button> */}
    </FormComponent>
  );
}
