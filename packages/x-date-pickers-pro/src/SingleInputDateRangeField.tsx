import {SingleInputDateRangeField as MuiSingleInputDateRangeField} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import type {SingleInputDateRangeFieldProps as MuiSingleInputDateRangeFieldProps} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import type {
  DateRange,
  DateRangeValidationError,
} from '@mui/x-date-pickers-pro/models';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {
  pickerHelperText,
  pickerValueProps,
  splitPickerProps,
  usePickerController,
} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerControllerProps} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {emptyRange} from './internal/emptyRange.js';
import type {FieldHandlerProps} from '@stackworx/react-hook-form-mui';

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
  & FieldHandlerProps<
    Parameters<NonNullable<MuiSingleInputDateRangeFieldProps['onChange']>>,
    Parameters<NonNullable<MuiSingleInputDateRangeFieldProps['onBlur']>>
  >
  & Omit<
    MuiSingleInputDateRangeFieldProps,
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onBlur'
    | 'name'
    | 'disabled'
    | 'inputRef'
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
  const [
    controllerProps,
    {
      helperText,
      error,
      onError,
      handleChange,
      handleBlur,
      suppressFormChange,
      ...rest
    },
  ] = splitPickerProps<
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
      {...pickerValueProps(picker, onError, {
        handleChange,
        suppressFormChange,
      })}
      error={picker.error || error}
      helperText={pickerHelperText(picker, helperText)}
      onBlur={(event) => {
        picker.onBlur();
        handleBlur?.(event);
      }}
    />
  );
}
