import type {DateRange} from '@mui/x-date-pickers-pro/models';
import type {PickerErrorMessages} from '@stackworx/react-hook-form-mui-x-date-pickers';
import {SingleInputDateRangeField} from '@stackworx/react-hook-form-mui-x-date-pickers-pro';
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
  validate?: Record<string, (range: DateRange<DateTime>) => true | string>;
  messages?: PickerErrorMessages;
}

// RHF's `required` counts [null, null] as a value, so the shared control checks both ends.
function requireBothEnds(args: FieldArgs, start: unknown, end: unknown) {
  return args.required === '' || (start !== null && end !== null)
    || args.required;
}

const meta = {
  title: 'MUI X Pro/SingleInputDateRangeField',
  component: documented<Args>(SingleInputDateRangeField),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Travel dates',
    disablePast: false,
    disableFuture: false,
    readOnly: false,
    format: '',
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
      ],
    },
  },
  render: (args) => (
    <FormStory<{trip: DateRange<DateTime>}>
      // A new starting value needs a new form: default values are read once.
      key={String([args.initialFrom, args.initialTo])}
      defaultValues={{
        trip: [
          fromDateControl(args.initialFrom) ?? null,
          fromDateControl(args.initialTo) ?? null,
        ],
      }}
      settings={args}
    >
      {(control) => (
        <SingleInputDateRangeField
          name='trip'
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
          messages={args.messages}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Required: Story = {args: {required: 'Enter both dates'}};

export const MinAndMax: Story = {
  args: {
    minDate: dateControl('2026-01-01'),
    maxDate: dateControl('2026-12-31'),
    helperText: 'During 2026',
  },
};

export const CustomMessages: Story = {
  args: {
    disablePast: true,
    helperText: 'Today or later',
    messages: {
      disablePast: 'Travel dates cannot be in the past',
      invalidRange: 'The return is before the departure',
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initialFrom: dateControl('2026-12-20'),
    initialTo: dateControl('2026-12-31'),
    helperText: 'The tickets have been issued',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {
    helperText: 'Stored as {from, to}, each an ISO 8601 date (yyyy-MM-dd)',
  },
  render: (args) => (
    <FormStory<{trip: {from: string | null; to: string | null}}>
      defaultValues={{trip: {from: '2026-12-20', to: '2026-12-31'}}}
      settings={args}
    >
      {(control) => (
        <SingleInputDateRangeField
          name='trip'
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
        (start === null) === (end === null) || 'Enter both dates, or neither',
    },
  },
};

export const EndBeforeStart: Story = {
  args: {
    initialFrom: dateControl('2026-12-31'),
    initialTo: dateControl('2026-12-20'),
    helperText: 'Starts with the end before the start: submit to validate',
  },
};
