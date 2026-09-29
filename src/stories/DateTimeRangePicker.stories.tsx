import type {DateRange} from '@mui/x-date-pickers-pro/models';
import type {PickerErrorMessages} from '@stackworx/react-hook-form-mui-x-date-pickers';
import {DateTimeRangePicker} from '@stackworx/react-hook-form-mui-x-date-pickers-pro';
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
} from './controls';
import type {FieldArgs, FormArgs} from './controls';
import {FormStory} from './FormStory';

interface Args extends FormArgs, FieldArgs {
  initialFrom?: number;
  initialTo?: number;
  minDateTime?: number;
  maxDateTime?: number;
  disablePast: boolean;
  disableFuture: boolean;
  ampm: boolean;
  readOnly: boolean;
  format: string;
  calendars: 1 | 2 | 3;
  minutesStep?: number;
  validate?: Record<string, (range: DateRange<DateTime>) => true | string>;
  messages?: PickerErrorMessages;
}

// RHF's `required` counts [null, null] as a value, so the shared control checks both ends.
function requireBothEnds(args: FieldArgs, start: unknown, end: unknown) {
  return args.required === '' || (start !== null && end !== null)
    || args.required;
}

const meta = {
  title: 'MUI X Pro/DateTimeRangePicker',
  component: documented<Args>(DateTimeRangePicker),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Booking',
    disablePast: false,
    disableFuture: false,
    ampm: false,
    readOnly: false,
    format: '',
    calendars: 1,
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    initialFrom: {
      control: 'date',
      description: "The start of the field's starting value.",
      table: {category: 'Field'},
    },
    initialTo: {
      control: 'date',
      description: "The end of the field's starting value.",
      table: {category: 'Field'},
    },
    minDateTime: {control: 'date'},
    maxDateTime: {control: 'date'},
    format: {control: 'text', description: "Empty uses the locale's format."},
    calendars: {control: 'inline-radio', options: [1, 2, 3]},
  },
  parameters: {
    controls: {
      include: [
        ...formAndFieldControls,
        'initialFrom',
        'initialTo',
        'minDateTime',
        'maxDateTime',
        'disablePast',
        'disableFuture',
        'ampm',
        'readOnly',
        'format',
        'calendars',
      ],
    },
  },
  render: (args) => (
    <FormStory<{booking: DateRange<DateTime>}>
      // A new starting value needs a new form: default values are read once.
      key={String([args.initialFrom, args.initialTo])}
      defaultValues={{
        booking: [
          fromDateControl(args.initialFrom) ?? null,
          fromDateControl(args.initialTo) ?? null,
        ],
      }}
      settings={args}
    >
      {(control) => (
        <DateTimeRangePicker
          name='booking'
          control={control}
          {...fieldProps(args)}
          rules={{
            validate: {
              required: ([start, end]) => requireBothEnds(args, start, end),
              ...args.validate,
            },
          }}
          minDateTime={fromDateControl(args.minDateTime)}
          maxDateTime={fromDateControl(args.maxDateTime)}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          ampm={args.ampm}
          readOnly={args.readOnly}
          format={args.format === '' ? undefined : args.format}
          calendars={args.calendars}
          minutesStep={args.minutesStep}
          messages={args.messages}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Required: Story = {args: {required: 'Pick a start and an end'}};

export const MinAndMax: Story = {
  args: {
    minDateTime: dateControl('2026-10-10T08:00'),
    maxDateTime: dateControl('2026-10-11T18:00'),
    helperText: 'From 08:00 on 10 October to 18:00 on 11 October 2026',
  },
};

export const CustomMessages: Story = {
  args: {
    minutesStep: 30,
    helperText: 'On the hour or half hour',
    messages: {
      minutesStep: 'Bookings start and end on the hour or half hour',
      invalidRange: 'The booking ends before it starts',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initialFrom: dateControl('2026-10-10T09:00'),
    initialTo: dateControl('2026-10-10T12:00'),
    helperText: 'Confirmed bookings cannot be changed',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {
    helperText:
      'Stored as {from, to}, each an ISO 8601 date-time with its offset',
  },
  render: (args) => (
    <FormStory<{booking: {from: string | null; to: string | null}}>
      defaultValues={{
        booking: {
          from: '2026-10-10T09:00:00.000+02:00',
          to: '2026-10-10T12:00:00.000+02:00',
        },
      }}
      settings={args}
    >
      {(control) => (
        <DateTimeRangePicker
          name='booking'
          control={control}
          {...fieldProps(args)}
          rules={{
            validate: {
              required: ({from, to}) => requireBothEnds(args, from, to),
            },
          }}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          ampm={args.ampm}
          transform={{
            input: ({from, to}) => [
              from === null ? null : DateTime.fromISO(from),
              to === null ? null : DateTime.fromISO(to),
            ],
            output: ([start, end]) => ({
              from: start?.toISO() ?? null,
              to: end?.toISO() ?? null,
            }),
          }}
        />
      )}
    </FormStory>
  ),
};

export const BothOrNeither: Story = {
  args: {
    helperText: 'Optional',
    validate: {
      bothOrNeither: ([start, end]) =>
        (start === null) === (end === null)
        || 'Pick a start and an end, or neither',
    },
  },
};

export const EndBeforeStart: Story = {
  args: {
    initialFrom: dateControl('2026-10-10T12:00'),
    initialTo: dateControl('2026-10-10T09:00'),
    helperText: 'Starts with the end before the start: submit to validate',
  },
};
