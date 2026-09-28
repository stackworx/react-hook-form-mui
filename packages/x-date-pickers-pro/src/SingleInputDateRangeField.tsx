import {SingleInputDateRangeField as MuiSingleInputDateRangeField} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import type {SingleInputDateRangeFieldProps as MuiSingleInputDateRangeFieldProps} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import type {
  DateRange,
  DateRangeValidationError,
} from '@mui/x-date-pickers-pro/models';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {
  pickerValueProps,
  splitPickerProps,
  usePickerController,
} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerControllerProps} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {emptyRange} from './internal/emptyRange.js';

export type SingleInputDateRangeFieldProps<
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
    MuiSingleInputDateRangeFieldProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >;

/** MUI X Pro SingleInputDateRangeField (both dates in one input, no popup) bound to RHF. */
export function SingleInputDateRangeField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: SingleInputDateRangeFieldProps<
    TFieldValues,
    TName,
    TTransformedValues
  >,
) {
  const [controllerProps, {helperText, error, onError, onBlur, ...rest}] =
    splitPickerProps<
      TFieldValues,
      TName,
      DateRange<PickerValidDate>,
      SingleInputDateRangeFieldProps<TFieldValues, TName, TTransformedValues>,
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
    <MuiSingleInputDateRangeField
      {...rest}
      {...pickerValueProps(picker, onError)}
      error={picker.error || error}
      helperText={picker.helperText ?? helperText}
      onBlur={(event) => {
        picker.onBlur();
        onBlur?.(event);
      }}
    />
  );
}
