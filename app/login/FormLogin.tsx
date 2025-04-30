'use client';

import { z } from 'zod';
import FormComponent from '../component/controls/FormComponent';
import { FormConfig, HasButtonInForm, SetErrorType } from '../component/controls/FormConfig';
import { ControlType } from '../component/controls/FormControlType';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FormLogin = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<SetErrorType[]>([]);
  const formConfig: FormConfig[] = [
    {
      LABEL: 'Username',
      CTRL_KEY: 'username',
      CTRL_TYPE: ControlType.INPUT,
      DISABLED: false,
      REQUIRED: true,
      ERROR_MESSAGE: 'Username is required',
      PLACEHOLDER: 'Enter your username',
    },
    {
      LABEL: 'Password',
      CTRL_KEY: 'password',
      CTRL_TYPE: ControlType.PASSWORD,
      DISABLED: false,
      REQUIRED: true,
      ERROR_MESSAGE: 'Password is required',
      PLACEHOLDER: 'Enter your password',
    },
  ];

  const hasButtonForm: HasButtonInForm = {
    HAS_BUTTON_SUBMIT: true,
    HAS_BUTTON_RESET: false,
  };
  // จัดการ validation ด้วย zod library
  let schema = z
    .object({
      username: z.string().email('Invalid email'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
    })
    .partial()
    .required({
      username: true,
      password: true,
    });

  const onClickNavigate = () => {
    router.push('/login/forgetpassword');
  };

  const onSubmit = (data: any) => {
    console.log(data);
    if (data.username === 'test@example.com') {
      const error: SetErrorType[] = [
        {
          name: 'username',
          type: 'custom',
          message: 'invalid username or password',
        },
        {
          name: 'password',
          type: 'custom',
          message: 'invalid username or password',
        },
      ];
      setErrors(error);
      //วิธี set error แบบ  dynamic กรณีที่อาจจะต้องมีไปเช็คกับ api ก่อนเพื่อ get message something ก่อนจึงทำการ handle error ต่อได้ ต้องส่งเป็น array เท่านั้น
    }
  };

  return (
    <>
      <FormComponent formConfig={formConfig} schema={schema} onSubmit={onSubmit} formConfigButton={hasButtonForm} errors={errors}>
        <Button type='button' label='Forget password' onClick={onClickNavigate}></Button>
      </FormComponent>
    </>
  );
};

export default FormLogin;
