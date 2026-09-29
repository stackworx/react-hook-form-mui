import type {DateRange} from '@mui/x-date-pickers-pro/models';
import type {PickerErrorMessages} from '@stackworx/react-hook-form-mui-x-date-pickers';
import {DateRangePicker} from '@stackworx/react-hook-form-mui-x-date-pickers-pro';
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
  minDate?: number;
  maxDate?: number;
  disablePast: boolean;
  disableFuture: boolean;
  readOnly: boolean;
  format: string;
  calendars: 1 | 2 | 3;
  shouldDisableDate?: (day: DateTime) => boolean;
  validate?: Record<string, (range: DateRange<DateTime>) => true | string>;
  messages?: PickerErrorMessages;
}

// RHF's `required` counts [null, null] as a value, so the shared control checks both ends.
function requireBothEnds(args: FieldArgs, start: unknown, end: unknown) {
  return args.required === '' || (start !== null && end !== null)
    || args.required;
}

const meta = {
  title: 'MUI X Pro/DateRangePicker',
  component: documented<Args>(DateRangePicker),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Leave period',
    disablePast: false,
    disableFuture: false,
    readOnly: false,
    format: '',
    calendars: 2,
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
    minDate: {control: 'date'},
    maxDate: {control: 'date'},
    format: {control: 'text', description: "Empty uses the locale's format."},
    calendars: {control: 'inline-radio', options: [1, 2, 3]},
  },
  parameters: {
    controls: {
      include: [
        ...formAndFieldControls,
        'initialFrom',
        'initialTo',
        'minDate',
        'maxDate',
        'disablePast',
        'disableFuture',
        'readOnly',
        'format',
        'calendars',
      ],
    },
  },
  render: (args) => (
    <FormStory<{leave: DateRange<DateTime>}>
      // A new starting value needs a new form: default values are read once.
      key={String([args.initialFrom, args.initialTo])}
      defaultValues={{
        leave: [
          fromDateControl(args.initialFrom) ?? null,
          fromDateControl(args.initialTo) ?? null,
        ],
      }}
      settings={args}
    >
      {(control) => (
        <DateRangePicker
          name='leave'
          control={control}
          {...fieldProps(args)}
          rules={{
            validate: {
              required: ([start, end]) => requireBothEnds(args, start, end),
              ...args.validate,
            },
          }}
          minDate={fromDateControl(args.minDate)}
          maxDate={fromDateControl(args.maxDate)}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          readOnly={args.readOnly}
          format={args.format === '' ? undefined : args.format}
          calendars={args.calendars}
          shouldDisableDate={args.shouldDisableDate}
          messages={args.messages}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

interface Period {
  from: string | null;
  to: string | null;
}

export const Required: Story = {args: {required: 'Pick both dates'}};

export const MinAndMax: Story = {
  args: {
    minDate: dateControl('2026-10-01'),
    maxDate: dateControl('2026-12-31'),
    helperText: 'Between 1 October and 31 December 2026',
  },
};

export const CustomMessages: Story = {
  args: {
    shouldDisableDate: (day) => day.weekday > 5,
    helperText: 'Starts and ends on a weekday',
    messages: {
      shouldDisableDate: 'Leave cannot start or end on a weekend',
      invalidRange: 'The last day is before the first',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initialFrom: dateControl('2026-12-14'),
    initialTo: dateControl('2026-12-18'),
    helperText: 'Approved leave cannot be changed',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {
    helperText: 'Stored as {from, to}, each an ISO 8601 date (yyyy-MM-dd)',
  },
  render: (args) => (
    <FormStory<{leave: Period}>
      defaultValues={{leave: {from: '2026-12-14', to: '2026-12-18'}}}
      settings={args}
    >
      {(control) => (
        <DateRangePicker
          name='leave'
          control={control}
          {...fieldProps(args)}
          rules={{
            validate: {
              required: ({from, to}) => requireBothEnds(args, from, to),
            },
          }}
          disablePast={args.disablePast}
          disableFuture={args.disableFuture}
          transform={{
            input: ({from, to}) => [
              from === null ? null : DateTime.fromISO(from),
              to === null ? null : DateTime.fromISO(to),
            ],
            output: ([start, end]) => ({
              from: start?.toISODate() ?? null,
              to: end?.toISODate() ?? null,
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
        (start === null) === (end === null) || 'Pick both dates, or neither',
    },
  },
};

export const EndBeforeStart: Story = {
  args: {
    initialFrom: dateControl('2026-12-18'),
    initialTo: dateControl('2026-12-14'),
    helperText: 'Starts with the end before the start: submit to validate',
  },
};
