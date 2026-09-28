import {act, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useState} from 'react';
import type {Control} from 'react-hook-form';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {Select} from './Select';

const numbers = [
  {value: 10, label: 'Ten'},
  {value: 20, label: 'Twenty'},
  {value: 30, label: 'Thirty'},
] as const;

async function choose(label: string, option: string) {
  await userEvent.click(screen.getByRole('combobox', {name: label}));
  await userEvent.click(
    within(screen.getByRole('listbox')).getByRole('option', {name: option}),
  );
}

test('choosing an option stores its typed value', async () => {
  const {form} = renderWithForm<{size: number | null}>(
    (control) => (
      <Select name='size' control={control} label='Size' options={numbers} />
    ),
    {defaultValues: {size: null}},
  );
  expect(screen.getByRole('combobox', {name: 'Size'})).not.toHaveTextContent(
    /Ten|Twenty|Thirty/,
  );
  await choose('Size', 'Twenty');
  expect(form.getValues('size')).toBe(20);
  expect(screen.getByRole('combobox', {name: 'Size'})).toHaveTextContent(
    'Twenty',
  );
});

test('multiple stores an array and renders the chosen labels', async () => {
  const {form} = renderWithForm<{sizes: number[]}>(
    (control) => (
      <Select
        name='sizes'
        control={control}
        label='Sizes'
        options={numbers}
        multiple
      />
    ),
    {defaultValues: {sizes: [30]}},
  );
  await userEvent.click(screen.getByRole('combobox', {name: 'Sizes'}));
  await userEvent.click(screen.getByRole('option', {name: 'Ten'}));
  expect(form.getValues('sizes')).toEqual([30, 10]);
  await userEvent.click(screen.getByRole('option', {name: 'Thirty'}));
  expect(form.getValues('sizes')).toEqual([10]);
  await userEvent.keyboard('{Escape}');
  expect(screen.getByRole('combobox', {name: 'Sizes'})).toHaveTextContent(
    'Ten',
  );
});

test('required error shows in the helper text', async () => {
  const {form} = renderWithForm<{size: number | null}>(
    (control) => (
      <Select
        name='size'
        control={control}
        label='Size'
        options={numbers}
        rules={{required: 'Pick a size'}}
        helperText='Box size'
      />
    ),
    {defaultValues: {size: null}},
  );
  expect(screen.getByText('Box size')).toBeInTheDocument();
  await act(() => form.trigger('size'));
  expect(screen.getByText('Pick a size')).toBeInTheDocument();
  expect(screen.queryByText('Box size')).not.toBeInTheDocument();
});

test('re-renders when the options change', async () => {
  function Switcher({control}: {control: Control<{code: string | null}>}) {
    const [spanish, setSpanish] = useState(false);
    return (
      <>
        <button
          type='button'
          onClick={() => {
            setSpanish(true);
          }}
        >
          Spanish
        </button>
        <Select
          name='code'
          control={control}
          label='Code'
          options={spanish
            ? [{value: 'a', label: 'Uno'}, {value: 'b', label: 'Dos'}]
            : [{value: 'a', label: 'One'}, {value: 'b', label: 'Two'}]}
        />
      </>
    );
  }
  renderWithForm<{code: string | null}>(
    (control) => <Switcher control={control} />,
    {defaultValues: {code: 'a'}},
  );
  const combobox = screen.getByRole('combobox', {name: 'Code'});
  expect(combobox).toHaveTextContent('One');
  await userEvent.click(screen.getByRole('button', {name: 'Spanish'}));
  expect(combobox).toHaveTextContent('Uno');
  await userEvent.click(combobox);
  expect(screen.getByRole('option', {name: 'Dos'})).toBeInTheDocument();
});

test('setFocus focuses the select', async () => {
  const {form} = renderWithForm<{size: number | null}>(
    (control) => (
      <Select name='size' control={control} label='Size' options={numbers} />
    ),
    {defaultValues: {size: null}},
  );
  const combobox = screen.getByRole('combobox', {name: 'Size'});
  expect(combobox).not.toHaveFocus();
  form.setFocus('size');
  await waitFor(() => {
    expect(combobox).toHaveFocus();
  });
});
