import {DateField} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {DateTime} from 'luxon';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X/DateField'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{birthday: PickerValidDate | null}>
      defaultValues={{birthday: null}}
    >
      {(control) => (
        <DateField
          name='birthday'
          control={control}
          label='Date of birth'
          disableFuture
          maxDate={DateTime.now().minus({years: 16})}
          messages={{maxDate: 'Must be at least 16'}}
        />
      )}
    </FormStory>
  ),
};
