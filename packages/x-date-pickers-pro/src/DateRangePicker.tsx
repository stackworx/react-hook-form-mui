import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { type DateRangePickerProps as MuiDateRangePickerProps } from '@mui/x-date-pickers-pro/DateRangePicker';
import type { PickerValidDate } from '@mui/x-date-pickers/models';

export type DateRangePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
> = Omit<
  MuiDateRangePickerProps<TDate, TEnableAccessibleFieldDOMStructure>,
  'value' | 'name'
> &
  UseControllerProps<TFieldValues, TName>;

export function DateRangePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
>({
  name,
  control,
  rules,
  ...props
}: DateRangePickerProps<
  TFieldValues,
  TName,
  TDate,
  TEnableAccessibleFieldDOMStructure
>) {
  const { slotProps, ...otherPickerProps } = props;

  const {
    field: { onChange, ref, onBlur },
    fieldState,
  } = useController({
    name,
    control,
    rules: {
      ...rules,
    },
  });

  return (
    <DateRangePicker
      name={name}
      onChange={onChange}
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
