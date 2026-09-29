import {DateTimeField} from '@stackworx/react-hook-form-mui-x-date-pickers';
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
  minDateTime?: number;
  maxDateTime?: number;
  disablePast: boolean;
  disableFuture: boolean;
  ampm: boolean;
  readOnly: boolean;
  format: string;
  messages?: PickerErrorMessages;
}

const meta = {
  title: 'MUI X/DateTimeField',
  component: documented<Args>(DateTimeField),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Departure',
    disablePast: false,
    disableFuture: false,
    ampm: false,
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
    minDateTime: {control: 'date'},
    maxDateTime: {control: 'date'},
    format: {control: 'text', description: "Empty uses the locale's format."},
  },
  parameters: {
    controls: {
      include: [
        ...formAndFieldControls,
        'initial',
        'minDateTime',
        'maxDateTime',
        'disablePast',
        'disableFuture',
        'ampm',
        'readOnly',
        'format',
      ],
    },
  },
  render: (args) => (
    <FormStory<{departure: DateTime | null}>
      // A new starting value needs a new form: default values are read once.
      key={String(args.initial)}
      defaultValues={{departure: fromDateControl(args.initial) ?? null}}
      settings={args}
    >
      {(control) => (
        <DateTimeField
          name='departure'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          minDateTime={fromDateControl(args.minDateTime)}
          maxDateTime={fromDateControl(args.maxDateTime)}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          ampm={args.ampm}
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

export const Required: Story = {
  args: {required: 'Enter the departure date and time'},
};

export const MinAndMax: Story = {
  args: {
    minDateTime: dateControl('2026-12-01T06:00'),
    maxDateTime: dateControl('2026-12-31T22:00'),
    helperText: 'From 06:00 on 1 December to 22:00 on 31 December 2026',
  },
};

export const CustomMessages: Story = {
  args: {
    disablePast: true,
    helperText: 'Later than now',
    messages: {disablePast: 'The departure must be in the future'},
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initial: dateControl('2026-12-18T07:45'),
    helperText: 'Set by the timetable',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {helperText: 'Stored as an ISO 8601 date-time with its offset'},
  render: (args) => (
    <FormStory<{departure: string | null}>
      defaultValues={{departure: '2026-12-18T07:45:00.000+02:00'}}
      settings={args}
    >
      {(control) => (
        <DateTimeField
          name='departure'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          ampm={args.ampm}
          transform={{
            input: (value) => (value === null ? null : DateTime.fromISO(value)),
            output: (date) => date?.toISO() ?? null,
          }}
        />
      )}
    </FormStory>
  ),
};
