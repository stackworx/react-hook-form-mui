import {HelperTextProvider} from '@stackworx/react-hook-form-mui';
import type {DateTime} from 'luxon';
import {expect, test} from 'vitest';
import {renderWithForm} from '../../../test/renderWithForm';
import {withLuxon} from '../../../test/withLuxon';
import {DateField} from './DateField';
import {DatePicker} from './DatePicker';

function helperLines(container: HTMLElement) {
  return container.querySelectorAll('.MuiFormHelperText-root');
}

test('a picker keeps its empty helper line by default, and drops it when told', () => {
  const {container} = renderWithForm<
    {start: DateTime | null; end: DateTime | null}
  >(
    (control) =>
      withLuxon(
        <>
          <DatePicker name='start' control={control} label='Start' />
          <DatePicker
            name='end'
            control={control}
            label='End'
            reserveHelperText={false}
          />
        </>,
      ),
    {defaultValues: {start: null, end: null}},
  );
  const lines = helperLines(container);
  expect(lines).toHaveLength(1);
  expect(lines[0]?.textContent).toBe('​');
});

test("the core package's HelperTextProvider reaches the pickers", () => {
  const {container} = renderWithForm<{day: DateTime | null}>(
    (control) =>
      withLuxon(
        <HelperTextProvider reserve={false}>
          <DateField name='day' control={control} label='Day' />
        </HelperTextProvider>,
      ),
    {defaultValues: {day: null}},
  );
  expect(helperLines(container)).toHaveLength(0);
});
