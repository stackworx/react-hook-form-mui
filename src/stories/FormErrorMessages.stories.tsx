import {
  Checkbox,
  FormErrorMessagesProvider,
  TextField,
} from '@stackworx/react-hook-form-mui';
import {NumberField} from '@stackworx/react-hook-form-mui/number-field';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {documented, formArgs, formArgTypes, formControls} from './controls';
import type {FormArgs} from './controls';
import {FormStory} from './FormStory';

interface Order {
  name: string;
  postalCode: string;
  quantity: number | null;
  terms: boolean;
}

const meta = {
  title: 'Core/FormErrorMessagesProvider',
  component: documented<FormArgs>(FormErrorMessagesProvider),
  args: {...formArgs},
  argTypes: {...formArgTypes},
  parameters: {
    controls: {include: formControls},
  },
  render: (args) => (
    <FormErrorMessagesProvider messages={{required: 'Please fill this in'}}>
      <FormStory<Order>
        defaultValues={{name: '', postalCode: '', quantity: null, terms: false}}
        settings={args}
      >
        {(control) => (
          <>
            <TextField
              name='name'
              control={control}
              label='Full name'
              rules={{required: true, minLength: 2}}
            />
            <TextField
              name='postalCode'
              control={control}
              label='Postal code'
              helperText='Four digits'
              rules={{required: true, pattern: /^\d{4}$/}}
            />
            <NumberField
              name='quantity'
              control={control}
              label='Quantity'
              helperText='From 1 to 10'
              rules={{min: 1, max: 10}}
            />
            <Checkbox
              name='terms'
              control={control}
              label='I accept the terms'
              rules={{required: true}}
            />
          </>
        )}
      </FormStory>
    </FormErrorMessagesProvider>
  ),
} satisfies Meta<FormArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const RulesWithoutMessages: Story = {};

export const Afrikaans: Story = {
  render: (args) => (
    <FormErrorMessagesProvider
      messages={{
        required: 'Dit is verpligtend',
        min: 'Die waarde is te klein',
        max: 'Die waarde is te groot',
        minLength: 'Te kort',
        maxLength: 'Te lank',
        pattern: 'Ongeldige formaat',
        validate: 'Ongeldige waarde',
      }}
    >
      <FormStory<Order>
        defaultValues={{name: '', postalCode: '', quantity: null, terms: false}}
        settings={args}
      >
        {(control) => (
          <>
            <TextField
              name='name'
              control={control}
              label='Volle naam'
              rules={{required: true, minLength: 2}}
            />
            <TextField
              name='postalCode'
              control={control}
              label='Poskode'
              helperText='Vier syfers'
              rules={{required: true, pattern: /^\d{4}$/}}
            />
            <NumberField
              name='quantity'
              control={control}
              label='Hoeveelheid'
              helperText='Van 1 tot 10'
              rules={{min: 1, max: 10}}
            />
            <Checkbox
              name='terms'
              control={control}
              label='Ek aanvaar die bepalings'
              rules={{required: true}}
            />
          </>
        )}
      </FormStory>
    </FormErrorMessagesProvider>
  ),
};
