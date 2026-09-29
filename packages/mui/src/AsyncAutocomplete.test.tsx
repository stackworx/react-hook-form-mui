import {act, fireEvent, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useState} from 'react';
import type {Control} from 'react-hook-form';
import {expect, test, vi} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {AsyncAutocomplete} from './AsyncAutocomplete';
import type {OptionsSource} from './asyncAutocomplete/OptionsSource';

interface Location {
  id: string;
  name: string;
}

const page1: Location[] = [
  {id: 'L1', name: 'Head Office'},
  {id: 'L2', name: 'Warehouse'},
];
const page2: Location[] = [
  {id: 'L3', name: 'Depot North'},
  {id: 'L4', name: 'Depot South'},
];

const getOptionKey = (location: Location) => location.id;
const storeId = (location: Location) => location.id;
const getOptionLabel = (location: Location) => location.name;

function fakeSource(
  overrides: Partial<OptionsSource<Location>> = {},
): OptionsSource<Location> {
  return {
    options: page1,
    loading: false,
    onSearch: vi.fn(),
    hasMore: false,
    onLoadMore: vi.fn(),
    ...overrides,
  };
}

test('stores ids, keeps labels for known ids and searches on typing', async () => {
  const onSearch = vi.fn();
  const {form} = renderWithForm<{locationIds: string[]}>(
    (control) => (
      <AsyncAutocomplete
        name='locationIds'
        control={control}
        label='Locations'
        multiple
        source={fakeSource({onSearch, hasMore: true, totalCount: 40})}
        knownOptions={[{id: 'L9', name: 'Depot'}]}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
        debounceMs={0}
      />
    ),
    {defaultValues: {locationIds: ['L9']}},
  );
  expect(screen.getByRole('button', {name: 'Depot'})).toBeInTheDocument();
  await userEvent.type(
    screen.getByRole('combobox', {name: 'Locations'}),
    'Ware',
  );
  expect(onSearch).toHaveBeenLastCalledWith('Ware');
  await userEvent.click(await screen.findByRole('option', {name: 'Warehouse'}));
  expect(form.getValues('locationIds')).toEqual(['L9', 'L2']);
});

