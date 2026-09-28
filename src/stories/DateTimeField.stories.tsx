import {DateTimeField} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X/DateTimeField'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{clockOut: PickerValidDate | null}>
      defaultValues={{clockOut: null}}
    >
      {(control) => (
        <DateTimeField
          name='clockOut'
          control={control}
          label='Clock out'
          rules={{required: 'Clock-out time is required'}}
        />
      )}
    </FormStory>
  ),
};
