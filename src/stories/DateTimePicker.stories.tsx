import {DateTimePicker} from '@stackworx/react-hook-form-mui-x-date-pickers';
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
  closeOnSelect: boolean;
  readOnly: boolean;
  format: string;
  shouldDisableDate?: (day: DateTime) => boolean;
  minutesStep?: number;
  messages?: PickerErrorMessages;
}

const meta = {
  title: 'MUI X/DateTimePicker',
  component: documented<Args>(DateTimePicker),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Appointment',
    disablePast: false,
    disableFuture: false,
    ampm: false,
    closeOnSelect: false,
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
        'closeOnSelect',
        'readOnly',
        'format',
      ],
    },
  },
  render: (args) => (
    <FormStory<{appointment: DateTime | null}>
      // A new starting value needs a new form: default values are read once.
      key={String(args.initial)}
      defaultValues={{appointment: fromDateControl(args.initial) ?? null}}
      settings={args}
    >
      {(control) => (
        <DateTimePicker
          name='appointment'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          minDateTime={fromDateControl(args.minDateTime)}
          maxDateTime={fromDateControl(args.maxDateTime)}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          ampm={args.ampm}
          closeOnSelect={args.closeOnSelect}
          readOnly={args.readOnly}
          format={args.format === '' ? undefined : args.format}
          shouldDisableDate={args.shouldDisableDate}
          minutesStep={args.minutesStep}
          messages={args.messages}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Required: Story = {args: {required: 'Pick a date and time'}};

export const MinAndMax: Story = {
  args: {
    minDateTime: dateControl('2026-10-05T08:00'),
    maxDateTime: dateControl('2026-10-09T17:00'),
    helperText: 'From 08:00 on 5 October to 17:00 on 9 October 2026',
  },
};

export const CustomMessages: Story = {
  args: {
    shouldDisableDate: (day) => day.weekday > 5,
    minutesStep: 15,
    helperText: 'Weekdays, on the quarter hour',
    messages: {
      shouldDisableDate: 'Appointments are on weekdays only',
      minutesStep: 'Pick a quarter-hour slot',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initial: dateControl('2026-10-05T10:30'),
    helperText: 'Confirmed appointments cannot be moved',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {helperText: 'Stored as an ISO 8601 date-time with its offset'},
  render: (args) => (
    <FormStory<{appointment: string | null}>
      defaultValues={{appointment: '2026-10-05T10:30:00.000+02:00'}}
      settings={args}
    >
      {(control) => (
        <DateTimePicker
          name='appointment'
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
