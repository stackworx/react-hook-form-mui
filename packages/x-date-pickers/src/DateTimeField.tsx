import {DateTimeField as MuiDateTimeField} from '@mui/x-date-pickers/DateTimeField';
import type {DateTimeFieldProps as MuiDateTimeFieldProps} from '@mui/x-date-pickers/DateTimeField';
import type {
  DateTimeValidationError,
  PickerValidDate,
} from '@mui/x-date-pickers/models';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {pickerHelperText, pickerValueProps} from './internal/bindings.js';
import {composeHandlers} from './internal/composeHandlers.js';
import {
  splitPickerProps,
  usePickerController,
} from './internal/usePickerController.js';
import type {PickerControllerProps} from './internal/usePickerController.js';

export type DateTimeFieldProps<
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
    MuiDateTimeFieldProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >;

/** MUI X DateTimeField (keyboard entry, no popup) bound to RHF. */
export function DateTimeField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: DateTimeFieldProps<TFieldValues, TName, TTransformedValues>) {
  const [controllerProps, {helperText, error, onError, onBlur, ...rest}] =
    splitPickerProps<
      TFieldValues,
      TName,
      PickerValidDate | null,
      DateTimeFieldProps<TFieldValues, TName, TTransformedValues>,
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
    <MuiDateTimeField
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
