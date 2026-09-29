import {DateField as MuiDateField} from '@mui/x-date-pickers/DateField';
import type {DateFieldProps as MuiDateFieldProps} from '@mui/x-date-pickers/DateField';
import type {
  DateValidationError,
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
import type {FieldHandlerProps} from '@stackworx/react-hook-form-mui';

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
  & FieldHandlerProps<
    Parameters<NonNullable<MuiDateFieldProps['onChange']>>,
    Parameters<NonNullable<MuiDateFieldProps['onBlur']>>
  >
  & Omit<
    MuiDateFieldProps,
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onBlur'
    | 'name'
    | 'disabled'
    | 'inputRef'
  >;

/** MUI X DateField (keyboard entry, no popup) bound to RHF. */
export function DateField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: DateFieldProps<TFieldValues, TName, TTransformedValues>) {
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
      {...pickerValueProps(picker, onError, {
        handleChange,
        suppressFormChange,
      })}
      error={picker.error || error}
      helperText={pickerHelperText(picker, helperText)}
      onBlur={composeHandlers<Parameters<NonNullable<typeof handleBlur>>>(
        picker.onBlur,
        handleBlur,
      )}
    />
  );
}
