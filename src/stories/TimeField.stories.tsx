import type {TimeView} from '@mui/x-date-pickers/models';
import {TimeField} from '@stackworx/react-hook-form-mui-x-date-pickers';
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
  minTime?: number;
  maxTime?: number;
  ampm: boolean;
  readOnly: boolean;
  format: string;
  shouldDisableTime?: (value: DateTime, view: TimeView) => boolean;
  messages?: PickerErrorMessages;
}

const meta = {
  title: 'MUI X/TimeField',
  component: documented<Args>(TimeField),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Delivery time',
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
    minTime: {control: 'date'},
    maxTime: {control: 'date'},
    format: {control: 'text', description: "Empty uses the locale's format."},
  },
  parameters: {
    controls: {
      include: [
        ...formAndFieldControls,
        'initial',
        'minTime',
        'maxTime',
        'ampm',
        'readOnly',
        'format',
      ],
    },
  },
  render: (args) => (
    <FormStory<{deliveryTime: DateTime | null}>
      // A new starting value needs a new form: default values are read once.
      key={String(args.initial)}
      defaultValues={{deliveryTime: fromDateControl(args.initial) ?? null}}
      settings={args}
    >
      {(control) => (
        <TimeField
          name='deliveryTime'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          minTime={fromDateControl(args.minTime)}
          maxTime={fromDateControl(args.maxTime)}
          ampm={args.ampm}
          readOnly={args.readOnly}
          format={args.format === '' ? undefined : args.format}
          shouldDisableTime={args.shouldDisableTime}
          messages={args.messages}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Required: Story = {args: {required: 'Enter a delivery time'}};

export const MinAndMax: Story = {
  args: {
    minTime: dateControl('08:00'),
    maxTime: dateControl('17:00'),
    helperText: 'Between 08:00 and 17:00',
  },
};

export const CustomMessages: Story = {
  args: {
    shouldDisableTime: (value, view) => view === 'hours' && value.hour === 12,
    helperText: 'Not between 12:00 and 13:00',
    messages: {'shouldDisableTime-hours': 'No deliveries over lunch'},
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initial: dateControl('2026-10-05T14:30'),
    helperText: 'Set by the courier',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {helperText: 'Stored as an ISO 8601 time (HH:mm:ss)'},
  render: (args) => (
    <FormStory<{deliveryTime: string | null}>
      defaultValues={{deliveryTime: '14:30:00'}}
      settings={args}
    >
      {(control) => (
        <TimeField
          name='deliveryTime'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          ampm={args.ampm}
          transform={{
            input: (value) => (value === null ? null : DateTime.fromISO(value)),
            output: (time) => time?.toFormat('HH:mm:ss') ?? null,
          }}
        />
      )}
    </FormStory>
  ),
};
