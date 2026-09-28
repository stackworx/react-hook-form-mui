import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DateTime} from 'luxon';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {withLuxon} from '../../../test/withLuxon';
import {DateField} from './DateField';

test('keyboard entry of a full date stores it', async () => {
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(<DateField name='start' control={control} label='Start' />),
    {defaultValues: {start: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Month'}));
  await userEvent.keyboard('09282026');
  expect(form.getValues('start')?.toISODate()).toBe('2026-09-28');
});

test('a maxDate violation shows the default message', async () => {
  renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DateField
          name='start'
          control={control}
          label='Start'
          maxDate={DateTime.fromISO('2026-09-15')}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Month'}));
  await userEvent.keyboard('09282026');
  expect(await screen.findByText('Date is too late')).toBeInTheDocument();
});
