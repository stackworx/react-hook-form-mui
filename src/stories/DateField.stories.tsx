import {DateField} from '@stackworx/react-hook-form-mui-x-date-pickers';
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
  readOnly: boolean;
  format: string;
  messages?: PickerErrorMessages;
}

const meta = {
  title: 'MUI X/DateField',
  component: documented<Args>(DateField),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Due date',
    disablePast: false,
    disableFuture: false,
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
        'readOnly',
        'format',
      ],
    },
  },
  render: (args) => (
    <FormStory<{dueDate: DateTime | null}>
      // A new starting value needs a new form: default values are read once.
      key={String(args.initial)}
      defaultValues={{dueDate: fromDateControl(args.initial) ?? null}}
      settings={args}
    >
      {(control) => (
        <DateField
          name='dueDate'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
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

export const Required: Story = {args: {required: 'Enter a due date'}};

export const MinAndMax: Story = {
  args: {
    minDate: dateControl('2026-01-01'),
    maxDate: dateControl('2026-12-31'),
    helperText: 'During 2026',
  },
};

export const CustomMessages: Story = {
  args: {
    label: 'Date of birth',
    disableFuture: true,
    maxDate: DateTime.now().minus({years: 16}).toMillis(),
    messages: {
      disableFuture: 'A date of birth cannot be in the future',
      maxDate: 'You must be at least 16',
    },
  },
  render: (args) => (
    <FormStory<{dateOfBirth: DateTime | null}>
      defaultValues={{dateOfBirth: null}}
      settings={args}
    >
      {(control) => (
        <DateField
          name='dateOfBirth'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          maxDate={fromDateControl(args.maxDate)}
          disableFuture={args.disableFuture}
          readOnly={args.readOnly}
          format={args.format === '' ? undefined : args.format}
          messages={args.messages}
        />
      )}
    </FormStory>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initial: dateControl('2026-11-30'),
    helperText: 'Agreed when the order was placed',
  },
};

export const IsoString: Story = {
  name: 'Stored as an ISO string',
  args: {helperText: 'Stored as an ISO 8601 date (yyyy-MM-dd)'},
  render: (args) => (
    <FormStory<{dueDate: string | null}>
      defaultValues={{dueDate: '2026-11-30'}}
      settings={args}
    >
      {(control) => (
        <DateField
          name='dueDate'
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
