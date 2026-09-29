import {act, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useState} from 'react';
import type {Control} from 'react-hook-form';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {Autocomplete} from './Autocomplete';

interface Location {
  id: string;
  name: string;
}

const locations: Location[] = [
  {id: 'L1', name: 'Head Office'},
  {id: 'L2', name: 'Warehouse'},
  {id: 'L3', name: 'Depot'},
];

const getOptionKey = (location: Location) => location.id;
const storeId = (location: Location) => location.id;
const getOptionLabel = (location: Location) => location.name;

test('selecting stores the id', async () => {
  const {form} = renderWithForm<{locationId: string | null}>(
    (control) => (
      <Autocomplete
        name='locationId'
        control={control}
        label='Location'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {locationId: null}},
  );
  const input = screen.getByRole('combobox', {name: 'Location'});
  await userEvent.type(input, 'Ware');
  await userEvent.click(screen.getByRole('option', {name: 'Warehouse'}));
  expect(form.getValues('locationId')).toBe('L2');
  expect(input).toHaveValue('Warehouse');
  await userEvent.click(screen.getByRole('button', {name: 'Clear'}));
  expect(form.getValues('locationId')).toBeNull();
});

test('initial ids render their labels', () => {
  renderWithForm<{locationId: string | null}>(
    (control) => (
      <Autocomplete
        name='locationId'
        control={control}
        label='Location'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {locationId: 'L3'}},
  );
  expect(screen.getByRole('combobox', {name: 'Location'})).toHaveValue('Depot');
});

test('multiple stores ids, shows chips and removing a chip removes the id', async () => {
  const {form} = renderWithForm<{locationIds: string[]}>(
    (control) => (
      <Autocomplete
        name='locationIds'
        control={control}
        label='Locations'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
        multiple
      />
    ),
    {defaultValues: {locationIds: ['L3']}},
  );
  expect(screen.getByRole('button', {name: 'Depot'})).toBeInTheDocument();
  await userEvent.click(screen.getByRole('combobox', {name: 'Locations'}));
  await userEvent.click(screen.getByRole('option', {name: 'Head Office'}));
  expect(form.getValues('locationIds')).toEqual(['L3', 'L1']);
  expect(screen.getByRole('button', {name: 'Head Office'})).toBeInTheDocument();
  await userEvent.click(
    within(screen.getByRole('button', {name: 'Depot'})).getByTestId(
      'CancelIcon',
    ),
  );
  expect(form.getValues('locationIds')).toEqual(['L1']);
  expect(screen.queryByRole('button', {name: 'Depot'})).not.toBeInTheDocument();
});

