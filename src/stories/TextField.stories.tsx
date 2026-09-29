import {TextField} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {
  documented,
  fieldArgs,
  fieldArgTypes,
  fieldProps,
  formAndFieldControls,
  formArgs,
  formArgTypes,
  requiredRule,
} from './controls';
import type {FieldArgs, FormArgs} from './controls';
import {FormStory} from './FormStory';

interface Args extends FormArgs, FieldArgs {
  placeholder: string;
  multiline: boolean;
  minRows: number;
  size: 'small' | 'medium';
  variant: 'outlined' | 'filled' | 'standard';
}

const meta = {
  title: 'Core/TextField',
  component: documented<Args>(TextField),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Full name',
    helperText: 'As it appears on your ID',
    required: 'Name is required',
    placeholder: '',
    multiline: false,
    minRows: 3,
    size: 'medium',
    variant: 'outlined',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    size: {control: 'inline-radio', options: ['small', 'medium']},
    variant: {
      control: 'inline-radio',
      options: ['outlined', 'filled', 'standard'],
    },
  },
  parameters: {
    controls: {
      include: [
        ...formAndFieldControls,
        'placeholder',
        'multiline',
        'minRows',
        'size',
        'variant',
      ],
    },
  },
  render: (args) => (
    <FormStory<{name: string}> defaultValues={{name: ''}} settings={args}>
      {(control) => (
        <TextField
          name='name'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          placeholder={args.placeholder === '' ? undefined : args.placeholder}
          multiline={args.multiline}
          minRows={args.multiline ? args.minRows : undefined}
          size={args.size}
          variant={args.variant}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Transform: Story = {
  name: 'Transform (upper-cased)',
  args: {
    label: 'Cost centre',
    helperText: 'Upper-cased as you type, as ABC-123',
    required: '',
  },
  render: (args) => (
    <FormStory<{code: string}> defaultValues={{code: ''}} settings={args}>
      {(control) => (
        <TextField
          name='code'
          control={control}
          {...fieldProps(args)}
          size={args.size}
          variant={args.variant}
          transform={{
            input: (value) => value,
            output: (text) =>
              text.toUpperCase(),
          }}
          rules={{
            required: requiredRule(args),
            pattern: {value: /^[A-Z]{3}-\d{3}$/, message: 'Use ABC-123'},
          }}
        />
      )}
    </FormStory>
  ),
};
