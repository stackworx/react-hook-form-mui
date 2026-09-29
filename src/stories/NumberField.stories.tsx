import {NumberField} from '@stackworx/react-hook-form-mui/number-field';
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
  min: number;
  max: number;
  step: number;
  size: 'small' | 'medium';
}

const meta = {
  title: 'Core/NumberField',
  component: documented<Args>(NumberField),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Study hours',
    helperText: 'Per week',
    required: 'Hours are required',
    min: 0,
    max: 60,
    step: 0.5,
    size: 'medium',
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    min: {
      control: 'number',
      description: 'The lowest value the field allows.',
    },
    max: {
      control: 'number',
      description: 'The highest value the field allows.',
    },
    step: {
      control: 'number',
      description: 'How much the buttons and arrow keys change the value.',
    },
    size: {control: 'inline-radio', options: ['small', 'medium']},
  },
  parameters: {
    controls: {
      include: [...formAndFieldControls, 'min', 'max', 'step', 'size'],
    },
  },
  render: (args) => (
    <FormStory<{hours: number | null}>
      defaultValues={{hours: null}}
      settings={args}
    >
      {(control) => (
        <NumberField
          name='hours'
          control={control}
          {...fieldProps(args)}
          rules={{
            required: requiredRule(args),
            min: {value: 4, message: 'At least 4 hours'},
          }}
          min={args.min}
          max={args.max}
          step={args.step}
          size={args.size}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
