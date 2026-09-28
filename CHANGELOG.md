# Changelog

## 0.1.0

All three packages: `@stackworx/react-hook-form-mui`, `@stackworx/react-hook-form-mui-x-date-pickers`
and `@stackworx/react-hook-form-mui-x-date-pickers-pro`.

### Breaking changes

#### Peers and packaging

- Peers are now `react ^19.0.0`, `react-hook-form >=7.62.0 <8` and `@mui/material ^9.0.0`. The
  pickers also need `@mui/x-date-pickers ^9.0.0`, and the Pro package `@mui/x-date-pickers-pro ^9.0.0`.
  `@base-ui/react` is an optional peer, needed only for `NumberField`.
- ESM only, through an `exports` map. `NumberField` has its own entry point,
  `@stackworx/react-hook-form-mui/number-field`, so apps without `@base-ui/react` never resolve it.
- The tarballs contain `dist` only (no `src`, tsconfigs or `*.tsbuildinfo`).
- The Pro package depends on `@stackworx/react-hook-form-mui-x-date-pickers`.

#### All components

- Only `name`, `control`, `rules`, `defaultValue`, `shouldUnregister` and `disabled` go to
  `useController`; they no longer leak onto MUI or the DOM. `disabled` now reaches React Hook Form,
  so a disabled field is not validated.
- Your `onChange`/`onBlur` run alongside the form binding instead of replacing it.
- `helperText` shows the error message, else your `helperText`. It no longer defaults to `' '`.
- An `undefined` value renders as empty instead of switching from uncontrolled to controlled.

#### Core

- **Checkbox** and **Switch** render their own label and helper text (`label` is required).
  `CheckboxWithLabel` is removed.
- **CheckboxGroup** is a single component that takes `options` and stores the array of checked
  values. It used to be one `CheckboxGroup` per option with a `value` prop.
- **RadioGroup** takes `options` instead of `Radio` children and stores typed values (numbers and
  booleans survive). The `Radio` export is removed.
- **ToggleButtonGroup** takes `options` instead of `ToggleButton` children. `exclusive` defaults to
  `true`, and `enforceValue` keeps the current selection.
- **Select** takes `options` instead of `MenuItem` children and `multiple` instead of
  `SelectProps.multiple`. It stores the option's typed value, and `null` when empty.
- **Autocomplete** needs `getOptionKey`, `getOptionLabel` and `label`, and renders its own input. It
  still stores the selected option, now matched by `getOptionKey` rather than by reference, so default
  values and refetched options stay selected. `getOptionValue` stores something else instead, such as
  the option's id; the field's type decides which is allowed.
- The 0.0.x components passed `inputRef`, which MUI 9 removed; refs now go through `slotProps.input`.

#### Date and time pickers

- The `TDate` and `TEnableAccessibleFieldDOMStructure` generics are gone (MUI X 9), and so is the
  use of `@mui/x-date-pickers/internals`.
- Validation messages changed. Each MUI X validation code has a short English default (for
  example `minDate` → "Date is too early") and dates are no longer interpolated into the text. The
  new `messages` prop overrides them per field. Errors appear on the change that causes them instead
  of one change later.
- A function-form `rules.validate` now runs; it used to be dropped.
- The `ErrorContext` exports are removed.
- `DateRangePicker` rendered itself (infinite recursion) and never received its value. Both are
  fixed.

### New

- `TextField` `transform`; `NumberField` (Base UI recipe, `number | null`).
- `AsyncAutocomplete`: server-backed options through an `OptionsSource`, with a load-more footer and
  the same choice of stored value as `Autocomplete`. Selected options keep their labels across pages
  and searches.
- `FormErrorMessagesProvider` for default and translated rule messages.
- Pickers: `DateField`, `TimeField` and `DateTimeField`, `transform` on every picker, and the
  `usePickerController` / `pickerValueProps` / `pickerTextFieldSlotProps` building blocks.
- Pro: `DateTimeRangePicker` and `SingleInputDateRangeField`.