test('selecting an option does not search', async () => {
  const onSearch = vi.fn();
  renderWithForm<{locationIds: string[]}>(
    (control) => (
      <AsyncAutocomplete
        name='locationIds'
        control={control}
        label='Locations'
        multiple
        source={fakeSource({onSearch})}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
        debounceMs={0}
      />
    ),
    {defaultValues: {locationIds: []}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  await userEvent.click(screen.getByRole('option', {name: 'Head Office'}));
  expect(onSearch).not.toHaveBeenCalled();
});

test('typing is debounced into one search', () => {
  vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout']});
  const onSearch = vi.fn();
  renderWithForm<{locationId: string | null}>(
    (control) => (
      <AsyncAutocomplete
        name='locationId'
        control={control}
        label='Location'
        source={fakeSource({onSearch})}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {locationId: null}},
  );
  const input = screen.getByRole('combobox', {name: 'Location'});
  for (const text of ['D', 'De', 'Dep']) {
    fireEvent.change(input, {target: {value: text}});
    act(() => {
      vi.advanceTimersByTime(100);
    });
  }
  expect(onSearch).not.toHaveBeenCalled();
  act(() => {
    vi.advanceTimersByTime(149);
  });
  expect(onSearch).not.toHaveBeenCalled();
  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(onSearch).toHaveBeenCalledTimes(1);
  expect(onSearch).toHaveBeenCalledWith('Dep');
});

test('the footer loads more and summarises the count until a search is typed', async () => {
  const onLoadMore = vi.fn();
  renderWithForm<{locationIds: string[]}>(
    (control) => (
      <AsyncAutocomplete
        name='locationIds'
        control={control}
        label='Locations'
        multiple
        source={fakeSource({hasMore: true, onLoadMore, totalCount: 40})}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
        debounceMs={0}
      />
    ),
    {defaultValues: {locationIds: []}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  expect(screen.getByText('Showing 2 of 40 — type to narrow'))
    .toBeInTheDocument();
  const listbox = screen.getByRole('listbox');
  expect(within(listbox).getAllByRole('option')).toHaveLength(2);
  expect(within(listbox).queryByRole('button', {name: 'Load more'})).toBeNull();
  await userEvent.click(screen.getByRole('button', {name: 'Load more'}));
  expect(onLoadMore).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('listbox')).toBeInTheDocument();
  await userEvent.type(screen.getByRole('combobox', {name: 'Locations'}), 'Wa');
  expect(screen.queryByText(/type to narrow/)).not.toBeInTheDocument();
});

test('scrolling to the end of the list loads more', async () => {
  const onLoadMore = vi.fn();
  renderWithForm<{locationIds: string[]}>(
    (control) => (
      <AsyncAutocomplete
        name='locationIds'
        control={control}
        label='Locations'
        multiple
        source={fakeSource({hasMore: true, onLoadMore})}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {locationIds: []}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  fireEvent.scroll(screen.getByRole('listbox'));
  expect(onLoadMore).toHaveBeenCalledTimes(1);
});

test('a picked chip keeps its label after the options change', async () => {
  function Paged({control}: {control: Control<{locationIds: string[]}>}) {
    const [options, setOptions] = useState(page1);
    return (
      <>
        <button
          type='button'
          onClick={() => {
            setOptions(page2);
          }}
        >
          Next page
        </button>
        <AsyncAutocomplete
          name='locationIds'
          control={control}
          label='Locations'
          multiple
          source={fakeSource({options})}
          getOptionKey={getOptionKey}
          getOptionValue={storeId}
          getOptionLabel={getOptionLabel}
        />
      </>
    );
  }
  const {form} = renderWithForm<{locationIds: string[]}>(
    (control) => <Paged control={control} />,
    {defaultValues: {locationIds: []}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  await userEvent.click(screen.getByRole('option', {name: 'Warehouse'}));
  await userEvent.click(screen.getByRole('button', {name: 'Next page'}));
  expect(screen.getByRole('button', {name: 'Warehouse'})).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  await userEvent.click(screen.getByRole('option', {name: 'Depot North'}));
  expect(form.getValues('locationIds')).toEqual(['L2', 'L3']);
  expect(screen.getByRole('button', {name: 'Warehouse'})).toBeInTheDocument();
});

test('an initial id found on the first page keeps its label on later pages', async () => {
  function Paged({control}: {control: Control<{locationIds: string[]}>}) {
    const [options, setOptions] = useState(page1);
    return (
      <>
        <button
          type='button'
          onClick={() => {
            setOptions(page2);
          }}
        >
          Next page
        </button>
        <AsyncAutocomplete
          name='locationIds'
          control={control}
          label='Locations'
          multiple
          source={fakeSource({options})}
          getOptionKey={getOptionKey}
          getOptionValue={storeId}
          getOptionLabel={getOptionLabel}
        />
      </>
    );
  }
  const {form} = renderWithForm<{locationIds: string[]}>(
    (control) => <Paged control={control} />,
    {defaultValues: {locationIds: ['L1']}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Next page'}));
  expect(screen.getByRole('button', {name: 'Head Office'})).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  await userEvent.click(screen.getByRole('option', {name: 'Depot South'}));
  expect(form.getValues('locationIds')).toEqual(['L1', 'L4']);
});

test('single mode stores string | null', async () => {
  const {form} = renderWithForm<{locationId: string | null}>(
    (control) => (
      <AsyncAutocomplete
        name='locationId'
        control={control}
        label='Location'
        source={fakeSource()}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {locationId: null}},
  );
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  await userEvent.click(screen.getByRole('option', {name: 'Warehouse'}));
  expect(form.getValues('locationId')).toBe('L2');
  expect(screen.getByRole('combobox', {name: 'Location'})).toHaveValue(
    'Warehouse',
  );
  await userEvent.click(screen.getByRole('button', {name: 'Clear'}));
  expect(form.getValues('locationId')).toBeNull();
});

test('reopening after a pick resets a stale search', async () => {
  const onSearch = vi.fn();
  renderWithForm<{locationIds: string[]}>(
    (control) => (
      <AsyncAutocomplete
        name='locationIds'
        control={control}
        label='Locations'
        multiple
        source={fakeSource({onSearch})}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
        debounceMs={0}
      />
    ),
    {defaultValues: {locationIds: []}},
  );
  await userEvent.type(
    screen.getByRole('combobox', {name: 'Locations'}),
    'Ware',
  );
  await userEvent.click(screen.getByRole('option', {name: 'Warehouse'}));
  expect(onSearch).toHaveBeenLastCalledWith('Ware');
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  expect(onSearch).toHaveBeenLastCalledWith('');
});

test('loading renders a progressbar', () => {
  renderWithForm<{locationId: string | null}>(
    (control) => (
      <AsyncAutocomplete
        name='locationId'
        control={control}
        label='Location'
        source={fakeSource({loading: true})}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
      />
    ),
    {defaultValues: {locationId: null}},
  );
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('required error shows and setFocus focuses the input', async () => {
  const {form} = renderWithForm<{locationId: string | null}>(
    (control) => (
      <AsyncAutocomplete
        name='locationId'
        control={control}
        label='Location'
        source={fakeSource()}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
        rules={{required: 'Pick a location'}}
      />
    ),
    {defaultValues: {locationId: null}},
  );
  await act(() => form.trigger('locationId'));
  expect(screen.getByText('Pick a location')).toBeInTheDocument();
  const input = screen.getByRole('combobox', {name: 'Location'});
  expect(input).not.toHaveFocus();
  form.setFocus('locationId');
  await waitFor(() => {
    expect(input).toHaveFocus();
  });
});

test('without getOptionValue it stores the options, which keep their labels without knownOptions', async () => {
  const {form} = renderWithForm<{locations: Location[]}>(
    (control) => (
      <AsyncAutocomplete
        name='locations'
        control={control}
        label='Locations'
        multiple
        source={fakeSource()}
        getOptionKey={getOptionKey}
        getOptionLabel={getOptionLabel}
        debounceMs={0}
      />
    ),
    {defaultValues: {locations: [{id: 'L9', name: 'Depot'}]}},
  );
  expect(screen.getByRole('button', {name: 'Depot'})).toBeInTheDocument();
  await userEvent.click(screen.getByRole('combobox', {name: 'Locations'}));
  await userEvent.click(await screen.findByRole('option', {name: 'Warehouse'}));
  expect(form.getValues('locations')).toEqual([
    {id: 'L9', name: 'Depot'},
    {id: 'L2', name: 'Warehouse'},
  ]);
});

test('string options need no getOptionKey or getOptionLabel', async () => {
  const source: OptionsSource<string> = {
    options: ['Small', 'Medium'],
    loading: false,
    onSearch: vi.fn(),
    hasMore: false,
    onLoadMore: vi.fn(),
  };
  const {form} = renderWithForm<{size: string | null}>(
    (control) => (
      <AsyncAutocomplete
        name='size'
        control={control}
        label='Size'
        source={source}
      />
    ),
    {defaultValues: {size: 'Large'}},
  );
  const input = screen.getByRole('combobox', {name: 'Size'});
  expect(input).toHaveValue('Large');
  await userEvent.click(input);
  await userEvent.click(screen.getByRole('option', {name: 'Medium'}));
  expect(form.getValues('size')).toBe('Medium');
});

test('with suppressFormChange, a pick handleChange does not store is ignored and the input shows the stored option', async () => {
  const handleChange = vi.fn();
  const {form} = renderWithForm<{locationId: string | null}>(
    (control) => (
      <AsyncAutocomplete
        name='locationId'
        control={control}
        label='Location'
        source={fakeSource()}
        getOptionKey={getOptionKey}
        getOptionValue={storeId}
        getOptionLabel={getOptionLabel}
        suppressFormChange
        handleChange={handleChange}
      />
    ),
    {defaultValues: {locationId: 'L1'}},
  );
  const input = screen.getByRole('combobox', {name: 'Location'});
  expect(input).toHaveValue('Head Office');
  await userEvent.click(screen.getByRole('button', {name: 'Open'}));
  await userEvent.click(screen.getByRole('option', {name: 'Warehouse'}));
  expect(handleChange).toHaveBeenCalled();
  expect(form.getValues('locationId')).toBe('L1');
  expect(input).toHaveValue('Head Office');
});
