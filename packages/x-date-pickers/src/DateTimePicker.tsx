import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps as MuiDateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import {
  useLocalizationContext,
  useUtils,
  validateDateTime,
} from '@mui/x-date-pickers/internals';
import { mapDateTimePickerValidationErrorMessage } from './utils/DatePickerValidationErrorsToMessage.ts';
import { TextFieldProps } from '@mui/material/TextField';

type DateTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
> = UseControllerProps<TFieldValues, TName> &
  Omit<
    MuiDateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>,
    'value' | 'name'
  >;

export function DateTimePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
>({
  name,
  rules,
  control,
  ...props
}: DateTimePickerProps<
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
          const muiValidationError = validateDateTime({
            value,
            props: {
              ...props,
              disableFuture: !!props.disableFuture,
              disablePast: !!props.disablePast,
              minDate: props.minDateTime ?? props.minDate,
              maxDate: props.maxDateTime ?? props.maxDate,
              minTime: props.minDateTime ?? props.minTime,
              maxTime: props.maxDateTime ?? props.maxTime,
              timezone: getTimezone(value),
            },
            adapter,
          });

          return (
            mapDateTimePickerValidationErrorMessage(
              muiValidationError,
              props
            ) ?? true
          );
        },
      },
    },
  });

  return (
    <MuiDateTimePicker
      onChange={onChange}
      value={value}
      ref={ref}
      slotProps={{
        ...slotProps,
        textField: {
          ...slotProps?.textField,
          inputRef: ref,
          error: !!fieldState.error,
          onBlur,
          helperText:
            fieldState.error?.message ??
            (slotProps?.textField as TextFieldProps)?.helperText,
        },
      }}
      {...otherPickerProps}
    />
  );
}
