import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import type { PickerValidDate } from '@mui/x-date-pickers/models';
import {
  useLocalizationContext,
  useUtils,
  validateDate,
} from '@mui/x-date-pickers/internals';
import { mapDatePickerValidationErrorMessage } from './utils/DatePickerValidationErrorsToMessage.ts';

export type DatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
> = Omit<
  MuiDatePickerProps<TDate, TEnableAccessibleFieldDOMStructure>,
  'value' | 'name'
> &
  UseControllerProps<TFieldValues, TName>;

export function DatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
>({
  name,
  rules,
  control,
  ...props
}: DatePickerProps<
  TFieldValues,
  TName,
  TDate,
  TEnableAccessibleFieldDOMStructure
>) {
  const { slotProps, ...otherPickerProps } = props;

  const { getTimezone } = useUtils();
  const adapter = useLocalizationContext<TDate>();

  const {
    field: { onChange, value, ref, onBlur },
    fieldState,
  } = useController({
    name,
    control,
    rules: {
      ...rules,
      validate: {
        ...rules?.validate,
        internalMuiError: () => {
          const muiValidationError = validateDate({
            value,
            props: {
              ...props,
              disableFuture: !!props.disableFuture,
              disablePast: !!props.disablePast,
              minDate: props.minDate,
              maxDate: props.maxDate,
              timezone: getTimezone(value),
            },
            adapter,
          });

          return (
            mapDatePickerValidationErrorMessage(muiValidationError, props) ??
            true
          );
        },
      },
    },
  });

  return (
    <MuiDatePicker
      onChange={onChange}
      value={value}
      slotProps={{
        ...slotProps,
        textField: {
          ...slotProps?.textField,
          inputRef: ref,
          error: !!fieldState.error,
          onBlur,
          helperText:
            //@ts-expect-error incomplete typing
            fieldState.error?.message ?? slotProps?.textField?.helperText,
        },
      }}
      {...otherPickerProps}
    />
  );
}
