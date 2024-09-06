import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  TimePicker as MuiTimePicker,
  type TimePickerProps as MuiTimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import {
  useLocalizationContext,
  useUtils,
  validateTime,
} from '@mui/x-date-pickers/internals';
import { mapTimePickerValidationErrorMessage } from './utils/DatePickerValidationErrorsToMessage.ts';

type TimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
> = Omit<
  MuiTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>,
  'value'
> &
  UseControllerProps<TFieldValues, TName>;

export function TimePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
>({
  name,
  rules,
  control,
  ...props
}: TimePickerProps<
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
          const muiValidationError = validateTime({
            value,
            props: {
              ...props,
              disableFuture: !!props.disableFuture,
              disablePast: !!props.disablePast,
              minTime: props.minTime,
              maxTime: props.maxTime,
              timezone: getTimezone(value),
            },
            adapter,
          });

          return (
            mapTimePickerValidationErrorMessage(muiValidationError, props) ??
            true
          );
        },
      },
    },
  });
  return (
    <MuiTimePicker
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
