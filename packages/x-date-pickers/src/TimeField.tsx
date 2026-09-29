import {TimeField as MuiTimeField} from '@mui/x-date-pickers/TimeField';
import type {TimeFieldProps as MuiTimeFieldProps} from '@mui/x-date-pickers/TimeField';
import type {
  PickerValidDate,
  TimeValidationError,
} from '@mui/x-date-pickers/models';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {pickerHelperText, pickerValueProps} from './internal/bindings.js';
import {composeHandlers} from './internal/composeHandlers.js';
import {
  splitPickerProps,
  usePickerController,
} from './internal/usePickerController.js';
import type {PickerControllerProps} from './internal/usePickerController.js';

export type TimeFieldProps<
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
    MuiTimeFieldProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >;

/** MUI X TimeField (keyboard entry, no popup) bound to RHF. */
export function TimeField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: TimeFieldProps<TFieldValues, TName, TTransformedValues>) {
  const [controllerProps, {helperText, error, onError, onBlur, ...rest}] =
    splitPickerProps<
      TFieldValues,
      TName,
      PickerValidDate | null,
      TimeFieldProps<TFieldValues, TName, TTransformedValues>,
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
    <MuiTimeField
      {...rest}
      {...pickerValueProps(picker, onError)}
      error={picker.error || error}
      helperText={pickerHelperText(picker, helperText)}
      onBlur={composeHandlers<Parameters<NonNullable<typeof onBlur>>>(
        picker.onBlur,
        onBlur,
      )}
    />
  );
}
