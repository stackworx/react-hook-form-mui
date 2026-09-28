import {act, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';
import {NumberField} from '@stackworx/react-hook-form-mui/number-field';
import {renderWithForm} from '../../../test/renderWithForm';

test('typing stores a number and clearing stores null', async () => {
  const {form} = renderWithForm<{hours: number | null}>(
    (control) => <NumberField name='hours' control={control} label='Hours' />,
    {defaultValues: {hours: null}},
  );
  const input = screen.getByLabelText('Hours');
  await userEvent.type(input, '12');
  expect(form.getValues('hours')).toBe(12);
  await userEvent.clear(input);
  expect(form.getValues('hours')).toBeNull();
});

test('shows the rule message for a value below min', async () => {
  renderWithForm<{hours: number | null}>(
    (control) => (
      <NumberField
        name='hours'
        control={control}
        label='Hours'
        rules={{min: {value: 10, message: 'At least 10'}}}
        helperText='Whole hours'
      />
    ),
    {defaultValues: {hours: null}},
  );
  const input = screen.getByLabelText('Hours');
  expect(input).toHaveAccessibleDescription('Whole hours');
  expect(input).toHaveAttribute('aria-invalid', 'false');
  await userEvent.type(input, '5');
  expect(await screen.findByText('At least 10')).toBeInTheDocument();
  expect(screen.queryByText('Whole hours')).not.toBeInTheDocument();
  expect(input).toHaveAccessibleDescription('At least 10');
  expect(input).toHaveAttribute('aria-invalid', 'true');
});

test('renders the form value and follows external changes', () => {
  const {form} = renderWithForm<{hours: number | null}>(
    (control) => <NumberField name='hours' control={control} label='Hours' />,
    {defaultValues: {hours: 7}},
  );
  const input = screen.getByLabelText('Hours');
  expect(input).toHaveValue('7');
  act(() => {
    form.setValue('hours', 30);
  });
  expect(input).toHaveValue('30');
});

test('the stepper buttons change the value by step within max', async () => {
  const {form} = renderWithForm<{hours: number | null}>(
    (control) => (
      <NumberField
        name='hours'
        control={control}
        label='Hours'
        step={5}
        max={12}
      />
    ),
    {defaultValues: {hours: 5}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Increase'}));
  expect(form.getValues('hours')).toBe(10);
  await userEvent.click(screen.getByRole('button', {name: 'Increase'}));
  expect(form.getValues('hours')).toBe(12);
});

test('setFocus focuses the input', async () => {
  const {form} = renderWithForm<{hours: number | null}>(
    (control) => <NumberField name='hours' control={control} label='Hours' />,
    {defaultValues: {hours: null}},
  );
  const input = screen.getByLabelText('Hours');
  expect(input).not.toHaveFocus();
  form.setFocus('hours');
  await waitFor(() => {
    expect(input).toHaveFocus();
  });
});

test('disabled disables the input and skips validation', async () => {
  const {form} = renderWithForm<{hours: number | null}>(
    (control) => (
      <NumberField
        name='hours'
        control={control}
        label='Hours'
        rules={{required: true}}
        disabled
      />
    ),
    {defaultValues: {hours: null}},
  );
  expect(screen.getByLabelText('Hours')).toBeDisabled();
  let valid = false;
  await act(async () => {
    valid = await form.trigger('hours');
  });
  expect(valid).toBe(true);
});
