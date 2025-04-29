'use client';
import './FormComponent.css';
import { useForm, Controller } from 'react-hook-form';
import { FormConfig, Options, SetFormValue } from './FormConfig';
import { ControlType } from './FormControlType';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { SyntheticEvent, useEffect, useState } from 'react';
import { FormEvent } from 'primereact/ts-helpers';

const FormComponent = ({ ...props }) => {
  const { formConfig, onSubmit, formConfigButton, initialFormValue } = props;

  const [optionsAutocomplete, setOptionsAutoComplete] = useState<Options[]>([]);
  const [optionMultiSelect, setOptionMultiSelect] = useState<Options[]>([]);
  const [optionMultiChip, setOptionMultiChip] = useState<Options[]>([]);
  const [checkedRadioButton, setCheckedRadioButton] = useState<Options>();

  useEffect(() => {
    //state นี้จะเป็นการ initial ค่า options ให้กับ autocomplete
    const indexAutoComplete = formConfig.findIndex((item: FormConfig) => item.CTRL_TYPE === ControlType.AUTOCOMPLETE);
    const indexMultiSelect = formConfig.findIndex((item: FormConfig) => item.CTRL_TYPE === ControlType.MULTISELECT);
    const indexMultiChip = formConfig.findIndex((item: FormConfig) => item.CTRL_TYPE === ControlType.MULTICHIP);
    if (indexAutoComplete !== -1) {
      setOptionsAutoComplete(formConfig[indexAutoComplete].OPTIONS ?? []);
    }
    if (indexMultiSelect !== -1) {
      setOptionMultiSelect(formConfig[indexMultiSelect].OPTIONS ?? []);
    }
    if (indexMultiChip !== -1) {
      setOptionMultiChip(formConfig[indexMultiChip].OPTIONS ?? []);
    }
  });

  useEffect(() => {
    //จะ set form value เมื่อ state initialFormValue มีการเปลี่ยนแปลง จะเป็นการส่ง state จากหน้าที่มีการเรียกใช้ form control อีกที
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
                  key={form.CTRL_KEY}
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
                          disabled={form.DISABLED}
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
                          key={form.CTRL_KEY}
                          invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                          name={field.name}
                          value={value}
                          onChange={(e) => field.onChange(e.value, form.onChange && form.onChange(e.value))}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          placeholder={form.PLACEHOLDER}
                          disabled={form.DISABLED}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.PHONE && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputMask
                        key={form.CTRL_KEY}
                        invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                        name={field.name}
                        value={field.value}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        placeholder={form.PLACEHOLDER}
                        mask={form.PLACEHOLDER}
                        onChange={(e) => field.onChange(e.target.value, form.onChange && form.onChange(e.target.value))}
                        disabled={form.DISABLED}
                      />
                      {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                    </>
                  )}
                />
              )}
              {form.CTRL_TYPE === ControlType.AUTOCOMPLETE && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => (
                    <>
                      <AutoComplete
                        key={form.CTRL_KEY}
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
                        field={form.OPTION_LABEL}
                        disabled={form.DISABLED}
                      />
                      {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                    </>
                  )}
                />
              )}
              {form.CTRL_TYPE === ControlType.CHECKBOX && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    console.log(field);
                    return (
                      <>
                        <Checkbox
                          key={form.CTRL_KEY}
                          invalid={fieldState.error !== undefined}
                          checked={field.value}
                          name={field.name}
                          ref={field.ref}
                          onChange={(e) => field.onChange(e.checked, form.onChange && form.onChange(e.checked))}
                          disabled={form.DISABLED}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.MULTISELECT && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <MultiSelect
                          key={form.CTRL_KEY}
                          name={field.name}
                          invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                          ref={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          emptyMessage={form.EMPTY_MESSAGE}
                          options={optionMultiSelect}
                          placeholder={form.PLACEHOLDER}
                          filter={form.FILTER_MULTISELECT ?? false}
                          optionLabel={form.OPTION_LABEL}
                          onChange={(e: MultiSelectChangeEvent) => {
                            field.onChange(e.target.value, form.onChange && form.onChange(e.target.value));
                          }}
                          maxSelectedLabels={form.MAX_SELECTED_LABEL}
                          selectionLimit={form.MAX_SELECTED_LABEL}
                          disabled={form.DISABLED}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.MULTICHIP && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <MultiSelect
                          key={form.CTRL_KEY}
                          name={field.name}
                          invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                          ref={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          emptyMessage={form.EMPTY_MESSAGE}
                          options={optionMultiChip}
                          placeholder={form.PLACEHOLDER}
                          filter={form.FILTER_MULTISELECT ?? false}
                          optionLabel={form.OPTION_LABEL}
                          onChange={(e: MultiSelectChangeEvent) => {
                            field.onChange(e.target.value, form.onChange && form.onChange(e.target.value));
                          }}
                          display='chip'
                          maxSelectedLabels={form.MAX_SELECTED_LABEL}
                          selectionLimit={form.MAX_SELECTED_LABEL}
                          disabled={form.DISABLED}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.DATEPICKER && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <Calendar
                          key={form.CTRL_KEY}
                          name={field.name}
                          invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                          ref={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          placeholder={form.PLACEHOLDER}
                          onChange={(e: FormEvent<Date, SyntheticEvent<Element, Event>>) => {
                            field.onChange(e.target.value, form.onChange && form.onChange(e.target.value));
                          }}
                          minDate={form.MIN_DATE}
                          maxDate={form.MAX_DATE}
                          showIcon={form.SHOW_ICON_CARLENDAR}
                          disabled={form.DISABLED}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.PASSWORD && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <Password
                          key={form.CTRL_KEY}
                          name={field.name}
                          invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                          ref={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          placeholder={form.PLACEHOLDER}
                          onInput={(e: any) => {
                            field.onChange(e.target.value, form.onChange && form.onChange(e.target.value));
                          }}
                          toggleMask={form.TOGGLE_MASK_PASSWORD}
                          promptLabel='Choose a password'
                          weakLabel='Too simple'
                          mediumLabel='Average complexity'
                          strongLabel='Complex password'
                          disabled={form.DISABLED}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.TEXTAREA && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <InputTextarea
                          key={form.CTRL_KEY}
                          name={field.name}
                          invalid={fieldState.error !== undefined || (fieldState.isTouched && !fieldState.isDirty)}
                          ref={field.ref}
                          value={field.value}
                          onBlur={field.onBlur}
                          placeholder={form.PLACEHOLDER}
                          onChange={(e: any) => field.onChange(e.target.value, form.onChange && form.onChange(e.target.value))}
                          disabled={form.DISABLED}
                          autoResize={form.AUTO_RESIZE_TEXTAREA}
                          rows={form.ROW_TEXTAREA}
                          cols={form.COL_TEXTAREA}
                        />
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
                />
              )}
              {form.CTRL_TYPE === ControlType.RADIOBUTTON && (
                <Controller
                  key={form.CTRL_KEY}
                  name={form.CTRL_KEY}
                  control={control}
                  rules={{ required: { value: form.REQUIRED, message: form.ERROR_MESSAGE ?? 'Required' } }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        {form.OPTIONS?.map((item) => {
                          return (
                            <div className='flex gap-3'>
                              <RadioButton
                                key={form.CTRL_KEY}
                                inputId={item.code}
                                name={field.name}
                                invalid={fieldState.error !== undefined}
                                ref={field.ref}
                                value={item.code}
                                onBlur={field.onBlur}
                                placeholder={form.PLACEHOLDER}
                                onChange={(e: any) =>
                                  field.onChange(e.target.value, form.onChange && form.onChange(e.target.value), setCheckedRadioButton(item))
                                }
                                disabled={form.DISABLED}
                                checked={checkedRadioButton?.code === item.code}
                              />
                              <label htmlFor={item.code}>{item.name}</label>
                            </div>
                          );
                        })}
                        {fieldState.error !== undefined && <span className='text-red-500'>{fieldState.error.message || form.ERROR_MESSAGE}</span>}
                      </>
                    );
                  }}
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
