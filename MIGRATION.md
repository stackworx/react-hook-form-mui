# Migrating

## 0.0.x to 0.1.0

0.1.0 rebuilds every component for MUI 9 and MUI X 9. This guide covers the changes most forms need, with
before and after code. [CHANGELOG.md](CHANGELOG.md) lists every breaking change.

### Update the packages

0.1.0 needs React 18 or 19, MUI 9, React Hook Form 7.62 or later, and MUI X 9 for the pickers. Follow MUI's
own upgrade guides first, then update these packages. They are ESM only.

```bash
npm install @stackworx/react-hook-form-mui@^0.1.0 react-hook-form@^7.62.0
# The picker packages now need the core package above as well:
npm install @stackworx/react-hook-form-mui-x-date-pickers@^0.1.0
npm install @stackworx/react-hook-form-mui-x-date-pickers-pro@^0.1.0
```

### Your own handlers: `handleChange` and `handleBlur`

MUI's `onChange` and `onBlur` are no longer accepted. In 0.0.x they did different things per component. Most
components ignored them. On `Autocomplete` and the pickers, your `onChange` replaced the form's, so a value was
only stored if you stored it.

`handleChange` runs after the form stores the value, and `handleBlur` after the form marks the field touched:

```tsx
// Before: your onChange replaced the form's.
<Autocomplete
  name='country'
  control={control}
  options={countries}
  onChange={(_event, country) => {
    setValue('country', country);
    setValue('province', null);
  }}
  renderInput={(params) => <MuiTextField {...params} label='Country' />}
/>;

// After: the form stores the value, and handleChange reacts to it.
<Autocomplete
  name='country'
  control={control}
  label='Country'
  options={countries}
  getOptionKey={(country) => country.code}
  getOptionLabel={(country) => country.name}
  handleChange={() => setValue('province', null)}
/>;
```

To keep the 0.0.x behaviour, where your handler decides what is stored, add `suppressFormChange` and store the
value with `setValue`. A change you don't store is ignored.

`handleChange` takes the MUI component's `onChange` arguments. `RadioGroup`, `CheckboxGroup` and
`ToggleButtonGroup` pass the typed option value, and `NumberField` passes Base UI's `(value, eventDetails)`.

### Checkbox and Switch render their own label

`CheckboxWithLabel` is gone. `Checkbox` and `Switch` take a required `label`, and show helper and error text.

```tsx
// Before
<CheckboxWithLabel
  name='accept'
  control={control}
  label='I accept the terms'
/>;
<FormControlLabel
  control={<Switch name='notify' control={control} />}
  label='Email me'
/>;

// After
<Checkbox name='accept' control={control} label='I accept the terms' />;
<Switch name='notify' control={control} label='Email me' />;
```

### Option components take `options`

`Select`, `RadioGroup` and `ToggleButtonGroup` take an `options` array instead of `MenuItem`, `Radio` or
`ToggleButton` children. They store the option's typed value, so numbers and booleans stay numbers and
booleans. `CheckboxGroup` is now one component for the whole group, instead of one per option. The `Radio`
export is gone.

```tsx
// Before
<RadioGroup name='size' control={control}>
  <FormControlLabel
    value='1'
    control={<Radio control={control} />}
    label='Small'
  />
  <FormControlLabel
    value='2'
    control={<Radio control={control} />}
    label='Large'
  />
</RadioGroup>;

<FormControlLabel
  control={<CheckboxGroup name='days' control={control} value='mon' />}
  label='Monday'
/>;
<FormControlLabel
  control={<CheckboxGroup name='days' control={control} value='tue' />}
  label='Tuesday'
/>;

// After
<RadioGroup
  name='size'
  control={control}
  label='Size'
  options={[{value: 1, label: 'Small'}, {value: 2, label: 'Large'}]}
/>;

<CheckboxGroup
  name='days'
  control={control}
  label='Days'
  options={[{value: 'mon', label: 'Monday'}, {value: 'tue', label: 'Tuesday'}]}
/>;
```

- **Select** takes `multiple` instead of `SelectProps={{multiple: true}}`, and stores `null` when nothing is
  selected.
- **ToggleButtonGroup** is now exclusive by default. 0.0.x followed MUI's default, which isn't, so pass
  `exclusive={false}` to keep storing an array. `enforceValue` stops a click from clearing the selection.

### Autocomplete renders its own input

Pass `label` instead of `renderInput`. The form still stores the selected option, but now matches it by
`getOptionKey` rather than by reference, so default values and refetched options stay selected. Object
options need `getOptionKey` in place of `isOptionEqualToValue`. As in MUI, strings and numbers need neither
`getOptionKey` nor `getOptionLabel`, and an object's label defaults to its `label`.

```tsx
// Before
<Autocomplete
  name='location'
  control={control}
  options={locations}
  getOptionLabel={(location) => location.name}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => <MuiTextField {...params} label='Location' />}
/>;

// After
<Autocomplete
  name='location'
  control={control}
  label='Location'
  options={locations}
  getOptionKey={(location) => location.id}
  getOptionLabel={(location) => location.name}
/>;
```

To store the id instead of the option, add `getOptionValue={(location) => location.id}`.

### Date and time pickers

- **Drop the `TDate` and `TEnableAccessibleFieldDOMStructure` type arguments** if you passed them. MUI X no
  longer has them.
- **Validation messages are shorter and no longer include dates.** `minDate`, for example, shows "Date is too
  early". Set your own per field with `messages`:

  ```tsx
  <DatePicker
    name='start'
    control={control}
    label='Start'
    minDate={DateTime.fromISO('2026-10-01')}
    messages={{minDate: 'Bookings open on 1 October'}}
  />;
  ```
- **An error appears on the change that causes it**, not one change later.
- **`helperText` is a prop of the picker.** `slotProps.textField.helperText` still works.

### Behaviour to check

- **Disabled fields reach React Hook Form.** A disabled field isn't validated, and its value is left out of
  what `handleSubmit` receives. If you need the value, make the field read-only instead of disabled.
- **Every field keeps an empty helper line**, as 0.0.x's `TextField` and `Select` did, so an error appearing
  doesn't move the form. `reserveHelperText={false}` turns this off for one field, and
  `<HelperTextProvider reserve={false}>` for a form or section.
- **An `undefined` value renders as empty**, instead of warning about switching from uncontrolled to
  controlled.
- **A rule without a message**, such as `rules={{required: true}}`, shows a default message, which
  `FormErrorMessagesProvider` can replace. The pickers don't read the provider yet.
