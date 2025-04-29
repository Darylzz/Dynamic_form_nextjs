'use client';
import './FormComponent.css';
import { useForm, Controller } from 'react-hook-form';
import { FormConfig, SetFormValue } from './FormConfig';
import { ControlType } from './FormControlType';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';

const FormComponent = ({ ...props }) => {
  const { formConfig, onSubmit, formConfigButton, initialFormValue } = props;

  const [optionsAutocomplete, setOptionsAutoComplete] = useState<any[]>([]);

  useEffect(() => {
    const indexAutoComplete = formConfig.findIndex((item: FormConfig) => item.CTRL_TYPE === ControlType.AUTOCOMPLETE);
    if (indexAutoComplete !== -1) {
      setOptionsAutoComplete(formConfig[indexAutoComplete].OPTIONS ?? []);
    }
  });

  useEffect(() => {
    console.log(initialFormValue);
    if (initialFormValue.length > 0) {
      initialFormValue.forEach((item: SetFormValue) => {
        setValue(item.name, item.value);
      });
    }
  }, [initialFormValue]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm();

  const completeMethodAutoComplete = (event: AutoCompleteCompleteEvent) => {
    console.log(event);
    const filter = optionsAutocomplete.filter((item: any) => {
      return item.name.toLowerCase().includes(event.query.toLowerCase());
    });
    setOptionsAutoComplete(filter);
  };

  const handleClickReset = () => {
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-3 gap-3'>
          {formConfig.map((form: FormConfig) => (
            <div key={form.CTRL_KEY} className={`${form.WIDTH ?? ''} flex flex-col`}>
              <label>
                {form.LABEL} {form.REQUIRED ? <span className='text-red-500'>*</span> : null}
              </label>
              {form.CTRL_TYPE === ControlType.INPUT && (
                <Controller
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <InputText
                          key={form.CTRL_KEY}
                          invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                          name={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value, form.onChange && form.onChange(e.target.value))}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          placeholder={form.PLACEHOLDER}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.NUMBER && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    const value = typeof field.value === 'string' ? parseInt(field.value) : field.value;
                    return (
                      <>
                        <InputNumber
                          invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                          name={field.name}
                          value={value}
                          onChange={(e) => field.onChange(e.value, form.onChange && form.onChange(e.value))}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          placeholder={form.PLACEHOLDER}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.PHONE && (
                <Controller
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputMask
                        invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                        name={field.name}
                        value={field.value}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        placeholder={form.PLACEHOLDER}
                        mask={form.PLACEHOLDER}
                        onChange={(e) => field.onChange(e.target.value, form.onChange && form.onChange(e.target.value))}
                      />
                      {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                    </>
                  )}
                />
              )}
              {form.CTRL_TYPE === ControlType.AUTOCOMPLETE && (
                <Controller
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => (
                    <>
                      <AutoComplete
                        className='w-full'
                        invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                        name={field.name}
                        value={field.value}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        placeholder={form.PLACEHOLDER}
                        onChange={(e) => field.onChange(e.target.value, form.onChange && form.onChange(e.target.value))}
                        emptyMessage={form.EMPTY_MESSAGE}
                        suggestions={optionsAutocomplete}
                        completeMethod={(e) => completeMethodAutoComplete(e)}
                        field='name'
                      />
                      {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                    </>
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className='flex gap-3 mt-3'>
          {formConfigButton?.HAS_BUTTON_SUBMIT ? <Button type='submit' label='submit'></Button> : null}
          {formConfigButton?.HAS_BUTTON_RESET ? <Button type='button' label='reset' onClick={handleClickReset}></Button> : null}
          {props.children}
        </div>
      </form>
    </>
  );
};

export default FormComponent;
