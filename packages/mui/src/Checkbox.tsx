import CheckboxBase from '@mui/material/Checkbox';
import type {CheckboxProps as MuiCheckboxProps} from '@mui/material/Checkbox';
import {useId} from 'react';
import type {ReactNode} from 'react';
import type {FieldPathByValue, FieldValues} from 'react-hook-form';
import {composeHandlers} from './internal/composeHandlers.js';
import {changeHandler} from './internal/fieldHandlers.js';
import type {FieldHandlerProps} from './internal/fieldHandlers.js';
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

type MuiChangeArgs = Parameters<NonNullable<MuiCheckboxProps['onChange']>>;
type MuiBlurArgs = Parameters<NonNullable<MuiCheckboxProps['onBlur']>>;

export type CheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, boolean | null | undefined>,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & ReserveHelperTextProps
  & FieldHandlerProps<MuiChangeArgs, MuiBlurArgs>
  & Omit<
    MuiCheckboxProps,
    'name' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange' | 'onBlur'
  >
  & {label: ReactNode; helperText?: ReactNode};

/** A labelled checkbox bound to a boolean, with helper and error text. */
export function Checkbox<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, boolean | null | undefined>,
  TTransformedValues = TFieldValues,
>(props: CheckboxProps<TFieldValues, TName, TTransformedValues>) {
  const [
    controllerProps,
    {
      label,
      helperText,
      reserveHelperText,
      handleChange,
      handleBlur,
      suppressFormChange,
      slotProps,
      ...rest
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    CheckboxProps<TFieldValues, TName, TTransformedValues>,
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
        <CheckboxBase
          {...rest}
          name={name}
          checked={Boolean(value)}
          onChange={changeHandler<MuiChangeArgs>((_event, checked) => {
            field.onChange(checked);
          }, {handleChange, suppressFormChange})}
          onBlur={composeHandlers<MuiBlurArgs>(field.onBlur, handleBlur)}
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
