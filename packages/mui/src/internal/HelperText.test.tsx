import {act, screen} from '@testing-library/react';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../../test/renderWithForm';
import {Checkbox} from '../Checkbox';
import {TextField} from '../TextField';
import {HelperTextProvider} from './HelperText';

function helperLines(container: HTMLElement) {
  return container.querySelectorAll('.MuiFormHelperText-root');
}

test('an empty helper line keeps its space by default, hidden from screen readers', () => {
  const {container} = renderWithForm<{name: string}>(
    (control) => <TextField name='name' control={control} label='Name' />,
    {defaultValues: {name: ''}},
  );
  const [line] = helperLines(container);
  expect(line).toBeDefined();
  expect(line?.textContent).toBe('​');
  expect(line?.querySelector('[aria-hidden="true"]')).not.toBeNull();
});

test('reserveHelperText={false} leaves the line out', () => {
  const {container} = renderWithForm<{name: string}>(
    (control) => (
      <TextField
        name='name'
        control={control}
        label='Name'
        reserveHelperText={false}
      />
    ),
    {defaultValues: {name: ''}},
  );
  expect(helperLines(container)).toHaveLength(0);
});

test('HelperTextProvider sets it for a form, and a field overrides it', () => {
  const {container} = renderWithForm<{name: string; email: string}>(
    (control) => (
      <HelperTextProvider reserve={false}>
        <TextField name='name' control={control} label='Name' />
        <TextField
          name='email'
          control={control}
          label='Email'
          reserveHelperText
        />
      </HelperTextProvider>
    ),
    {defaultValues: {name: '', email: ''}},
  );
  const lines = helperLines(container);
  expect(lines).toHaveLength(1);
  expect(
    screen.getByRole('textbox', {name: 'Email'}).getAttribute(
      'aria-describedby',
    ),
  ).toBe(lines[0]?.id);
});

test('an error takes the reserved line, and only then describes the checkbox', async () => {
  const {container, form} = renderWithForm<{terms: boolean}>(
    (control) => (
      <Checkbox
        name='terms'
        control={control}
        label='I accept the terms'
        rules={{required: 'Accept the terms to continue'}}
      />
    ),
    {defaultValues: {terms: false}},
  );
  const checkbox = screen.getByRole('checkbox', {name: 'I accept the terms'});
  expect(helperLines(container)).toHaveLength(1);
  expect(checkbox).not.toHaveAttribute('aria-describedby');

  await act(() => form.trigger('terms'));

  expect(screen.getByText('Accept the terms to continue')).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('aria-describedby');
});
