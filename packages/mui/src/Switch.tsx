import SwitchBase from '@mui/material/Switch';
import type {SwitchProps as MuiSwitchProps} from '@mui/material/Switch';
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
import {useHelperText} from './internal/HelperText.js';
import type {ReserveHelperTextProps} from './internal/HelperText.js';

export type SwitchProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, boolean | null | undefined>,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & ReserveHelperTextProps
  & Omit<MuiSwitchProps, 'name' | 'checked' | 'defaultChecked' | 'disabled'>
  & {label: ReactNode; helperText?: ReactNode};

/** A labelled switch bound to a boolean, with helper and error text. */
export function Switch<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, boolean | null | undefined>,
  TTransformedValues = TFieldValues,
>(props: SwitchProps<TFieldValues, TName, TTransformedValues>) {
  const [
    controllerProps,
    {
      label,
      helperText,
      reserveHelperText,
      onChange,
      onBlur,
      slotProps,
      ...rest
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    SwitchProps<TFieldValues, TName, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const {name, value, ref, disabled} = field;
  const helperId = useId();
  const {helper, describes} = useHelperText(
    errorText,
    helperText,
    reserveHelperText,
  );

  return (
    <ToggleFieldShell
      label={label}
      helper={helper}
      helperId={helperId}
      error={hasError}
      disabled={disabled}
      control={
        <SwitchBase
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
              'aria-describedby': describes ? helperId : undefined,
            })),
          }}
        />
      }
    />
  );
}
