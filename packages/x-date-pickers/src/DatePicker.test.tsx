import {act, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DateTime} from 'luxon';
import {expect, test, vi} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {withLuxon} from '../../../test/withLuxon';
import {DatePicker} from './DatePicker';

const september = DateTime.fromISO('2026-09-01');

async function pickDay(day: string) {
  await userEvent.click(screen.getByRole('button', {name: /choose date/i}));
  await userEvent.click(screen.getByRole('gridcell', {name: day}));
}

async function typeDate(label: string, digits: string) {
  const group = screen.getByRole('group', {name: label});
  const [month] = Array.from(group.querySelectorAll('[role="spinbutton"]'));
  if (!(month instanceof HTMLElement)) throw new Error('no month section');
  await userEvent.click(month);
  await userEvent.keyboard(digits);
}

test('picking a date stores the adapter value', async () => {
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          referenceDate={september}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await pickDay('28');
  const value = form.getValues('start');
  expect(DateTime.isDateTime(value)).toBe(true);
  expect(value?.toISODate()).toBe('2026-09-28');
});

test('transform maps an ISO string to the picker and back', async () => {
  const {form} = renderWithForm<{start: string | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          transform={{
            input: (value) =>
              typeof value === 'string' ? DateTime.fromISO(value) : null,
            output: (date) => date?.toISODate() ?? null,
          }}
        />,
      ),
    {defaultValues: {start: '2026-09-10'}},
  );
  expect(screen.getByRole('group', {name: 'Start'})).toHaveTextContent(
    '09/10/2026',
  );
  await pickDay('28');
  expect(form.getValues('start')).toBe('2026-09-28');
});

test('a minDate violation shows the default message on the change that causes it', async () => {
  renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          minDate={DateTime.fromISO('2026-09-15')}
          helperText='First day on site'
        />,
      ),
    {defaultValues: {start: null}},
  );
  expect(screen.getByText('First day on site')).toBeInTheDocument();
  await typeDate('Start', '09102026');
  expect(await screen.findByText('Date is too early')).toBeInTheDocument();
  await typeDate('Start', '09202026');
  await waitFor(() => {
    expect(screen.queryByText('Date is too early')).not.toBeInTheDocument();
  });
  expect(screen.getByText('First day on site')).toBeInTheDocument();
});

test('messages override the default text', async () => {
  renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          disablePast
          messages={{disablePast: 'Pick today or later'}}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await typeDate('Start', '01012020');
  expect(await screen.findByText('Pick today or later')).toBeInTheDocument();
});

test('a function-form validate rule still runs', async () => {
  renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          referenceDate={september}
          rules={{
            validate: (value) => value?.weekday !== 7 || 'No Sundays',
          }}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await pickDay('27');
  expect(await screen.findByText('No Sundays')).toBeInTheDocument();
});

test('required shows the default message', async () => {
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          rules={{required: true}}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await act(() => form.trigger('start'));
  expect(screen.getByText('Required')).toBeInTheDocument();
});

test('setFocus focuses the field', async () => {
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(<DatePicker name='start' control={control} label='Start' />),
    {defaultValues: {start: null}},
  );
  const group = screen.getByRole('group', {name: 'Start'});
  expect(group).not.toContainElement(document.activeElement as HTMLElement);
  form.setFocus('start');
  await waitFor(() => {
    expect(group).toContainElement(document.activeElement as HTMLElement);
  });
});

test('disabled is forwarded to the picker and to RHF', async () => {
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          rules={{required: true}}
          disabled
        />,
      ),
    {defaultValues: {start: null}},
  );
  expect(screen.getByRole('button', {name: /choose date/i})).toBeDisabled();
  let valid = false;
  await act(async () => {
    valid = await form.trigger('start');
  });
  expect(valid).toBe(true);
});

test('a function-form slotProps.textField keeps working under the error text', async () => {
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          rules={{required: 'Pick a start date'}}
          slotProps={{
            textField: () => ({
              helperText: 'From the slot',
              placeholder: 'Start date',
            }),
          }}
        />,
      ),
    {defaultValues: {start: null}},
  );
  expect(screen.getByText('From the slot')).toBeInTheDocument();
  await act(() => form.trigger('start'));
  expect(screen.getByText('Pick a start date')).toBeInTheDocument();
  expect(screen.queryByText('From the slot')).not.toBeInTheDocument();
});

test('handleChange runs after the form stores the date', async () => {
  const stored: unknown[] = [];
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          referenceDate={september}
          handleChange={() => {
            stored.push(form.getValues('start')?.toISODate());
          }}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await pickDay('28');
  expect(stored).toEqual(['2026-09-28']);
});

test('with suppressFormChange, a date handleChange does not store is ignored', async () => {
  const handleChange = vi.fn();
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DatePicker
          name='start'
          control={control}
          label='Start'
          referenceDate={september}
          suppressFormChange
          handleChange={handleChange}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await pickDay('28');
  expect(handleChange).toHaveBeenCalled();
  expect(form.getValues('start')).toBeNull();
  expect(screen.getByRole('group', {name: 'Start'})).toHaveTextContent(
    'MM/DD/YYYY',
  );
});
