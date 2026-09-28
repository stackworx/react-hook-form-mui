import {Checkbox} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'Core/Checkbox'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{accept: boolean}> defaultValues={{accept: false}}>
      {(control) => (
        <Checkbox
          name='accept'
          control={control}
          label='I accept the terms'
          helperText='Required to continue'
          rules={{validate: (value) => value || 'Please accept the terms'}}
        />
      )}
    </FormStory>
  ),
};
