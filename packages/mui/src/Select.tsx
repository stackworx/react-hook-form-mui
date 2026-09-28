import MenuItem from '@mui/material/MenuItem';
import TextFieldBase from '@mui/material/TextField';
import type {TextFieldProps as MuiTextFieldProps} from '@mui/material/TextField';
import {useForkRef} from '@mui/material/utils';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {composeHandlers} from './internal/composeHandlers.js';
import {forceSlotProps} from './internal/forceSlotProps.js';
import type {DistributiveOmit} from './internal/types.js';
import {
  splitControllerProps,
  useFieldController,
} from './internal/useFieldController.js';
import type {FieldControllerProps} from './internal/useFieldController.js';

export interface SelectOption<TValue> {
  value: TValue;
  label: ReactNode;
  disabled?: boolean;
}

export type SelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends string | number,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & DistributiveOmit<
    MuiTextFieldProps,
    'select' | 'value' | 'name' | 'defaultValue' | 'disabled' | 'children'
  >
  & {
    options: readonly SelectOption<TValue>[];
    /** Stores `TValue[]` instead of `TValue | null`. */
    multiple?: boolean;
  };

/** A select whose form value is the chosen option's `value` (`TValue | null`, or `TValue[]` when `multiple`). */
export function Select<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends string | number,
  TTransformedValues = TFieldValues,
>(props: SelectProps<TFieldValues, TName, TValue, TTransformedValues>) {
  const [
    controllerProps,
    {
      options,
      multiple = false,
      onChange,
      onBlur,
      inputRef,
      error,
      helperText,
      slotProps,
      ...rest
    },
  ] = splitControllerProps<
    TFieldValues,
    TName,
    SelectProps<TFieldValues, TName, TValue, TTransformedValues>,
    TTransformedValues
  >(props);
  const {field, errorText, hasError} = useFieldController(controllerProps);
  const ref = useForkRef(field.ref, inputRef);

  // MUI hands back the MenuItem value; a browser autofill can hand back a comma-joined string.
  const toOptionValue = (raw: unknown) =>
    options.find((option) =>
      Object.is(option.value, raw) || String(option.value) === raw
    )?.value;
  const current: unknown = field.value;
  const value = multiple
    ? (Array.isArray(current) ? current : [])
    : (current ?? '');

  return (
    <TextFieldBase
      {...rest}
      select
      name={field.name}
      value={value}
      onChange={(event) => {
        const raw: unknown = event.target.value;
        if (multiple) {
          const list: unknown[] = typeof raw === 'string'
            ? raw.split(',')
            : Array.isArray(raw)
            ? raw
            : [];
          field.onChange(
            list.map(toOptionValue).filter((item) => item !== undefined),
          );
        } else {
          field.onChange(toOptionValue(raw) ?? null);
        }
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
      slotProps={{
        ...slotProps,
        select: forceSlotProps(slotProps?.select, () => ({multiple})),
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={String(option.value)}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextFieldBase>
  );
}
