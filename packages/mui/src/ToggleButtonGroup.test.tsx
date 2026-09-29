import {act, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {ToggleButtonGroup} from './ToggleButtonGroup';

const sizes = [
  {value: 1, label: 'Small'},
  {value: 2, label: 'Medium'},
  {value: 3, label: 'Large'},
] as const;

test('exclusive stores one typed value and deselecting stores null', async () => {
  const {form} = renderWithForm<{size: number | null}>(
    (control) => (
      <ToggleButtonGroup
        name='size'
        control={control}
        label='Size'
        options={sizes}
      />
    ),
    {defaultValues: {size: null}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Medium'}));
  expect(form.getValues('size')).toBe(2);
  expect(screen.getByRole('button', {name: 'Medium'})).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await userEvent.click(screen.getByRole('button', {name: 'Medium'}));
  expect(form.getValues('size')).toBeNull();
});

test('enforceValue keeps the selection when the active button is clicked', async () => {
  const {form} = renderWithForm<{size: number | null}>(
    (control) => (
      <ToggleButtonGroup
        name='size'
        control={control}
        label='Size'
        options={sizes}
        enforceValue
      />
    ),
    {defaultValues: {size: 1}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Small'}));
  expect(form.getValues('size')).toBe(1);
  await userEvent.click(screen.getByRole('button', {name: 'Large'}));
  expect(form.getValues('size')).toBe(3);
});

test('non-exclusive stores an array', async () => {
  const {form} = renderWithForm<{sizes: number[]}>(
    (control) => (
      <ToggleButtonGroup
        name='sizes'
        control={control}
        label='Sizes'
        options={sizes}
        exclusive={false}
      />
    ),
    {defaultValues: {sizes: [3]}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Small'}));
  expect(form.getValues('sizes')).toEqual([3, 1]);
  await userEvent.click(screen.getByRole('button', {name: 'Large'}));
  expect(form.getValues('sizes')).toEqual([1]);
});

test('required error renders in the helper text', async () => {
  const {form} = renderWithForm<{size: number | null}>(
    (control) => (
      <ToggleButtonGroup
        name='size'
        control={control}
        label='Size'
        options={sizes}
        rules={{required: 'Choose a size'}}
      />
    ),
    {defaultValues: {size: null}},
  );
  await act(() => form.trigger('size'));
  expect(screen.getByRole('group', {name: 'Size'}))
    .toHaveAccessibleDescription('Choose a size');
});

test('setFocus focuses the first button', async () => {
  const {form} = renderWithForm<{size: number | null}>(
    (control) => (
      <ToggleButtonGroup
        name='size'
        control={control}
        label='Size'
        options={sizes}
      />
    ),
    {defaultValues: {size: null}},
  );
  form.setFocus('size');
  await waitFor(() => {
    expect(screen.getByRole('button', {name: 'Small'})).toHaveFocus();
  });
});

test('with suppressFormChange, handleChange gets the typed value and stores what it keeps', async () => {
  const seen: unknown[] = [];
  const {form} = renderWithForm<{size: number | null}>(
    (control) => (
      <ToggleButtonGroup
        name='size'
        control={control}
        label='Size'
        options={sizes}
        suppressFormChange
        handleChange={(_event, value) => {
          seen.push(value);
          if (!Array.isArray(value) && value !== 3) {
            form.setValue('size', value);
          }
        }}
      />
    ),
    {defaultValues: {size: 1}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Large'}));
  expect(seen).toEqual([3]);
  expect(form.getValues('size')).toBe(1);
  expect(screen.getByRole('button', {name: 'Large'})).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await userEvent.click(screen.getByRole('button', {name: 'Medium'}));
  expect(form.getValues('size')).toBe(2);
});
