import {DateRangePicker} from '@stackworx/react-hook-form-mui-x-date-pickers-pro';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {DateTime} from 'luxon';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X Pro/DateRangePicker'} satisfies Meta;
export default meta;

interface Period {
  from: string | null;
  to: string | null;
}

export const Default: StoryObj = {
  render: () => (
    <FormStory<{period: Period}>
      defaultValues={{period: {from: null, to: null}}}
    >
      {(control) => (
        <DateRangePicker
          name='period'
          control={control}
          label='Leave period'
          rules={{
            validate: ({from, to}) =>
              (from !== null && to !== null) || 'Pick both dates',
          }}
          transform={{
            input: ({from, to}) => [
              from === null ? null : DateTime.fromISO(from),
              to === null ? null : DateTime.fromISO(to),
            ],
            output: ([start, end]) => ({
              from: start?.toISODate() ?? null,
              to: end?.toISODate() ?? null,
            }),
          }}
        />
      )}
    </FormStory>
  ),
};
