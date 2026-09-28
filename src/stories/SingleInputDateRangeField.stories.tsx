import type {DateRange} from '@mui/x-date-pickers-pro/models';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {SingleInputDateRangeField} from '@stackworx/react-hook-form-mui-x-date-pickers-pro';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X Pro/SingleInputDateRangeField'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{period: DateRange<PickerValidDate>}>
      defaultValues={{period: [null, null]}}
    >
      {(control) => (
        <SingleInputDateRangeField
          name='period'
          control={control}
          label='Reporting period'
        />
      )}
    </FormStory>
  ),
};
