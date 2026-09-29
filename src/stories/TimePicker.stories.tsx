import {TimePicker} from '@stackworx/react-hook-form-mui-x-date-pickers';
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
  closeOnSelect: boolean;
  readOnly: boolean;
  format: string;
  minutesStep?: number;
  messages?: PickerErrorMessages;
}

const meta = {
  title: 'MUI X/TimePicker',
  component: documented<Args>(TimePicker),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Opens at',
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
        'closeOnSelect',
        'readOnly',
        'format',
      ],
    },
  },
  render: (args) => (
    <FormStory<{opensAt: DateTime | null}>
      // A new starting value needs a new form: default values are read once.
      key={String(args.initial)}
      defaultValues={{opensAt: fromDateControl(args.initial) ?? null}}
      settings={args}
    >
      {(control) => (
        <TimePicker
          name='opensAt'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          minTime={fromDateControl(args.minTime)}
          maxTime={fromDateControl(args.maxTime)}
          ampm={args.ampm}
          closeOnSelect={args.closeOnSelect}
          readOnly={args.readOnly}
          format={args.format === '' ? undefined : args.format}
          minutesStep={args.minutesStep}
          messages={args.messages}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Required: Story = {args: {required: 'Pick an opening time'}};

export const MinAndMax: Story = {
  args: {
    minTime: dateControl('06:00'),
    maxTime: dateControl('12:00'),
    helperText: 'Between 06:00 and 12:00',
  },
};

export const CustomMessages: Story = {
  args: {
    minutesStep: 15,
    helperText: 'On the quarter hour',
    messages: {minutesStep: 'Opening times are on the quarter hour'},
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initial: dateControl('2026-10-05T08:30'),
    helperText: 'The same for every branch',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {helperText: 'Stored as an ISO 8601 time (HH:mm:ss)'},
  render: (args) => (
    <FormStory<{opensAt: string | null}>
      defaultValues={{opensAt: '08:30:00'}}
      settings={args}
    >
      {(control) => (
        <TimePicker
          name='opensAt'
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
