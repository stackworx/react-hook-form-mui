import {DateTimeRangePicker as MuiDateTimeRangePicker} from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import type {DateTimeRangePickerProps as MuiDateTimeRangePickerProps} from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import type {
  DateRange,
  DateTimeRangeValidationError,
} from '@mui/x-date-pickers-pro/models';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {
  pickerTextFieldSlotProps,
  pickerValueProps,
  splitPickerProps,
  usePickerController,
} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerControllerProps} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {emptyRange} from './internal/emptyRange.js';

export type DateTimeRangePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> =
  & PickerControllerProps<
    TFieldValues,
    TName,
    DateRange<PickerValidDate>,
    TTransformedValues
  >
  & Omit<
    MuiDateTimeRangePickerProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >
  & {helperText?: ReactNode};

/** MUI X Pro DateTimeRangePicker bound to RHF; the form value is `[start, end]`, or `transform`'s output. */
export function DateTimeRangePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: DateTimeRangePickerProps<TFieldValues, TName, TTransformedValues>) {
  const [controllerProps, {helperText, onError, slotProps, ...rest}] =
    splitPickerProps<
      TFieldValues,
      TName,
      DateRange<PickerValidDate>,
      DateTimeRangePickerProps<TFieldValues, TName, TTransformedValues>,
      TTransformedValues
    >(props);
  const picker = usePickerController<
    TFieldValues,
    TName,
    DateRange<PickerValidDate>,
    DateTimeRangeValidationError,
    TTransformedValues
  >(controllerProps, emptyRange);

  return (
    <MuiDateTimeRangePicker
      {...rest}
      {...pickerValueProps(picker, onError)}
      slotProps={{
        ...slotProps,
        textField: pickerTextFieldSlotProps(
          picker,
          slotProps?.textField,
          helperText,
        ),
      }}
    />
  );
}
