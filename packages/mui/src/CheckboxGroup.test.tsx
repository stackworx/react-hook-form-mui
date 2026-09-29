import {act, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {CheckboxGroup} from './CheckboxGroup';

const days = [
  {value: 1, label: 'Monday'},
  {value: 2, label: 'Tuesday'},
  {value: 3, label: 'Wednesday', disabled: true},
] as const;

test('toggling adds and removes typed values', async () => {
  const {form} = renderWithForm<{days: number[]}>(
    (control) => (
      <CheckboxGroup
        name='days'
        control={control}
        label='Days'
        options={days}
      />
    ),
    {defaultValues: {days: [2]}},
  );
  const group = screen.getByRole('group', {name: 'Days'});
  expect(within(group).getByRole('checkbox', {name: 'Tuesday'})).toBeChecked();
  await userEvent.click(within(group).getByRole('checkbox', {name: 'Monday'}));
  expect(form.getValues('days')).toEqual([2, 1]);
  await userEvent.click(within(group).getByRole('checkbox', {name: 'Tuesday'}));
  expect(form.getValues('days')).toEqual([1]);
  expect(within(group).getByRole('checkbox', {name: 'Wednesday'}))
    .toBeDisabled();
});

test('an undefined value starts empty instead of crashing', async () => {
  const {form} = renderWithForm<{days?: number[]}>((control) => (
    <CheckboxGroup name='days' control={control} label='Days' options={days} />
  ));
  await userEvent.click(screen.getByRole('checkbox', {name: 'Monday'}));
  expect(form.getValues('days')).toEqual([1]);
});

test('required error renders in the helper text', async () => {
  const {form} = renderWithForm<{days: number[]}>(
    (control) => (
      <CheckboxGroup
        name='days'
        control={control}
        label='Days'
        options={days}
        helperText='Pick your shifts'
        rules={{required: 'Pick at least one day'}}
      />
    ),
    {defaultValues: {days: []}},
  );
  const group = screen.getByRole('group', {name: 'Days'});
  expect(group).toHaveAccessibleDescription('Pick your shifts');
  await act(() => form.trigger('days'));
  expect(group).toHaveAccessibleDescription('Pick at least one day');
});

test('setFocus focuses the first checkbox', async () => {
  const {form} = renderWithForm<{days: number[]}>(
    (control) => (
      <CheckboxGroup
        name='days'
        control={control}
        label='Days'
        options={days}
      />
    ),
    {defaultValues: {days: []}},
  );
  form.setFocus('days');
  await waitFor(() => {
    expect(screen.getByRole('checkbox', {name: 'Monday'})).toHaveFocus();
  });
});

test('with suppressFormChange, handleChange gets the new values and stores what it keeps', async () => {
  const {form} = renderWithForm<{days: number[]}>(
    (control) => (
      <CheckboxGroup
        name='days'
        control={control}
        label='Days'
        options={days}
        suppressFormChange
        handleChange={(_event, values) => {
          if (values.length <= 1) form.setValue('days', values);
        }}
      />
    ),
    {defaultValues: {days: [2]}},
  );
  await userEvent.click(screen.getByRole('checkbox', {name: 'Monday'}));
  expect(form.getValues('days')).toEqual([2]);
  expect(screen.getByRole('checkbox', {name: 'Monday'})).not.toBeChecked();
  await userEvent.click(screen.getByRole('checkbox', {name: 'Tuesday'}));
  expect(form.getValues('days')).toEqual([]);
});
