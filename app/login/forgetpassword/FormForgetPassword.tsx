'use client';
import { z } from 'zod';
import FormComponent from '../../component/controls/FormComponent';
import { FormConfig, HasButtonInForm } from '../../component/controls/FormConfig';
import { ControlType } from '../../component/controls/FormControlType';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

const FormForgetPassword = () => {
  const router = useRouter();
  const formConfig: FormConfig[] = [
    {
      LABEL: 'Email',
      CTRL_KEY: 'email',
      CTRL_TYPE: ControlType.INPUT,
      DISABLED: false,
      REQUIRED: true,
      ERROR_MESSAGE: 'Email is required',
      PLACEHOLDER: 'Enter your email',
    },
  ];

  const hasButtonInForm: HasButtonInForm = {
    HAS_BUTTON_SUBMIT: true,
    HAS_BUTTON_RESET: false,
  };

  let schema = z
    .object({
      email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    })
    .partial()
    .required({ email: true });

  const onClickBack = () => {
    router.back();
  };
  return (
    <>
      <FormComponent formConfig={formConfig} schema={schema} formConfigButton={hasButtonInForm}>
        <Button type='button' label='Back to login' onClick={onClickBack}></Button>
      </FormComponent>
    </>
  );
};

export default FormForgetPassword;
