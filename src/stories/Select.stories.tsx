import {Select} from '@stackworx/react-hook-form-mui';
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
  size: 'small' | 'medium';
  variant: 'outlined' | 'filled' | 'standard';
}

const lengths = [
  {value: 4, label: '4 hours'},
  {value: 8, label: '8 hours'},
  {value: 12, label: '12 hours'},
];

const meta = {
  title: 'Core/Select',
  component: documented<Args>(Select),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Booking length',
    required: 'Pick a length',
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
    controls: {include: [...formAndFieldControls, 'size', 'variant']},
  },
  render: (args) => (
    <FormStory<{length: number | null}>
      defaultValues={{length: null}}
      settings={args}
    >
      {(control) => (
        <Select
          name='length'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          options={lengths}
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

export const Multiple: Story = {
  args: {label: 'Allowed lengths', required: ''},
  render: (args) => (
    <FormStory<{lengths: number[]}>
      defaultValues={{lengths: []}}
      settings={args}
    >
      {(control) => (
        <Select
          name='lengths'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          options={lengths}
          multiple
          size={args.size}
          variant={args.variant}
        />
      )}
    </FormStory>
  ),
};
