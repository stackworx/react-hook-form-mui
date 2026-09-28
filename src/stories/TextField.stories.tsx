import {TextField} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'Core/TextField'} satisfies Meta;
export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormStory<{name: string; code: string}>
      defaultValues={{name: '', code: ''}}
    >
      {(control) => (
        <>
          <TextField
            name='name'
            control={control}
            label='Full name'
            helperText='As it appears on your ID'
            rules={{required: 'Name is required'}}
          />
          <TextField
            name='code'
            control={control}
            label='Cost centre (upper-cased)'
            transform={{
              input: (value) => value,
              output: (text) => text.toUpperCase(),
            }}
            rules={{
              pattern: {value: /^[A-Z]{3}-\d{3}$/, message: 'Use ABC-123'},
            }}
          />
        </>
      )}
    </FormStory>
  ),
};
