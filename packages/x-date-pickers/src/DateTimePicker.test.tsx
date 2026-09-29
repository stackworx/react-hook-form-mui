import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DateTime} from 'luxon';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {withLuxon} from '../../../test/withLuxon';
import {DateTimeField} from './DateTimeField';
import {DateTimePicker} from './DateTimePicker';

test('DateTimePicker stores the typed date and time', async () => {
  const {form} = renderWithForm<{startsAt: DateTime | null}>(
    (control) =>
      withLuxon(
        <DateTimePicker name='startsAt' control={control} label='Starts at' />,
      ),
    {defaultValues: {startsAt: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Month'}));
  await userEvent.keyboard('092820260930A');
  expect(form.getValues('startsAt')?.toFormat('yyyy-MM-dd HH:mm')).toBe(
    '2026-09-28 09:30',
  );
});

test('DateTimePicker maps minDateTime to the date and time messages', async () => {
  renderWithForm<{startsAt: DateTime | null}>(
    (control) =>
      withLuxon(
        <DateTimePicker
          name='startsAt'
          control={control}
          label='Starts at'
          minDateTime={DateTime.fromISO('2026-09-28T08:00')}
        />,
      ),
    {defaultValues: {startsAt: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Month'}));
  await userEvent.keyboard('092820260730A');
  expect(await screen.findByText('Time is too early')).toBeInTheDocument();
});

test('DateTimeField stores the typed date and time', async () => {
  const {form} = renderWithForm<{startsAt: DateTime | null}>(
    (control) =>
      withLuxon(
        <DateTimeField name='startsAt' control={control} label='Starts at' />,
      ),
    {defaultValues: {startsAt: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Month'}));
  await userEvent.keyboard('092820261015P');
  expect(form.getValues('startsAt')?.toFormat('yyyy-MM-dd HH:mm')).toBe(
    '2026-09-28 22:15',
  );
});
