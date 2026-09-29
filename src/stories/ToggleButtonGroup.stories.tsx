import {ToggleButtonGroup} from '@stackworx/react-hook-form-mui';
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
  row: boolean;
  enforceValue: boolean;
  size: 'small' | 'medium' | 'large';
  color:
    | 'standard'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

const meta = {
  title: 'Core/ToggleButtonGroup',
  component: documented<Args>(ToggleButtonGroup),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Calendar view',
    row: true,
    enforceValue: true,
    size: 'medium',
    color: 'standard',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    size: {control: 'inline-radio', options: ['small', 'medium', 'large']},
  },
  parameters: {
    controls: {
      include: [
        ...formAndFieldControls,
        'row',
        'enforceValue',
        'size',
        'color',
      ],
    },
  },
  render: (args) => (
    <FormStory<{view: string | null}>
      defaultValues={{view: 'week'}}
      settings={args}
    >
      {(control) => (
        <ToggleButtonGroup
          name='view'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          row={args.row}
          enforceValue={args.enforceValue}
          size={args.size}
          color={args.color}
          options={[
            {value: 'day', label: 'Day'},
            {value: 'week', label: 'Week'},
            {value: 'month', label: 'Month'},
          ]}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  name: 'Multiple (exclusive={false})',
  args: {label: 'Channels', enforceValue: false},
  render: (args) => (
    <FormStory<{channels: string[]}>
      defaultValues={{channels: ['email']}}
      settings={args}
    >
      {(control) => (
        <ToggleButtonGroup
          name='channels'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          exclusive={false}
          row={args.row}
          enforceValue={args.enforceValue}
          size={args.size}
          color={args.color}
          options={[
            {value: 'email', label: 'Email'},
            {value: 'sms', label: 'SMS'},
            {value: 'push', label: 'Push'},
          ]}
        />
      )}
    </FormStory>
  ),
};
