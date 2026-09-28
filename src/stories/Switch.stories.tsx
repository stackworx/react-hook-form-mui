import {Switch} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'Core/Switch'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{notifications: boolean}> defaultValues={{notifications: true}}>
      {(control) => (
        <Switch
          name='notifications'
          control={control}
          label='Email notifications'
          helperText='Roster changes and approvals'
        />
      )}
    </FormStory>
  ),
};
