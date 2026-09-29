import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DateTime} from 'luxon';
import {expect, test, vi} from 'vitest';
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

test('handleBlur runs after the form marks the field touched', async () => {
  const touched: boolean[] = [];
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DateField
          name='start'
          control={control}
          label='Start'
          handleBlur={() => {
            touched.push(form.getFieldState('start').isTouched);
          }}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Month'}));
  await userEvent.click(document.body);
  expect(touched.length).toBeGreaterThan(0);
  expect(touched.every(Boolean)).toBe(true);
});

test('with suppressFormChange, typing handleChange does not store is ignored', async () => {
  const handleChange = vi.fn();
  const {form} = renderWithForm<{start: DateTime | null}>(
    (control) =>
      withLuxon(
        <DateField
          name='start'
          control={control}
          label='Start'
          suppressFormChange
          handleChange={handleChange}
        />,
      ),
    {defaultValues: {start: null}},
  );
  await userEvent.click(screen.getByRole('spinbutton', {name: 'Month'}));
  await userEvent.keyboard('09282026');
  expect(handleChange).toHaveBeenCalled();
  expect(form.getValues('start')).toBeNull();
});
