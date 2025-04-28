"use client";
import { FormConfig, HasButtonInForm } from "./component/controls/FormConfig";
import FormComponent from "./component/controls/FormComponent";
import { ControlType } from "./component/controls/FormControlType";
import { Button } from "primereact/button";

export default function Home() {
  const formConfig: FormConfig[] = [
    {
      CTRL_KEY: "name",
      CTRL_TYPE: ControlType.INPUT,
      LABEL: "Name",
      PLACEHOLDER: "Enter your name",
      REQUIRED: true,
    },
    // {
    //   CTRL_KEY: "number",
    //   CTRL_TYPE: ControlType.NUMBER,
    //   LABEL: "number",
    //   PLACEHOLDER: "Enter your number",
    //   REQUIRED: true,
    // },
  ];

  const formConfigButton: HasButtonInForm = {
    HAS_BUTTON_SUBMIT: true,
    HAS_BUTTON_RESET: true,
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormComponent formConfig={formConfig} onSubmit={onSubmit} formConfigButton={formConfigButton}>
      {/* <Button type='submit' label='submit'></Button> */}
    </FormComponent>
  );
}
