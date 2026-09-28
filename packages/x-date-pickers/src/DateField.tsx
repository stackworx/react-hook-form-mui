import {DateField as MuiDateField} from '@mui/x-date-pickers/DateField';
import type {DateFieldProps as MuiDateFieldProps} from '@mui/x-date-pickers/DateField';
import type {
  DateValidationError,
  PickerValidDate,
} from '@mui/x-date-pickers/models';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {valueBinding} from './internal/bindings.js';
import {composeHandlers} from './internal/composeHandlers.js';
import {
  splitPickerProps,
  usePickerController,
} from './internal/usePickerController.js';
import type {PickerControllerProps} from './internal/usePickerController.js';

export type DateFieldProps<
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
    MuiDateFieldProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >;

/** MUI X DateField (keyboard entry, no popup) bound to RHF. */
export function DateField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: DateFieldProps<TFieldValues, TName, TTransformedValues>) {
  const [controllerProps, {helperText, error, onError, onBlur, ...rest}] =
    splitPickerProps<
      TFieldValues,
      TName,
      PickerValidDate | null,
      DateFieldProps<TFieldValues, TName, TTransformedValues>,
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
    <MuiDateField
      {...rest}
      {...valueBinding(picker, onError)}
      error={picker.error || error}
      helperText={picker.helperText ?? helperText}
      onBlur={composeHandlers<Parameters<NonNullable<typeof onBlur>>>(
        picker.onBlur,
        onBlur,
      )}
    />
  );
}
