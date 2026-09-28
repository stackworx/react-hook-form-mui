import TextFieldBase from '@mui/material/TextField';
import type {TextFieldProps as MuiTextFieldProps} from '@mui/material/TextField';
import {useForkRef} from '@mui/material/utils';
import type {FieldPath, FieldPathValue, FieldValues} from 'react-hook-form';
import {composeHandlers} from './internal/composeHandlers.js';
import type {DistributiveOmit} from './internal/types.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';

/** Maps the form value to the text shown in the input and back. */
export interface TextFieldTransform<TValue> {
  input: (value: TValue) => string;
  output: (text: string) => TValue;
}

export type TextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & DistributiveOmit<
    MuiTextFieldProps,
    'name' | 'value' | 'defaultValue' | 'disabled'
  >
  & {transform?: TextFieldTransform<FieldPathValue<TFieldValues, TName>>};

export function TextField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: TextFieldProps<TFieldValues, TName, TTransformedValues>) {
  const [
    controllerProps,
    {transform, onChange, onBlur, inputRef, error, helperText, ...rest},
  ] = splitControllerProps<
    TFieldValues,
    TName,
    TextFieldProps<TFieldValues, TName, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const ref = useForkRef(field.ref, inputRef);

  return (
    <TextFieldBase
      {...rest}
      name={field.name}
      value={transform ? transform.input(field.value) : (field.value ?? '')}
      onChange={(event) => {
        field.onChange(
          transform ? transform.output(event.target.value) : event.target.value,
        );
        onChange?.(event);
      }}
      onBlur={composeHandlers<Parameters<NonNullable<typeof onBlur>>>(
        field.onBlur,
        onBlur,
      )}
      inputRef={ref}
      disabled={field.disabled}
      error={hasError || error}
      helperText={errorText ?? helperText}
    />
  );
}
