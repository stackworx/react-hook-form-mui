import {act, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createRef} from 'react';
import {expect, test, vi} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {Switch} from './Switch';

test('clicking toggles the boolean and composes onChange', async () => {
  const onChange = vi.fn();
  const {form} = renderWithForm<{accept: boolean}>(
    (control) => (
      <Switch
        name='accept'
        control={control}
        label='Accept terms'
        onChange={onChange}
      />
    ),
    {defaultValues: {accept: false}},
  );
  const input = screen.getByRole('switch', {name: 'Accept terms'});
  expect(input).not.toBeChecked();
  await userEvent.click(input);
  expect(form.getValues('accept')).toBe(true);
  expect(input).toBeChecked();
  expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
  await userEvent.click(screen.getByText('Accept terms'));
  expect(form.getValues('accept')).toBe(false);
});

test('a validate rule message replaces the helper text', async () => {
  const {form} = renderWithForm<{accept: boolean}>(
    (control) => (
      <Switch
        name='accept'
        control={control}
        label='Accept terms'
        helperText='You can change this later'
        rules={{validate: (value) => value || 'Please accept'}}
      />
    ),
    {defaultValues: {accept: false}},
  );
  const input = screen.getByRole('switch', {name: 'Accept terms'});
  expect(input).toHaveAccessibleDescription('You can change this later');
  await act(() => form.trigger('accept'));
  expect(screen.getByText('Please accept')).toBeInTheDocument();
  expect(input).toHaveAccessibleDescription('Please accept');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  await userEvent.click(input);
  expect(screen.queryByText('Please accept')).not.toBeInTheDocument();
});

test('setFocus focuses the input and a consumer input ref still works', async () => {
  const consumerRef = createRef<HTMLInputElement>();
  const {form} = renderWithForm<{accept: boolean}>(
    (control) => (
      <Switch
        name='accept'
        control={control}
        label='Accept terms'
        slotProps={{input: {ref: consumerRef}}}
      />
    ),
    {defaultValues: {accept: false}},
  );
  const input = screen.getByRole('switch', {name: 'Accept terms'});
  expect(consumerRef.current).toBe(input);
  expect(input).not.toHaveFocus();
  form.setFocus('accept');
  await waitFor(() => {
    expect(input).toHaveFocus();
  });
});

test('disabled disables the input and is forwarded to RHF', async () => {
  const {form} = renderWithForm<{accept: boolean}>(
    (control) => (
      <Switch
        name='accept'
        control={control}
        label='Accept terms'
        rules={{validate: (value) => value || 'Please accept'}}
        disabled
      />
    ),
    {defaultValues: {accept: false}},
  );
  expect(screen.getByRole('switch', {name: 'Accept terms'})).toBeDisabled();
  let valid = false;
  await act(async () => {
    valid = await form.trigger('accept');
  });
  expect(valid).toBe(true);
});
