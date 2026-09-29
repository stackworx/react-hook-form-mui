import {DateTimePicker as MuiDateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import type {DateTimePickerProps as MuiDateTimePickerProps} from '@mui/x-date-pickers/DateTimePicker';
import type {
  DateTimeValidationError,
  PickerValidDate,
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

export type DateTimePickerProps<
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
    Parameters<NonNullable<MuiDateTimePickerProps['onChange']>>,
    Parameters<NonNullable<PickersTextFieldProps['onBlur']>>
  >
  & Omit<
    MuiDateTimePickerProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >
  & {helperText?: ReactNode};

/** MUI X DateTimePicker bound to RHF; the form value is the adapter date, or `transform`'s output. */
export function DateTimePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: DateTimePickerProps<TFieldValues, TName, TTransformedValues>) {
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
    DateTimePickerProps<TFieldValues, TName, TTransformedValues>,
    TTransformedValues
  >(props);
  const picker = usePickerController<
    TFieldValues,
    TName,
    PickerValidDate | null,
    DateTimeValidationError,
    TTransformedValues
  >(controllerProps, null);

  return (
    <MuiDateTimePicker
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
