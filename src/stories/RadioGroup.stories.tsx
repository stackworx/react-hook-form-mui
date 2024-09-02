import {Meta, StoryFn} from '@storybook/react';
import {useForm} from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {Radio, RadioGroup} from '../../packages/mui/src/RadioGroup';
import {Form} from './Form';

export default {
  title: 'Core/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {onSubmit: {action: 'submit'}},
} as Meta<typeof RadioGroup>;

const Template: StoryFn<typeof RadioGroup> = (args: any) => {
  const formProps = useForm<{
    radioGroup: any;
  }>({
    defaultValues: {
      radioGroup: false,
    },
  });
  return (
    <Form {...formProps} onSubmit={args.onSubmit}>
      <FormControl>
        <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
        <RadioGroup
          name='radioGroup'
          control={formProps.control}
          errors={formProps.formState.errors}
          {...args}
        >
          <FormControlLabel
            value='female'
            control={<Radio control={formProps.control} />}
            label='Female'
          />
          <FormControlLabel
            value='male'
            control={<Radio control={formProps.control} />}
            label='Male'
          />
          <FormControlLabel
            value='other'
            control={<Radio control={formProps.control} />}
            label='Other'
          />
        </RadioGroup>
      </FormControl>
    </Form>
  );
};

export const Default = {
  render: Template,
};

export const Required = {
  render: Template,

  args: {
    rules: {required: 'This field is required'},
  },
};
