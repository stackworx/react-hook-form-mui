import type {ArgTypes} from '@storybook/react-vite';
import {DateTime} from 'luxon';
import type {ComponentType} from 'react';
import type {Mode} from 'react-hook-form';

/** The form around a story, set from the Form section of the Controls panel. */
export interface FormArgs {
  formMode: Mode;
  formReserveHelperText: boolean;
  formDisabled: boolean;
}

export const formArgs: FormArgs = {
  formMode: 'onTouched',
  formReserveHelperText: true,
  formDisabled: false,
};

export const formArgTypes: Partial<ArgTypes<FormArgs>> = {
  formMode: {
    description:
      "React Hook Form's validation mode. Changing it starts the form again.",
    control: 'select',
    options: ['onTouched', 'onChange', 'onBlur', 'onSubmit', 'all'],
    table: {category: 'Form'},
  },
  formReserveHelperText: {
    description: '`HelperTextProvider` around the form.',
    control: 'boolean',
    table: {category: 'Form'},
  },
  formDisabled: {
    description: "`useForm`'s `disabled`, which disables every field.",
    control: 'boolean',
    table: {category: 'Form'},
  },
};

/** The controls every field story shares. */
export interface FieldArgs {
  label: string;
  helperText: string;
  disabled: boolean;
  /** `form` follows the form's setting. */
  reserveHelperText: 'form' | 'on' | 'off';
  /** The `required` rule's message; empty means not required. */
  required: string;
}

export const fieldArgs: FieldArgs = {
  label: 'Label',
  helperText: '',
  disabled: false,
  reserveHelperText: 'form',
  required: '',
};

export const fieldArgTypes: Partial<ArgTypes<FieldArgs>> = {
  label: {control: 'text', table: {category: 'Field'}},
  helperText: {control: 'text', table: {category: 'Field'}},
  disabled: {control: 'boolean', table: {category: 'Field'}},
  reserveHelperText: {
    control: 'inline-radio',
    options: ['form', 'on', 'off'],
    description: 'Keeps the empty helper line; `form` follows the form.',
    table: {category: 'Field'},
  },
  required: {
    description: "The `required` rule's message; empty means not required.",
    control: 'text',
    // Some components have a boolean `required` of their own, which docgen would give this arg.
    type: 'string',
    table: {category: 'Field', type: {summary: 'string'}},
  },
};

/** The Form controls' names, for a story without field controls. */
export const formControls = [
  'formMode',
  'formReserveHelperText',
  'formDisabled',
];

/** The names to list in `parameters.controls.include`, before a component's own. */
export const formAndFieldControls = [
  ...formControls,
  'label',
  'helperText',
  'disabled',
  'reserveHelperText',
  'required',
];

/** The field props the shared controls set. */
export function fieldProps(args: FieldArgs) {
  return {
    label: args.label,
    helperText: args.helperText === '' ? undefined : args.helperText,
    disabled: args.disabled,
    reserveHelperText: args.reserveHelperText === 'form'
      ? undefined
      : args.reserveHelperText === 'on',
  };
}

/** The `required` rule the shared control sets, if any. */
export function requiredRule(args: FieldArgs): string | undefined {
  return args.required === '' ? undefined : args.required;
}

/** A date control's value (milliseconds) as a Luxon date. */
export function fromDateControl(
  value: number | undefined,
): DateTime | undefined {
  return value === undefined ? undefined : DateTime.fromMillis(value);
}

/** An ISO date or date-time as a date control's value. */
export function dateControl(iso: string): number {
  return DateTime.fromISO(iso).toMillis();
}

/**
 * A bound component as `meta.component`, for its prop types and Docs page. A story's args are the
 * field's controls and the form's, not the component's props, so the type is widened once here.
 */
export function documented<TArgs>(component: unknown): ComponentType<TArgs> {
  return component as ComponentType<TArgs>;
}
