import {useController} from 'react-hook-form';
import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import {useFormErrorMessages} from './FormErrorMessages.js';
import type {FormErrorMessages} from './FormErrorMessages.js';

type ControllerKey =
  | 'name'
  | 'control'
  | 'rules'
  | 'defaultValue'
  | 'shouldUnregister'
  | 'disabled';

/** The props every bound component forwards to RHF's `useController`. */
export type FieldControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = Pick<
  UseControllerProps<TFieldValues, TName, TTransformedValues>,
  ControllerKey
>;

export function splitControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  P extends FieldControllerProps<TFieldValues, TName, TTransformedValues>,
  TTransformedValues = TFieldValues,
>(
  props: P,
): [
  FieldControllerProps<TFieldValues, TName, TTransformedValues>,
  Omit<P, ControllerKey>,
] {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
    ...rest
  } = props;
  return [
    {name, control, rules, defaultValue, shouldUnregister, disabled},
    rest,
  ];
}

function resolveErrorText(
  error: FieldError | undefined,
  messages: FormErrorMessages,
): string | undefined {
  if (!error) return undefined;
  if (error.message) return error.message;
  return messages[error.type] ?? error.type;
}

export function useFieldController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FieldControllerProps<TFieldValues, TName, TTransformedValues>) {
  const {field, fieldState} = useController(props);
  const messages = useFormErrorMessages();
  const errorText = resolveErrorText(fieldState.error, messages);
  return {
    field,
    fieldState,
    errorText,
    hasError: fieldState.error !== undefined,
  };
}
