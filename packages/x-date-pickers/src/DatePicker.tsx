import {
  RegisterOptions,
  useController,
  FieldValues,
  useFormContext,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form';
import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import type { PickerValidDate } from '@mui/x-date-pickers/models';
import { format } from 'date-fns';

type DatePickerProps<
  TDate extends PickerValidDate,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
> = Omit<
  MuiDatePickerProps<TDate, TEnableAccessibleFieldDOMStructure>,
  'value'
> &
  UseControllerProps<TFieldValues, TName>;

export function DatePicker<
  TDate extends PickerValidDate,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
>({
  name,
  rules,
  ...props
}: DatePickerProps<
  TDate,
  TFieldValues,
  TName,
  TEnableAccessibleFieldDOMStructure
>) {
  const { slotProps, ...otherPickerProps } = props;

  const { setError, clearErrors, control } = useFormContext();

  const {
    field: { onChange, value, ref, onBlur },
    fieldState,
  } = useController({
    name,
    control,
    rules: rules as unknown as Omit<
      RegisterOptions<FieldValues, TName>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >,
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
      onError={(reason) => {
        switch (reason) {
          case 'shouldDisableMonth':
            setError(name, { message: 'Month is not allowed' });
            break;
          case 'shouldDisableYear':
            setError(name, { message: 'Year is not allowed' });
            break;
          case 'shouldDisableDate':
            setError(name, { message: 'Date is not allowed' });
            break;
          case 'disableFuture':
            setError(name, { message: 'Values in the past are not allowed' });
            break;
          case 'minDate':
            setError(name, {
              type: 'min',
              message: `Date should not be before ${props?.minDate ? format(props.minDate, 'P') : 'Exceeded minimum date'}`,
            });
            break;
          case 'maxDate':
            setError(name, {
              type: 'max',
              message: `Date should not be after ${props?.maxDate ? format(props.maxDate, 'P') : 'Exceeded maximum date'}`,
            });
            break;
          case 'disablePast':
            setError(name, { message: 'Values in the past are not allowed' });
            break;
          case 'invalidDate':
            setError(name, { message: 'Invalid date' });
            break;
          default:
            clearErrors(name);
        }
      }}
      {...otherPickerProps}
    />
  );
}
