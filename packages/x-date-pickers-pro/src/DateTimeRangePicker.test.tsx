import type {DateRange} from '@mui/x-date-pickers-pro/models';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {silenceMissingLicense} from '../../../test/silenceMissingLicense';
import {withLuxon} from '../../../test/withLuxon';
import {DateTimeRangePicker} from './DateTimeRangePicker';

silenceMissingLicense();

test('typing both ends stores the date-time range', async () => {
  const {form} = renderWithForm<{shift: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <DateTimeRangePicker name='shift' control={control} label='Shift' />,
      ),
    {defaultValues: {shift: [null, null]}},
  );
  const [startMonth] = within(screen.getByRole('group', {name: 'Shift'}))
    .getAllByRole('spinbutton');
  if (!startMonth) throw new Error('no start month');
  await userEvent.click(startMonth);
  await userEvent.keyboard('092820260800A092820260430P');
  expect(
    form.getValues('shift').map((date) => date?.toFormat('yyyy-MM-dd HH:mm')),
  ).toEqual(['2026-09-28 08:00', '2026-09-28 16:30']);
});
