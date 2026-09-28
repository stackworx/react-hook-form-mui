import {act, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test, vi} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {TextField} from './TextField';

test('binds value, composes onChange and shows required error', async () => {
  const onChange = vi.fn();
  const onBlur = vi.fn();
  const {form} = renderWithForm<{name: string}>(
    (control) => (
      <TextField
        name='name'
        control={control}
        label='Name'
        rules={{required: 'Name is required'}}
        onChange={onChange}
        onBlur={onBlur}
        helperText='Your full name'
      />
    ),
    {defaultValues: {name: ''}, mode: 'onBlur'},
  );
  const input = screen.getByLabelText('Name');
  expect(screen.getByText('Your full name')).toBeInTheDocument();
  await userEvent.click(input);
  await userEvent.tab();
  expect(await screen.findByText('Name is required')).toBeInTheDocument();
  expect(screen.queryByText('Your full name')).not.toBeInTheDocument();
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(onBlur).toHaveBeenCalled();
  await userEvent.type(input, 'Ada');
  expect(form.getValues('name')).toBe('Ada');
  expect(onChange).toHaveBeenCalled();
});

test('setFocus focuses the input', async () => {
  const {form} = renderWithForm<{name: string}>(
    (control) => <TextField name='name' control={control} label='Name' />,
    {defaultValues: {name: ''}},
  );
  const input = screen.getByLabelText('Name');
  expect(input).not.toHaveFocus();
  form.setFocus('name');
  await waitFor(() => {
    expect(input).toHaveFocus();
  });
});

test('transform maps between form value and text', async () => {
  const {form} = renderWithForm<{code: string}>(
    (control) => (
      <TextField
        name='code'
        control={control}
        label='Code'
        transform={{
          input: (value) => value.toLowerCase(),
          output: (text) => text.toUpperCase(),
        }}
      />
    ),
    {defaultValues: {code: 'XY'}},
  );
  const input = screen.getByLabelText('Code');
  expect(input).toHaveValue('xy');
  await userEvent.clear(input);
  await userEvent.type(input, 'ab');
  expect(form.getValues('code')).toBe('AB');
  expect(input).toHaveValue('ab');
});

test('an undefined value renders as an empty controlled input', async () => {
  const consoleError = vi.spyOn(console, 'error');
  const {form} = renderWithForm<{note?: string}>((control) => (
    <TextField name='note' control={control} label='Note' />
  ));
  const input = screen.getByLabelText('Note');
  expect(input).toHaveValue('');
  await userEvent.type(input, 'hi');
  expect(form.getValues('note')).toBe('hi');
  expect(consoleError).not.toHaveBeenCalled();
  consoleError.mockRestore();
});

test('disabled is forwarded to the input and to RHF', async () => {
  const {form} = renderWithForm<{name: string}>(
    (control) => (
      <TextField
        name='name'
        control={control}
        label='Name'
        rules={{required: true}}
        disabled
      />
    ),
    {defaultValues: {name: ''}},
  );
  expect(screen.getByLabelText('Name')).toBeDisabled();
  let valid = false;
  await act(async () => {
    valid = await form.trigger('name');
  });
  expect(valid).toBe(true);
});
