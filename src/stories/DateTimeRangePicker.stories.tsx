import type {DateRange} from '@mui/x-date-pickers-pro/models';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {DateTimeRangePicker} from '@stackworx/react-hook-form-mui-x-date-pickers-pro';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X Pro/DateTimeRangePicker'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{shift: DateRange<PickerValidDate>}>
      defaultValues={{shift: [null, null]}}
    >
      {(control) => (
        <DateTimeRangePicker name='shift' control={control} label='Shift' />
      )}
    </FormStory>
  ),
};
