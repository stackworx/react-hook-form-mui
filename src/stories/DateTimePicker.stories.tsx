import {DateTimePicker} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {DateTime} from 'luxon';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X/DateTimePicker'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{clockIn: PickerValidDate | null}>
      defaultValues={{clockIn: null}}
    >
      {(control) => (
        <DateTimePicker
          name='clockIn'
          control={control}
          label='Clock in'
          maxDateTime={DateTime.now()}
          helperText='Not in the future'
        />
      )}
    </FormStory>
  ),
};
