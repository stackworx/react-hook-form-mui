import {RadioGroup} from '@stackworx/react-hook-form-mui';
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
  title: 'Core/RadioGroup',
  component: documented<Args>(RadioGroup),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Is this a gift?',
    required: 'Choose one',
    row: true,
    size: 'medium',
    color: 'primary',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    size: {control: 'inline-radio', options: ['small', 'medium']},
  },
  parameters: {
    controls: {include: [...formAndFieldControls, 'row', 'size', 'color']},
  },
  render: (args) => (
    <FormStory<{gift: boolean | null}>
      defaultValues={{gift: null}}
      settings={args}
    >
      {(control) => (
        <RadioGroup
          name='gift'
          control={control}
          {...fieldProps(args)}
          rules={{
            // RHF's `required` rejects `false`, which is what "No" stores.
            validate: (value) => value !== null || (requiredRule(args) ?? true),
          }}
          row={args.row}
          size={args.size}
          color={args.color}
          options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
