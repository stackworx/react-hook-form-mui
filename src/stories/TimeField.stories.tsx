import {TimeField} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'MUI X/TimeField'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{breakAt: PickerValidDate | null}>
      defaultValues={{breakAt: null}}
    >
      {(control) => (
        <TimeField
          name='breakAt'
          control={control}
          label='Break at'
          rules={{required: true}}
        />
      )}
    </FormStory>
  ),
};
