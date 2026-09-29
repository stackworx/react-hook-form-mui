import TextFieldBase from '@mui/material/TextField';
import type {TextFieldProps as MuiTextFieldProps} from '@mui/material/TextField';
import {useForkRef} from '@mui/material/utils';
import type {FieldPath, FieldPathValue, FieldValues} from 'react-hook-form';
import {composeHandlers} from './internal/composeHandlers.js';
import {changeHandler} from './internal/fieldHandlers.js';
import type {MuiHandlerProps} from './internal/fieldHandlers.js';
import type {FieldTransform} from './internal/FieldTransform.js';
import type {DistributiveOmit} from './internal/types.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';
import {useHelperText} from './internal/HelperText.js';
import type {ReserveHelperTextProps} from './internal/HelperText.js';

export type TextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & ReserveHelperTextProps
  & MuiHandlerProps<MuiTextFieldProps>
  & DistributiveOmit<
    MuiTextFieldProps,
    'name' | 'value' | 'defaultValue' | 'disabled' | 'onChange' | 'onBlur'
  >
  & {transform?: FieldTransform<FieldPathValue<TFieldValues, TName>, string>};

/** MUI TextField bound to RHF; the form value is the text, or `transform`'s output. */
export function TextField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: TextFieldProps<TFieldValues, TName, TTransformedValues>) {
  const [
    controllerProps,
    {
      transform,
      handleChange,
      handleBlur,
      suppressFormChange,
      inputRef,
      error,
      helperText,
      reserveHelperText,
      ...rest
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    TextFieldProps<TFieldValues, TName, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const {helper} = useHelperText(errorText, helperText, reserveHelperText);
  const ref = useForkRef(field.ref, inputRef);

  return (
    <TextFieldBase
      {...rest}
      name={field.name}
      value={transform ? transform.input(field.value) : (field.value ?? '')}
      onChange={changeHandler((event) => {
        field.onChange(
          transform ? transform.output(event.target.value) : event.target.value,
        );
      }, {handleChange, suppressFormChange})}
      onBlur={composeHandlers<Parameters<NonNullable<typeof handleBlur>>>(
        field.onBlur,
        handleBlur,
      )}
      inputRef={ref}
      disabled={field.disabled}
      error={hasError || error}
      helperText={helper}
    />
  );
}
