import {TimePicker} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {DateTime} from 'luxon';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X/TimePicker'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{startsAt: PickerValidDate | null}>
      defaultValues={{startsAt: null}}
    >
      {(control) => (
        <TimePicker
          name='startsAt'
          control={control}
          label='Starts at'
          minTime={DateTime.fromObject({hour: 6})}
          maxTime={DateTime.fromObject({hour: 22})}
          minutesStep={15}
        />
      )}
    </FormStory>
  ),
};
