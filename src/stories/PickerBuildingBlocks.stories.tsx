import {MobileDatePicker as MuiMobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import type {MobileDatePickerProps as MuiMobileDatePickerProps} from '@mui/x-date-pickers/MobileDatePicker';
import type {
  DateValidationError,
  PickerValidDate,
} from '@mui/x-date-pickers/models';
import {
  pickerTextFieldSlotProps,
  pickerValueProps,
  splitPickerProps,
  usePickerController,
} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerControllerProps} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {Meta, StoryObj} from '@storybook/react-vite';
import type {DateTime} from 'luxon';
import type {ReactNode} from 'react';
import type {FieldPath, FieldValues} from 'react-hook-form';
import {
  dateControl,
  documented,
  fieldArgs,
  fieldArgTypes,
  fieldProps,
  formAndFieldControls,
  formArgs,
  formArgTypes,
  fromDateControl,
  requiredRule,
} from './controls';
import type {FieldArgs, FormArgs} from './controls';
import {FormStory} from './FormStory';

interface Args extends FormArgs, FieldArgs {
  minDate?: number;
  closeOnSelect: boolean;
  format: string;
}

const meta = {
  title: 'MUI X/Building blocks',
  component: documented<Args>(MobileDatePicker),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Delivery date',
    closeOnSelect: false,
    format: '',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    format: {control: 'text', description: "Empty uses the locale's format."},
  },
  parameters: {
    controls: {
      include: [...formAndFieldControls, 'closeOnSelect', 'format'],
    },
  },
  render: (args) => (
    <FormStory<{deliveryDate: DateTime | null}>
      defaultValues={{deliveryDate: null}}
      settings={args}
    >
      {(control) => (
        <MobileDatePicker
          name='deliveryDate'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          minDate={fromDateControl(args.minDate)}
          closeOnSelect={args.closeOnSelect}
          format={args.format === '' ? undefined : args.format}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

type MobileDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> =
  & PickerControllerProps<
    TFieldValues,
    TName,
    PickerValidDate | null,
    TTransformedValues
  >
  & Omit<
    MuiMobileDatePickerProps,
    'value' | 'defaultValue' | 'onChange' | 'name' | 'disabled' | 'inputRef'
  >
  & {helperText?: ReactNode};

/** MUI X MobileDatePicker bound to RHF, assembled the way the library's DatePicker is. */
function MobileDatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: MobileDatePickerProps<TFieldValues, TName, TTransformedValues>) {
  const [controllerProps, {helperText, onError, slotProps, ...rest}] =
    splitPickerProps<
      TFieldValues,
      TName,
      PickerValidDate | null,
      MobileDatePickerProps<TFieldValues, TName, TTransformedValues>,
      TTransformedValues
    >(props);
  const picker = usePickerController<
    TFieldValues,
    TName,
    PickerValidDate | null,
    DateValidationError,
    TTransformedValues
  >(controllerProps, null);

  return (
    <MuiMobileDatePicker
      {...rest}
      {...pickerValueProps(picker, onError)}
      slotProps={{
        ...slotProps,
        textField: pickerTextFieldSlotProps(
          picker,
          slotProps?.textField,
          helperText,
        ),
      }}
    />
  );
}

export const MobileDatePickerBinding: Story = {
  name: 'MobileDatePicker',
  args: {
    minDate: dateControl('2026-10-01'),
    helperText: 'Opens in a dialog on every screen size',
    required: 'Pick a delivery date',
  },
};
