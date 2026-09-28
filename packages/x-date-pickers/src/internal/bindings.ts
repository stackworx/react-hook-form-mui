import type {PickersTextFieldProps} from '@mui/x-date-pickers/PickersTextField';
import type {ReactNode} from 'react';
import {composeHandlers} from './composeHandlers.js';
import {forceSlotProps} from './forceSlotProps.js';
import type {PickerController} from './usePickerController.js';

/** The value, change, error, ref, name and disabled props every picker and field takes. */
export function valueBinding<TValue, TError>(
  picker: PickerController<TValue, TError>,
  onError: ((error: TError, value: TValue) => void) | undefined,
) {
  return {
    value: picker.value,
    onChange: picker.onChange,
    onError: (error: TError, value: TValue) => {
      picker.onError(error);
      onError?.(error, value);
    },
    inputRef: picker.inputRef,
    name: picker.name,
    disabled: picker.disabled,
  };
}

type TextFieldSlotProps = Partial<
  Pick<PickersTextFieldProps, 'error' | 'helperText' | 'onBlur'>
>;

/** A picker's `slotProps.textField` with the RHF error, helper text and blur merged in. */
export function textFieldSlotProps<
  TProps extends TextFieldSlotProps,
  TOwnerState,
>(
  picker: Pick<
    PickerController<unknown, unknown>,
    'error' | 'helperText' | 'onBlur'
  >,
  slotProps: TProps | ((ownerState: TOwnerState) => TProps) | undefined,
  helperText: ReactNode,
) {
  return forceSlotProps(slotProps, (textField) => ({
    error: picker.error,
    helperText: picker.helperText ?? helperText ?? textField?.helperText,
    onBlur: composeHandlers<Parameters<NonNullable<TProps['onBlur']>>>(
      picker.onBlur,
      textField?.onBlur,
    ),
  } as Partial<TProps>));
}