test('required error shows in the helper text', async () => {
  const {form} = renderWithForm<{locationId: string | null}>(
    (control) => (
      <Autocomplete
        name='locationId'
        control={control}
        label='Location'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
        helperText='Where the shift happens'
        rules={{required: 'Pick a location'}}
      />
    ),
    {defaultValues: {locationId: null}},
  );
  expect(screen.getByText('Where the shift happens')).toBeInTheDocument();
  await act(() => form.trigger('locationId'));
  expect(screen.getByText('Pick a location')).toBeInTheDocument();
  expect(screen.getByRole('combobox', {name: 'Location'})).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

test('setFocus focuses the input', async () => {
  const {form} = renderWithForm<{locationId: string | null}>(
    (control) => (
      <Autocomplete
        name='locationId'
        control={control}
        label='Location'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {locationId: null}},
  );
  const input = screen.getByRole('combobox', {name: 'Location'});
  expect(input).not.toHaveFocus();
  form.setFocus('locationId');
  await waitFor(() => {
    expect(input).toHaveFocus();
  });
});

test('typed text survives a re-render with fresh option objects', async () => {
  function Refreshing({control}: {control: Control<{locationIds: string[]}>}) {
    const [version, setVersion] = useState(0);
    return (
      <>
        <button
          type='button'
          onClick={() => {
            setVersion(version + 1);
          }}
        >
          Refresh
        </button>
        <Autocomplete
          name='locationIds'
          control={control}
          label='Locations'
          options={locations.map((location) => ({...location}))}
          getOptionKey={getOptionKey}
          getOptionValue={storeId}
          getOptionLabel={getOptionLabel}
          multiple
        />
      </>
    );
  }
  renderWithForm<{locationIds: string[]}>(
    (control) => <Refreshing control={control} />,
    {defaultValues: {locationIds: ['L1']}},
  );
  const input = screen.getByRole('combobox', {name: 'Locations'});
  await userEvent.type(input, 'Dep');
  act(() => {
    screen.getByRole('button', {name: 'Refresh'}).click();
  });
  expect(input).toHaveValue('Dep');
  expect(screen.getByRole('button', {name: 'Head Office'})).toBeInTheDocument();
});

test('without getOptionValue it stores the option', async () => {
  const {form} = renderWithForm<{location: Location | null}>(
    (control) => (
      <Autocomplete
        name='location'
        control={control}
        label='Location'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {location: null}},
  );
  await userEvent.click(screen.getByRole('combobox', {name: 'Location'}));
  await userEvent.click(screen.getByRole('option', {name: 'Warehouse'}));
  expect(form.getValues('location')).toEqual({id: 'L2', name: 'Warehouse'});
  await userEvent.click(screen.getByRole('button', {name: 'Clear'}));
  expect(form.getValues('location')).toBeNull();
});

test('a stored option is matched by key, not by reference', async () => {
  renderWithForm<{location: Location | null}>(
    (control) => (
      <Autocomplete
        name='location'
        control={control}
        label='Location'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {location: {id: 'L3', name: 'Depot'}}},
  );
  const input = screen.getByRole('combobox', {name: 'Location'});
  expect(input).toHaveValue('Depot');
  await userEvent.click(input);
  expect(screen.getByRole('option', {name: 'Depot'})).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('multiple without getOptionValue stores the options', async () => {
  const {form} = renderWithForm<{locations: Location[]}>(
    (control) => (
      <Autocomplete
        name='locations'
        control={control}
        label='Locations'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionLabel={getOptionLabel}
        multiple
      />
    ),
    {defaultValues: {locations: [{id: 'L3', name: 'Depot'}]}},
  );
  await userEvent.click(screen.getByRole('combobox', {name: 'Locations'}));
  await userEvent.click(screen.getByRole('option', {name: 'Head Office'}));
  expect(form.getValues('locations')).toEqual([
    {id: 'L3', name: 'Depot'},
    {id: 'L1', name: 'Head Office'},
  ]);
});

test('a stored option that the options no longer include still shows', () => {
  renderWithForm<{location: Location | null}>(
    (control) => (
      <Autocomplete
        name='location'
        control={control}
        label='Location'
        options={locations}
        getOptionKey={getOptionKey}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {location: {id: 'L9', name: 'Old depot'}}},
  );
  expect(screen.getByRole('combobox', {name: 'Location'})).toHaveValue(
    'Old depot',
  );
});

interface Film {
  id: number;
  label: string;
}

const films: Film[] = [
  {id: 1, label: 'Casablanca'},
  {id: 2, label: 'Metropolis'},
];

test('string options are their own key and label', async () => {
  const {form} = renderWithForm<{size: string | null}>(
    (control) => (
      <Autocomplete
        name='size'
        control={control}
        label='Size'
        options={['Small', 'Medium', 'Large']}
      />
    ),
    {defaultValues: {size: 'Large'}},
  );
  const input = screen.getByRole('combobox', {name: 'Size'});
  expect(input).toHaveValue('Large');
  await userEvent.click(input);
  expect(screen.getByRole('option', {name: 'Large'})).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await userEvent.click(screen.getByRole('option', {name: 'Medium'}));
  expect(form.getValues('size')).toBe('Medium');
});

test('multiple number options store the numbers', async () => {
  const {form} = renderWithForm<{floors: number[]}>(
    (control) => (
      <Autocomplete
        name='floors'
        control={control}
        label='Floors'
        options={[1, 2, 3]}
        multiple
      />
    ),
    {defaultValues: {floors: [2]}},
  );
  expect(screen.getByRole('button', {name: '2'})).toBeInTheDocument();
  await userEvent.click(screen.getByRole('combobox', {name: 'Floors'}));
  await userEvent.click(screen.getByRole('option', {name: '3'}));
  expect(form.getValues('floors')).toEqual([2, 3]);
});

test('an empty string is no selection', async () => {
  renderWithForm<{size: string | null}>(
    (control) => (
      <Autocomplete
        name='size'
        control={control}
        label='Size'
        options={['Small', 'Medium']}
      />
    ),
    {defaultValues: {size: ''}},
  );
  const input = screen.getByRole('combobox', {name: 'Size'});
  expect(input).toHaveValue('');
  await userEvent.click(input);
  expect(screen.getAllByRole('option')).toHaveLength(2);
});

test("an object's label defaults to its label, and keys can be numbers", async () => {
  renderWithForm<{film: Film | null}>(
    (control) => (
      <Autocomplete
        name='film'
        control={control}
        label='Film'
        options={films}
        getOptionKey={(film) => film.id}
      />
    ),
    {defaultValues: {film: {id: 2, label: 'Metropolis'}}},
  );
  const input = screen.getByRole('combobox', {name: 'Film'});
  expect(input).toHaveValue('Metropolis');
  await userEvent.click(input);
  expect(screen.getByRole('option', {name: 'Metropolis'})).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('the option type decides whether getOptionKey and getOptionLabel are needed', () => {
  const control = undefined as unknown as Control<{
    size: string | null;
    film: Film | null;
    location: Location | null;
  }>;
  const elements = [
    <Autocomplete
      key='strings'
      name='size'
      control={control}
      label='Size'
      options={['Small']}
    />,
    <Autocomplete
      key='labelled objects'
      name='film'
      control={control}
      label='Film'
      options={films}
      getOptionKey={(film) => film.id}
    />,
    // @ts-expect-error objects need getOptionKey
    <Autocomplete
      key='no key'
      name='film'
      control={control}
      label='Film'
      options={films}
    />,
    // @ts-expect-error objects without a label need getOptionLabel
    <Autocomplete
      key='no label'
      name='location'
      control={control}
      label='Location'
      options={locations}
      getOptionKey={getOptionKey}
    />,
  ];
  expect(elements).toHaveLength(4);
});
