import {DatePicker} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerErrorMessages} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {DateTime} from 'luxon';
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
  initial?: number;
  minDate?: number;
  maxDate?: number;
  disablePast: boolean;
  disableFuture: boolean;
  closeOnSelect: boolean;
  readOnly: boolean;
  format: string;
  messages?: PickerErrorMessages;
}

const meta = {
  title: 'MUI X/DatePicker',
  component: documented<Args>(DatePicker),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Delivery date',
    disablePast: false,
    disableFuture: false,
    closeOnSelect: true,
    readOnly: false,
    format: '',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    initial: {
      control: 'date',
      description: "The field's starting value.",
      table: {category: 'Field'},
    },
    minDate: {control: 'date'},
    maxDate: {control: 'date'},
    format: {control: 'text', description: "Empty uses the locale's format."},
  },
  parameters: {
    controls: {
      include: [
        ...formAndFieldControls,
        'initial',
        'minDate',
        'maxDate',
        'disablePast',
        'disableFuture',
        'closeOnSelect',
        'readOnly',
        'format',
      ],
    },
  },
  render: (args) => (
    <FormStory<{deliveryDate: DateTime | null}>
      // A new starting value needs a new form: default values are read once.
      key={String(args.initial)}
      defaultValues={{deliveryDate: fromDateControl(args.initial) ?? null}}
      settings={args}
    >
      {(control) => (
        <DatePicker
          name='deliveryDate'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          minDate={fromDateControl(args.minDate)}
          maxDate={fromDateControl(args.maxDate)}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          closeOnSelect={args.closeOnSelect}
          readOnly={args.readOnly}
          format={args.format === '' ? undefined : args.format}
          messages={args.messages}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Required: Story = {args: {required: 'Pick a delivery date'}};

export const MinAndMax: Story = {
  args: {
    minDate: dateControl('2026-10-01'),
    maxDate: dateControl('2026-10-31'),
    helperText: 'During October 2026',
  },
};

export const CustomMessages: Story = {
  args: {
    disablePast: true,
    helperText: 'Today or later',
    messages: {
      disablePast: 'We cannot deliver in the past',
      invalidDate: 'That date does not exist',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initial: dateControl('2026-10-05'),
    helperText: 'Booked deliveries cannot be moved',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {helperText: 'Stored as an ISO 8601 date (yyyy-MM-dd)'},
  render: (args) => (
    <FormStory<{deliveryDate: string | null}>
      defaultValues={{deliveryDate: '2026-10-05'}}
      settings={args}
    >
      {(control) => (
        <DatePicker
          name='deliveryDate'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          transform={{
            input: (value) => (value === null ? null : DateTime.fromISO(value)),
            output: (date) => date?.toISODate() ?? null,
          }}
        />
      )}
    </FormStory>
  ),
};
