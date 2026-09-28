import {Select} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';

const meta = {title: 'Core/Select'} satisfies Meta;
export default meta;

const shiftLengths = [
  {value: 4, label: '4 hours'},
  {value: 8, label: '8 hours'},
  {value: 12, label: '12 hours'},
];

export const Default: StoryObj = {
  render: () => (
    <FormStory<{length: number | null; lengths: number[]}>
      defaultValues={{length: null, lengths: []}}
    >
      {(control) => (
        <>
          <Select
            name='length'
            control={control}
            label='Shift length'
            options={shiftLengths}
            rules={{required: 'Pick a length'}}
          />
          <Select
            name='lengths'
            control={control}
            label='Allowed lengths'
            options={shiftLengths}
            multiple
          />
        </>
      )}
    </FormStory>
  ),
};
