import CheckboxBase from '@mui/material/Checkbox';
import type {CheckboxProps as MuiCheckboxProps} from '@mui/material/Checkbox';
import {useId} from 'react';
import type {ReactNode} from 'react';
import type {FieldPathByValue, FieldValues} from 'react-hook-form';
import {composeHandlers} from './internal/composeHandlers.js';
import {forceSlotProps} from './internal/forceSlotProps.js';
import {mergeRefs} from './internal/mergeRefs.js';
import {ToggleFieldShell} from './internal/ToggleFieldShell.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';

export type CheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, boolean | null | undefined>,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & Omit<MuiCheckboxProps, 'name' | 'checked' | 'defaultChecked' | 'disabled'>
  & {label: ReactNode; helperText?: ReactNode};

/** A labelled checkbox bound to a boolean, with helper and error text. */
export function Checkbox<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, boolean | null | undefined>,
  TTransformedValues = TFieldValues,
>(props: CheckboxProps<TFieldValues, TName, TTransformedValues>) {
  const [
    controllerProps,
    {label, helperText, onChange, onBlur, slotProps, ...rest},
  ] = splitControllerProps<
    TFieldValues,
    TName,
    CheckboxProps<TFieldValues, TName, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const {name, value, ref, disabled} = field;
  const helperId = useId();
  const helper = errorText ?? helperText;

  return (
    <ToggleFieldShell
      label={label}
      helper={helper}
      helperId={helperId}
      error={hasError}
      disabled={disabled}
      control={
        <CheckboxBase
          {...rest}
          name={name}
          checked={Boolean(value)}
          onChange={(event, checked) => {
            field.onChange(checked);
            onChange?.(event, checked);
          }}
          onBlur={composeHandlers<Parameters<NonNullable<typeof onBlur>>>(
            field.onBlur,
            onBlur,
          )}
          slotProps={{
            ...slotProps,
            input: forceSlotProps(slotProps?.input, (input) => ({
              ref: mergeRefs(ref, input?.ref),
              'aria-invalid': hasError,
              'aria-describedby': helper ? helperId : undefined,
            })),
          }}
        />
      }
    />
  );
}
