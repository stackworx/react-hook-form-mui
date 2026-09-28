import {DateRangePicker as MuiDateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import type {DateRangePickerProps as MuiDateRangePickerProps} from '@mui/x-date-pickers-pro/DateRangePicker';
import type {
  DateRange,
  DateRangeValidationError,
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

export type DateRangePickerProps<
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
    MuiDateRangePickerProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >
  & {helperText?: ReactNode};

/** MUI X Pro DateRangePicker bound to RHF; the form value is `[start, end]`, or `transform`'s output. */
export function DateRangePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: DateRangePickerProps<TFieldValues, TName, TTransformedValues>) {
  const [controllerProps, {helperText, onError, slotProps, ...rest}] =
    splitPickerProps<
      TFieldValues,
      TName,
      DateRange<PickerValidDate>,
      DateRangePickerProps<TFieldValues, TName, TTransformedValues>,
      TTransformedValues
    >(props);
  const picker = usePickerController<
    TFieldValues,
    TName,
    DateRange<PickerValidDate>,
    DateRangeValidationError,
    TTransformedValues
  >(controllerProps, emptyRange);

  return (
    <MuiDateRangePicker
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
