import {Switch} from '@stackworx/react-hook-form-mui';
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
  title: 'Core/Switch',
  component: documented<Args>(Switch),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Email notifications',
    helperText: 'Order updates and receipts',
    size: 'medium',
    color: 'primary',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    size: {control: 'inline-radio', options: ['small', 'medium']},
  },
  parameters: {
    controls: {include: [...formAndFieldControls, 'size', 'color']},
  },
  render: (args) => (
    <FormStory<{notifications: boolean}>
      defaultValues={{notifications: true}}
      settings={args}
    >
      {(control) => (
        <Switch
          name='notifications'
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
