import {DatePicker as MuiDatePicker} from '@mui/x-date-pickers/DatePicker';
import type {DatePickerProps as MuiDatePickerProps} from '@mui/x-date-pickers/DatePicker';
import type {
  DateValidationError,
  PickerValidDate,
} from '@mui/x-date-pickers/models';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {textFieldSlotProps, valueBinding} from './internal/bindings.js';
import {
  splitPickerProps,
  usePickerController,
} from './internal/usePickerController.js';
import type {PickerControllerProps} from './internal/usePickerController.js';

export type DatePickerProps<
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
  & Omit<
    MuiDatePickerProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >
  & {helperText?: ReactNode};

/** MUI X DatePicker bound to RHF; the form value is the adapter date, or `transform`'s output. */
export function DatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: DatePickerProps<TFieldValues, TName, TTransformedValues>) {
  const [controllerProps, {helperText, onError, slotProps, ...rest}] =
    splitPickerProps<
      TFieldValues,
      TName,
      PickerValidDate | null,
      DatePickerProps<TFieldValues, TName, TTransformedValues>,
      TTransformedValues
    >(props);
  const picker = usePickerController<
    TFieldValues,
    TName,
    PickerValidDate | null,
    DateValidationError,
    TTransformedValues
  >(controllerProps, null);

  return (
    <MuiDatePicker
      {...rest}
      {...valueBinding(picker, onError)}
      slotProps={{
        ...slotProps,
        textField: textFieldSlotProps(
          picker,
          slotProps?.textField,
          helperText,
        ),
      }}
    />
  );
}
