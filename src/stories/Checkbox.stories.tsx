import {Checkbox} from '@stackworx/react-hook-form-mui';
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
  size: 'small' | 'medium' | 'large';
  color:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'default';
}

const meta = {
  title: 'Core/Checkbox',
  component: documented<Args>(Checkbox),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'I accept the terms',
    helperText: 'Required to continue',
    required: 'Please accept the terms',
    size: 'medium',
    color: 'primary',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    size: {control: 'inline-radio', options: ['small', 'medium', 'large']},
  },
  parameters: {
    controls: {include: [...formAndFieldControls, 'size', 'color']},
  },
  render: (args) => (
    <FormStory<{accept: boolean}>
      defaultValues={{accept: false}}
      settings={args}
    >
      {(control) => (
        <Checkbox
          name='accept'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          size={args.size}
          color={args.color}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
