import {useReserveHelperText} from '@stackworx/react-hook-form-mui';
import type {
  FieldControllerProps,
  FieldTransform,
  ReserveHelperTextProps,
} from '@stackworx/react-hook-form-mui';
import {useRef} from 'react';
import {useController} from 'react-hook-form';
import type {
  FieldError,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from 'react-hook-form';
import {
  defaultPickerErrorMessages,
  pickerErrorMessage,
} from '../pickerErrorMessages.js';
import type {PickerErrorMessages} from '../pickerErrorMessages.js';

export type PickerControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue,
  TTransformedValues = TFieldValues,
> =
  & FieldControllerProps<TFieldValues, TName, TTransformedValues>
  & ReserveHelperTextProps
  & {
    transform?: FieldTransform<FieldPathValue<TFieldValues, TName>, TValue>;
    /** Overrides the default text per RHF rule type or MUI X validation code. */
    messages?: PickerErrorMessages;
  };

export interface PickerController<TValue, TError> {
  value: TValue;
  onChange: (value: TValue, context: {validationError: TError}) => void;
  onError: (error: TError) => void;
  onBlur: () => void;
  inputRef: (instance: unknown) => void;
  name: string;
  disabled: boolean | undefined;
  error: boolean;
  helperText: string | undefined;
  reserveHelperText: boolean;
}

type PickerControllerKey =
  | 'name'
  | 'control'
  | 'rules'
  | 'defaultValue'
  | 'shouldUnregister'
  | 'disabled'
  | 'transform'
  | 'messages'
  | 'reserveHelperText';

/** Separates the controller props (plus `transform`, `messages` and `reserveHelperText`) from the picker's own props. */
export function splitPickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue,
  P extends PickerControllerProps<
    TFieldValues,
    TName,
    TValue,
    TTransformedValues
  >,
  TTransformedValues = TFieldValues,
>(
  props: P,
): [
  PickerControllerProps<TFieldValues, TName, TValue, TTransformedValues>,
  Omit<P, PickerControllerKey>,
] {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
    transform,
    messages,
    reserveHelperText,
    ...rest
  } = props;
  return [
    {
      name,
      control,
      rules,
      defaultValue,
      shouldUnregister,
      disabled,
      transform,
      messages,
      reserveHelperText,
    },
    rest,
  ];
}

function resolveErrorText(
  error: FieldError | undefined,
  messages: PickerErrorMessages | undefined,
): string | undefined {
  if (!error) return undefined;
  if (error.message) return error.message;
  return messages?.[error.type] ?? defaultPickerErrorMessages[error.type]
    ?? error.type;
}

/**
 * Binds any MUI X picker or field to RHF. MUI's validation error joins the rules as a
 * `validate` entry that reads the latest error, so the message appears on the change that
 * causes it instead of one change later.
 */
export function usePickerController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue,
  TError,
  TTransformedValues = TFieldValues,
>(
  props: PickerControllerProps<
    TFieldValues,
    TName,
    TValue,
    TTransformedValues
  >,
  emptyValue: TValue,
): PickerController<TValue, TError> {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
    transform,
    messages,
    reserveHelperText,
  } = props;
  const reserve = useReserveHelperText(reserveHelperText);
  const muiErrorRef = useRef<string | null>(null);
  const customValidate = rules?.validate;
  const {field, fieldState, formState} = useController({
    name,
    control,
    defaultValue,
    shouldUnregister,
    disabled,
    rules: {
      ...rules,
      validate: {
        // Runs first: a custom rule should not see an invalid date.
        mui: () => muiErrorRef.current ?? true,
        ...(typeof customValidate === 'function'
          ? {validate: customValidate}
          : customValidate),
      },
    },
  });
  const isTouched = fieldState.isTouched;
  const isSubmitted = formState.isSubmitted;
  const error = fieldState.error;
  const current: unknown = field.value;

  return {
    value: transform
      ? transform.input(field.value)
      : ((current ?? emptyValue) as TValue),
    onChange: (value, context) => {
      muiErrorRef.current = pickerErrorMessage(
        context.validationError,
        messages,
      );
      field.onChange(transform ? transform.output(value) : value);
    },
    onError: (validationError) => {
      const message = pickerErrorMessage(validationError, messages);
      if (message === muiErrorRef.current) return;
      muiErrorRef.current = message;
      // The error changed without a new value (e.g. minDate moved). RHF's Control has no
      // trigger, so re-apply the value to revalidate under the form's own mode.
      if (isTouched || isSubmitted) field.onChange(field.value);
    },
    onBlur: field.onBlur,
    inputRef: field.ref,
    name: field.name,
    disabled: field.disabled,
    error: error !== undefined,
    helperText: resolveErrorText(error, messages),
    reserveHelperText: reserve,
  };
}
