import {RadioGroup} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'Core/RadioGroup'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{overtime: boolean | null}> defaultValues={{overtime: null}}>
      {(control) => (
        <RadioGroup
          name='overtime'
          control={control}
          label='Eligible for overtime'
          row
          options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]}
          rules={{validate: (value) => value !== null || 'Choose one'}}
        />
      )}
    </FormStory>
  ),
};
