import type {DateRange} from '@mui/x-date-pickers-pro/models';
import type {PickerValidDate} from '@mui/x-date-pickers/models';
import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {silenceMissingLicense} from '../../../test/silenceMissingLicense';
import {withLuxon} from '../../../test/withLuxon';
import {SingleInputDateRangeField} from './SingleInputDateRangeField';

silenceMissingLicense();

test('keyboard entry of both dates stores the range', async () => {
  const {form} = renderWithForm<{period: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <SingleInputDateRangeField
          name='period'
          control={control}
          label='Period'
        />,
      ),
    {defaultValues: {period: [null, null]}},
  );
  const [startMonth] = within(screen.getByRole('group', {name: 'Period'}))
    .getAllByRole('spinbutton');
  if (!startMonth) throw new Error('no start month');
  await userEvent.click(startMonth);
  await userEvent.keyboard('0901202609302026');
  expect(
    form.getValues('period').map((date) => date?.toISODate()),
  ).toEqual(['2026-09-01', '2026-09-30']);
});

test('handleBlur runs after the form marks the field touched', async () => {
  const touched: boolean[] = [];
  const {form} = renderWithForm<{period: DateRange<PickerValidDate>}>(
    (control) =>
      withLuxon(
        <SingleInputDateRangeField
          name='period'
          control={control}
          label='Period'
          handleBlur={() => {
            touched.push(form.getFieldState('period').isTouched);
          }}
        />,
      ),
    {defaultValues: {period: [null, null]}},
  );
  const [startMonth] = within(screen.getByRole('group', {name: 'Period'}))
    .getAllByRole('spinbutton');
  if (!startMonth) throw new Error('no start month');
  await userEvent.click(startMonth);
  await userEvent.click(document.body);
  expect(touched.length).toBeGreaterThan(0);
  expect(touched.every(Boolean)).toBe(true);
});
