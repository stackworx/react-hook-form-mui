import {CheckboxGroup} from '@stackworx/react-hook-form-mui';
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
  title: 'Core/CheckboxGroup',
  component: documented<Args>(CheckboxGroup),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Delivery days',
    required: 'Pick at least one day',
    row: true,
    size: 'medium',
    color: 'primary',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    size: {control: 'inline-radio', options: ['small', 'medium', 'large']},
  },
  parameters: {
    controls: {include: [...formAndFieldControls, 'row', 'size', 'color']},
  },
  render: (args) => (
    <FormStory<{days: number[]}>
      defaultValues={{days: [1, 2, 3, 4, 5]}}
      settings={args}
    >
      {(control) => (
        <CheckboxGroup
          name='days'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          row={args.row}
          size={args.size}
          color={args.color}
          options={[
            {value: 1, label: 'Mon'},
            {value: 2, label: 'Tue'},
            {value: 3, label: 'Wed'},
            {value: 4, label: 'Thu'},
            {value: 5, label: 'Fri'},
            {value: 6, label: 'Sat'},
            {value: 7, label: 'Sun', disabled: true},
          ]}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
