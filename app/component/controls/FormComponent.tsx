"use client";
import { useForm, Controller } from "react-hook-form";
import { FormConfig } from "./FormConfig";
import { ControlType } from "./FormControlType";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const FormComponent = ({ ...props }) => {
  const { formConfig, onSubmit, formConfigButton } = props;
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const handleClick = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formConfig.map((form: FormConfig) => (
        <div key={form.CTRL_KEY} className='flex flex-col'>
          <label>
            {form.LABEL} {form.REQUIRED ? <span style={{ color: "red" }}>*</span> : null}
          </label>
          {form.CTRL_TYPE === ControlType.INPUT && (
            <Controller
              name={form.CTRL_KEY}
              control={control}
              rules={{ required: { value: !!form.REQUIRED, message: form.ERROR_MESSAGE ?? "Required" } }}
              render={({ field, fieldState }) => {
                console.log(fieldState, field);
                return (
                  <>
                    <InputText invalid={!!fieldState.error || !!fieldState.isTouched} {...field} placeholder={form.PLACEHOLDER} />
                    {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                  </>
                );
              }}
            />
          )}
        </div>
      ))}
      <div className='flex gap-3 mt-3'>
        {formConfigButton?.HAS_BUTTON_SUBMIT ? <Button type='submit' label='submit'></Button> : null}
        {formConfigButton?.HAS_BUTTON_RESET ? <Button type='button' label='reset' onClick={handleClick}></Button> : null}
        {props.children}
      </div>
    </form>
  );
};

export default FormComponent;
