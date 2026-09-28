import {act, renderHook, screen} from '@testing-library/react';
import {useForm} from 'react-hook-form';
import type {Control, RegisterOptions} from 'react-hook-form';
import {expect, expectTypeOf, test, vi} from 'vitest';
import {renderWithForm} from '../../../../test/renderWithForm';
import {composeHandlers} from './composeHandlers';
import {FormErrorMessagesProvider} from './FormErrorMessages';
import {splitControllerProps, useFieldController} from './useFieldController';
import type {FieldControllerProps} from './useFieldController';

function Probe({
  control,
  disabled,
  rules = {required: true},
}: {
  control: Control<{a: string}>;
  disabled?: boolean;
  rules?: RegisterOptions<{a: string}, 'a'>;
}) {
  const {field, errorText, hasError} = useFieldController({
    name: 'a',
    control,
    rules,
    disabled,
  });
  return (
    <output data-error={hasError} data-disabled={Boolean(field.disabled)}>
      {errorText ?? ''}
    </output>
  );
}

test('falls back to the provider message for a rule without a message', async () => {
  const {form} = renderWithForm<{a: string}>(
    (control) => (
      <FormErrorMessagesProvider messages={{required: 'Please fill this in'}}>
        <Probe control={control} />
      </FormErrorMessagesProvider>
    ),
    {defaultValues: {a: ''}},
  );
  await act(() => form.trigger('a'));
  expect(screen.getByRole('status')).toHaveTextContent('Please fill this in');
  expect(screen.getByRole('status')).toHaveAttribute('data-error', 'true');
});

test('uses the English default when there is no provider', async () => {
  const {form} = renderWithForm<{a: string}>(
    (control) => <Probe control={control} />,
    {defaultValues: {a: ''}},
  );
  await act(() => form.trigger('a'));
  expect(screen.getByRole('status')).toHaveTextContent('Required');
});

test('a rule with its own message wins over the provider', async () => {
  const {form} = renderWithForm<{a: string}>(
    (control) => (
      <FormErrorMessagesProvider messages={{required: 'Please fill this in'}}>
        <Probe control={control} rules={{required: 'Name is required'}} />
      </FormErrorMessagesProvider>
    ),
    {defaultValues: {a: ''}},
  );
  await act(() => form.trigger('a'));
  expect(screen.getByRole('status')).toHaveTextContent('Name is required');
});

test('an unknown error type falls back to the type name', async () => {
  const {form} = renderWithForm<{a: string}>(
    (control) => (
      <Probe
        control={control}
        rules={{validate: {startsWithA: () => false}}}
      />
    ),
    {defaultValues: {a: 'b'}},
  );
  await act(() => form.trigger('a'));
  expect(screen.getByRole('status')).toHaveTextContent('startsWithA');
});

test('no error renders no error text', () => {
  renderWithForm<{a: string}>((control) => <Probe control={control} />, {
    defaultValues: {a: 'filled'},
  });
  expect(screen.getByRole('status')).toHaveTextContent('');
  expect(screen.getByRole('status')).toHaveAttribute('data-error', 'false');
});

test('forwards disabled to RHF so the field is not validated', async () => {
  const {form} = renderWithForm<{a: string}>(
    (control) => <Probe control={control} disabled />,
    {defaultValues: {a: ''}},
  );
  let valid = false;
  await act(async () => {
    valid = await form.trigger('a');
  });
  expect(valid).toBe(true);
  expect(screen.getByRole('status')).toHaveAttribute('data-disabled', 'true');
});

test('splitControllerProps separates controller props from the rest', () => {
  const {result} = renderHook(() => useForm<{a: string}>());
  const control = result.current.control;
  const [controllerProps, rest] = splitControllerProps<
    {a: string},
    'a',
    FieldControllerProps<{a: string}, 'a'> & {label: string}
  >({
    name: 'a',
    control,
    rules: {required: true},
    defaultValue: 'x',
    shouldUnregister: true,
    disabled: false,
    label: 'A',
  });
  expect(controllerProps).toEqual({
    name: 'a',
    control,
    rules: {required: true},
    defaultValue: 'x',
    shouldUnregister: true,
    disabled: false,
  });
  expect(rest).toEqual({label: 'A'});
});

test('composeHandlers calls every defined handler in order', () => {
  const calls: string[] = [];
  const first = vi.fn((value: number) => calls.push(`first ${String(value)}`));
  const second = vi.fn((value: number) =>
    calls.push(`second ${String(value)}`)
  );
  composeHandlers(first, undefined, second)(1);
  expect(calls).toEqual(['first 1', 'second 1']);
});

test('accepts a control whose transformed values differ from its input', () => {
  const {result} = renderHook(() => {
    const form = useForm<{a: string}, unknown, {a: number}>({
      defaultValues: {a: '1'},
    });
    return useFieldController({name: 'a', control: form.control});
  });
  expectTypeOf(result.current.field.value).toEqualTypeOf<string>();
  expect(result.current.field.value).toBe('1');
});
