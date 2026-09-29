import {TimePicker as MuiTimePicker} from '@mui/x-date-pickers/TimePicker';
import type {TimePickerProps as MuiTimePickerProps} from '@mui/x-date-pickers/TimePicker';
import type {
  PickerValidDate,
  TimeValidationError,
} from '@mui/x-date-pickers/models';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {
  pickerTextFieldSlotProps,
  pickerValueProps,
} from './internal/bindings.js';
import {
  splitPickerProps,
  usePickerController,
} from './internal/usePickerController.js';
import type {PickerControllerProps} from './internal/usePickerController.js';
import type {PickersTextFieldProps} from '@mui/x-date-pickers/PickersTextField';
import type {FieldHandlerProps} from '@stackworx/react-hook-form-mui';

export type TimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> =
  & PickerControllerProps<
    TFieldValues,
    TName,
    PickerValidDate | null,
    TTransformedValues
  >
  & FieldHandlerProps<
    Parameters<NonNullable<MuiTimePickerProps['onChange']>>,
    Parameters<NonNullable<PickersTextFieldProps['onBlur']>>
  >
  & Omit<
    MuiTimePickerProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >
  & {helperText?: ReactNode};

/** MUI X TimePicker bound to RHF; the form value is the adapter date, or `transform`'s output. */
export function TimePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: TimePickerProps<TFieldValues, TName, TTransformedValues>) {
  const [
    controllerProps,
    {
      helperText,
      onError,
      slotProps,
      handleChange,
      handleBlur,
      suppressFormChange,
      ...rest
    },
  ] = splitPickerProps<
    TFieldValues,
    TName,
    PickerValidDate | null,
    TimePickerProps<TFieldValues, TName, TTransformedValues>,
    TTransformedValues
  >(props);
  const picker = usePickerController<
    TFieldValues,
    TName,
    PickerValidDate | null,
    TimeValidationError,
    TTransformedValues
  >(controllerProps, null);

  return (
    <MuiTimePicker
      {...rest}
      {...pickerValueProps(picker, onError, {
        handleChange,
        suppressFormChange,
      })}
      slotProps={{
        ...slotProps,
        textField: pickerTextFieldSlotProps(
          picker,
          slotProps?.textField,
          helperText,
          handleBlur,
        ),
      }}
    />
  );
}
