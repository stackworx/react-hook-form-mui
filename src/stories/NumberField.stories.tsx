import {NumberField} from '@stackworx/react-hook-form-mui/number-field';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'Core/NumberField'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{hours: number | null}> defaultValues={{hours: null}}>
      {(control) => (
        <NumberField
          name='hours'
          control={control}
          label='Contracted hours'
          min={0}
          max={60}
          step={0.5}
          helperText='Per week'
          rules={{
            required: 'Hours are required',
            min: {value: 4, message: 'At least 4 hours'},
          }}
        />
      )}
    </FormStory>
  ),
};
