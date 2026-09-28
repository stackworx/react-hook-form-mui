import {CheckboxGroup} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'Core/CheckboxGroup'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{days: number[]}> defaultValues={{days: [1, 2, 3, 4, 5]}}>
      {(control) => (
        <CheckboxGroup
          name='days'
          control={control}
          label='Working days'
          row
          options={[
            {value: 1, label: 'Mon'},
            {value: 2, label: 'Tue'},
            {value: 3, label: 'Wed'},
            {value: 4, label: 'Thu'},
            {value: 5, label: 'Fri'},
            {value: 6, label: 'Sat'},
            {value: 7, label: 'Sun', disabled: true},
          ]}
          rules={{required: 'Pick at least one day'}}
        />
      )}
    </FormStory>
  ),
};
