import {ToggleButtonGroup} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'Core/ToggleButtonGroup'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{view: string | null; channels: string[]}>
      defaultValues={{view: 'week', channels: ['email']}}
    >
      {(control) => (
        <>
          <ToggleButtonGroup
            name='view'
            control={control}
            label='Roster view (always one)'
            enforceValue
            options={[
              {value: 'day', label: 'Day'},
              {value: 'week', label: 'Week'},
              {value: 'month', label: 'Month'},
            ]}
          />
          <ToggleButtonGroup
            name='channels'
            control={control}
            label='Channels'
            exclusive={false}
            options={[
              {value: 'email', label: 'Email'},
              {value: 'sms', label: 'SMS'},
              {value: 'push', label: 'Push'},
            ]}
          />
        </>
      )}
    </FormStory>
  ),
};
