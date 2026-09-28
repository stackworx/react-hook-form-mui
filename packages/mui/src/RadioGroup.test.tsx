import {act, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {RadioGroup} from './RadioGroup';

const levels = [
  {value: 1, label: 'Low'},
  {value: 2, label: 'Medium'},
  {value: 3, label: 'High'},
] as const;

test('choosing a radio stores the typed option value', async () => {
  const {form} = renderWithForm<{level: number | null}>(
    (control) => (
      <RadioGroup
        name='level'
        control={control}
        label='Level'
        options={levels}
      />
    ),
    {defaultValues: {level: 3}},
  );
  const group = screen.getByRole('radiogroup', {name: 'Level'});
  expect(within(group).getByRole('radio', {name: 'High'})).toBeChecked();
  await userEvent.click(within(group).getByRole('radio', {name: 'Medium'}));
  expect(form.getValues('level')).toBe(2);
  expect(within(group).getByRole('radio', {name: 'Medium'})).toBeChecked();
});

test('string options round-trip and null selects nothing', async () => {
  const {form} = renderWithForm<{shift: string | null}>(
    (control) => (
      <RadioGroup
        name='shift'
        control={control}
        label='Shift'
        options={[{value: 'am', label: 'Morning'}, {
          value: 'pm',
          label: 'Afternoon',
        }]}
        row
      />
    ),
    {defaultValues: {shift: null}},
  );
  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).not.toBeChecked();
  }
  await userEvent.click(screen.getByRole('radio', {name: 'Afternoon'}));
  expect(form.getValues('shift')).toBe('pm');
});

test('required error renders in the helper text', async () => {
  const {form} = renderWithForm<{level: number | null}>(
    (control) => (
      <RadioGroup
        name='level'
        control={control}
        label='Level'
        options={levels}
        rules={{required: 'Choose a level'}}
      />
    ),
    {defaultValues: {level: null}},
  );
  await act(() => form.trigger('level'));
  expect(screen.getByRole('radiogroup', {name: 'Level'}))
    .toHaveAccessibleDescription('Choose a level');
});

test('setFocus focuses the checked radio', async () => {
  const {form} = renderWithForm<{level: number | null}>(
    (control) => (
      <RadioGroup
        name='level'
        control={control}
        label='Level'
        options={levels}
      />
    ),
    {defaultValues: {level: 2}},
  );
  form.setFocus('level');
  await waitFor(() => {
    expect(screen.getByRole('radio', {name: 'Medium'})).toHaveFocus();
  });
});

test('boolean options store booleans', async () => {
  const {form} = renderWithForm<{overtime: boolean | null}>(
    (control) => (
      <RadioGroup
        name='overtime'
        control={control}
        label='Overtime'
        options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]}
      />
    ),
    {defaultValues: {overtime: null}},
  );
  await userEvent.click(screen.getByRole('radio', {name: 'No'}));
  expect(form.getValues('overtime')).toBe(false);
  await userEvent.click(screen.getByRole('radio', {name: 'Yes'}));
  expect(form.getValues('overtime')).toBe(true);
});
