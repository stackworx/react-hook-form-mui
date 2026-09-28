import {DatePicker} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {DateTime} from 'luxon';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X/DatePicker'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{startDate: string | null}> defaultValues={{startDate: null}}>
      {(control) => (
        <DatePicker
          name='startDate'
          control={control}
          label='Start date (stored as an ISO date)'
          disablePast
          helperText='Today or later'
          rules={{required: 'Pick a start date'}}
          transform={{
            input: (value) => (value === null ? null : DateTime.fromISO(value)),
            output: (date) => date?.toISODate() ?? null,
          }}
        />
      )}
    </FormStory>
  ),
};
