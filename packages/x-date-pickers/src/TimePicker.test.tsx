import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DateTime} from 'luxon';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {withLuxon} from '../../../test/withLuxon';
import {TimeField} from './TimeField';
import {TimePicker} from './TimePicker';

test('TimePicker stores the typed time', async () => {
  const {form} = renderWithForm<{startsAt: DateTime | null}>(
    (control) =>
      withLuxon(
        <TimePicker name='startsAt' control={control} label='Starts at' />,
      ),
    {defaultValues: {startsAt: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Hours'}));
  await userEvent.keyboard('0930P');
  expect(form.getValues('startsAt')?.toFormat('HH:mm')).toBe('21:30');
});

test('TimePicker shows the minTime message', async () => {
  renderWithForm<{startsAt: DateTime | null}>(
    (control) =>
      withLuxon(
        <TimePicker
          name='startsAt'
          control={control}
          label='Starts at'
          minTime={DateTime.fromISO('2026-09-28T08:00')}
        />,
      ),
    {defaultValues: {startsAt: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Hours'}));
  await userEvent.keyboard('0730A');
  expect(await screen.findByText('Time is too early')).toBeInTheDocument();
});

test('TimeField stores the typed time', async () => {
  const {form} = renderWithForm<{startsAt: DateTime | null}>(
    (control) =>
      withLuxon(
        <TimeField name='startsAt' control={control} label='Starts at' />,
      ),
    {defaultValues: {startsAt: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Hours'}));
  await userEvent.keyboard('0745A');
  expect(form.getValues('startsAt')?.toFormat('HH:mm')).toBe('07:45');
});
