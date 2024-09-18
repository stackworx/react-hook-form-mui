import { Meta } from '@storybook/react';
import { Autocomplete } from '../../packages/mui/src/Autocomplete';
import { FormDecorator } from '../decorators/FormDecorator';
import { UseFormProps } from 'react-hook-form/dist/types';
import { Movie, top100Films } from './data';
import { ComponentProps } from 'react';
import TextField from '@mui/material/TextField';
import { useFormState } from 'react-hook-form';

export default {
  title: 'Core/Autocomplete',
  decorators: [
    (Story, context) => {
      return (
        <FormDecorator formProps={context.args.form}>
          <Story />
        </FormDecorator>
      );
    },
  ],
  render: ({
    name,
    control,
    rules,
    label,
    helperText,
    ...autocompleteProps
  }) => {
    const { touchedFields, errors } = useFormState();

    return (
      <Autocomplete
        {...autocompleteProps}
        name={name}
        control={control}
        rules={rules}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={label}
            error={touchedFields[name] && !!errors[name]}
            helperText={(errors[name]?.message as string) ?? helperText ?? ' '}
            variant="outlined"
          />
        )}
      />
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    name: 'autocomplete',
    options: top100Films,
    getOptionLabel: (option: Movie) => option.title,
    form: {
      defaultValues: { autocomplete: top100Films[0] },
    },
  },
  actions: {
    onSubmit: 'submit',
  },
  argTypes: { onSubmit: { action: 'submit' } },
} as Meta<
  ComponentProps<typeof Autocomplete> & {
    form: UseFormProps;
    label: string;
    helperText: string;
  }
>;

export const Default = {
  args: {
    label: 'Default',
  },
};

export const Multiple = {
  args: {
    form: {
      defaultValues: { autocomplete: [top100Films[0], top100Films[1]] },
    },
    label: 'Multiple',
    multiple: true,
  },
};

export const Required = {
  args: {
    label: 'Required',
    rules: { required: 'Required' },
  },
};

export const WithHelperText = {
  args: {
    label: 'With Helper Text',
    rules: { required: 'Required' },
    helperText: 'Should be overwritten by error',
  },
};
