import type {DateRange} from '@mui/x-date-pickers-pro/models';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {act, screen, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DateTime} from 'luxon';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {silenceMissingLicense} from '../../../test/silenceMissingLicense';
import {withLuxon} from '../../../test/withLuxon';
import {DateRangePicker} from './DateRangePicker';

silenceMissingLicense();

const september = DateTime.fromISO('2026-09-01');

async function pickRange(start: string, end: string) {
  await userEvent.click(screen.getByRole('button', {name: /^choose range/i}));
  const [startCell] = screen.getAllByRole('gridcell', {name: start});
  if (!startCell) throw new Error(`no day ${start}`);
  await userEvent.click(startCell);
  const [endCell] = screen.getAllByRole('gridcell', {name: end});
  if (!endCell) throw new Error(`no day ${end}`);
  await userEvent.click(endCell);
}

function isoDates(range: DateRange<PickerValidDate> | undefined) {
  return range?.map((date) => date?.toISODate() ?? null);
}

test('renders the MUI range picker with both date sections', () => {
  renderWithForm<{period: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <DateRangePicker name='period' control={control} label='Period' />,
      ),
    {defaultValues: {period: [null, null]}},
  );
  const group = screen.getByRole('group', {name: 'Period'});
  expect(within(group).getAllByRole('spinbutton')).toHaveLength(6);
  expect(screen.getByRole('button', {name: /^choose range/i})).toBeEnabled();
});

test('selecting a range stores both ends', async () => {
  const {form} = renderWithForm<{period: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <DateRangePicker
          name='period'
          control={control}
          label='Period'
          referenceDate={september}
        />,
      ),
    {defaultValues: {period: [null, null]}},
  );
  await pickRange('10', '20');
  expect(isoDates(form.getValues('period'))).toEqual([
    '2026-09-10',
    '2026-09-20',
  ]);
});

test('an undefined value starts as an empty range', async () => {
  const {form} = renderWithForm<{period?: DateRange<PickerValidDate>}>((
    control,
  ) =>
    withLuxon(
      <DateRangePicker
        name='period'
        control={control}
        label='Period'
        referenceDate={september}
      />,
    )
  );
  await pickRange('3', '4');
  expect(isoDates(form.getValues('period'))).toEqual([
    '2026-09-03',
    '2026-09-04',
  ]);
});

test('transform stores the app shape', async () => {
  const {form} = renderWithForm<
    {period: {from: string | null; to: string | null}}
  >(
    (control) =>
      withLuxon(
        <DateRangePicker
          name='period'
          control={control}
          label='Period'
          transform={{
            input: ({from, to}) => [
              from === null ? null : DateTime.fromISO(from),
              to === null ? null : DateTime.fromISO(to),
            ],
            output: ([start, end]) => ({
              from: start?.toISODate() ?? null,
              to: end?.toISODate() ?? null,
            }),
          }}
        />,
      ),
    {defaultValues: {period: {from: '2026-09-01', to: '2026-09-05'}}},
  );
  expect(screen.getByRole('group', {name: 'Period'})).toHaveTextContent(
    '09/01/2026 – 09/05/2026',
  );
  await pickRange('10', '20');
  expect(form.getValues('period')).toEqual({
    from: '2026-09-10',
    to: '2026-09-20',
  });
});

test('a validate rule can require both ends', async () => {
  renderWithForm<{period: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <DateRangePicker
          name='period'
          control={control}
          label='Period'
          referenceDate={september}
          rules={{
            validate: ([start, end]) =>
              (start !== null && end !== null) || 'Pick both dates',
          }}
        />,
      ),
    {defaultValues: {period: [null, null]}},
  );
  await userEvent.click(screen.getByRole('button', {name: /^choose range/i}));
  const [startCell] = screen.getAllByRole('gridcell', {name: '10'});
  if (!startCell) throw new Error('no day 10');
  await userEvent.click(startCell);
  expect(await screen.findByText('Pick both dates')).toBeInTheDocument();
});

test('an end before the start shows the invalidRange message', async () => {
  renderWithForm<{period: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <DateRangePicker name='period' control={control} label='Period' />,
      ),
    {defaultValues: {period: [null, null]}},
  );
  const [startMonth] = within(screen.getByRole('group', {name: 'Period'}))
    .getAllByRole('spinbutton');
  if (!startMonth) throw new Error('no start month');
  await userEvent.click(startMonth);
  await userEvent.keyboard('0920202609102026');
  expect(await screen.findByText('The end is before the start'))
    .toBeInTheDocument();
});

test('setFocus focuses the field and disabled reaches RHF', async () => {
  const {form} = renderWithForm<{period: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <DateRangePicker
          name='period'
          control={control}
          label='Period'
          rules={{
            validate: ([start]) => start !== null || 'Pick a start',
          }}
        />,
      ),
    {defaultValues: {period: [null, null]}},
  );
  const group = screen.getByRole('group', {name: 'Period'});
  form.setFocus('period');
  await waitFor(() => {
    expect(group).toContainElement(document.activeElement as HTMLElement);
  });
  await act(() => form.trigger('period'));
  expect(screen.getByText('Pick a start')).toBeInTheDocument();
});

test('disabled is forwarded to the picker and to RHF', async () => {
  const {form} = renderWithForm<{period: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <DateRangePicker
          name='period'
          control={control}
          label='Period'
          rules={{
            validate: ([start]) => start !== null || 'Pick a start',
          }}
          disabled
        />,
      ),
    {defaultValues: {period: [null, null]}},
  );
  expect(screen.getByRole('button', {name: /^choose range/i})).toBeDisabled();
  let valid = false;
  await act(async () => {
    valid = await form.trigger('period');
  });
  expect(valid).toBe(true);
});
