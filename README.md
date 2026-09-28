# React Hook Form × MUI

[React Hook Form](https://react-hook-form.com) bindings for [MUI](https://mui.com) 9 and MUI X 9.
Each component is the MUI component you already know, wired to `useController`: the value, the
error text, `setFocus`, `disabled` and your own `onChange`/`onBlur` all behave the same way.

| Package                                             | Components                                                                                                                                          |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@stackworx/react-hook-form-mui`                    | `TextField`, `NumberField`, `Select`, `Checkbox`, `Switch`, `CheckboxGroup`, `RadioGroup`, `ToggleButtonGroup`, `Autocomplete`, `AsyncAutocomplete` |
| `@stackworx/react-hook-form-mui-x-date-pickers`     | `DatePicker`, `TimePicker`, `DateTimePicker`, `DateField`, `TimeField`, `DateTimeField`                                                             |
| `@stackworx/react-hook-form-mui-x-date-pickers-pro` | `DateRangePicker`, `DateTimeRangePicker`, `SingleInputDateRangeField`                                                                               |

## Install

The packages are ESM only and need React 19, MUI 9 and react-hook-form 7.62 or later.

```bash
npm install @stackworx/react-hook-form-mui react-hook-form @mui/material @emotion/react @emotion/styled
# NumberField only:
npm install @base-ui/react

# Date and time pickers (bring any MUI X adapter, e.g. Luxon):
npm install @stackworx/react-hook-form-mui-x-date-pickers @mui/x-date-pickers luxon

# Range pickers (MUI X Pro licence):
npm install @stackworx/react-hook-form-mui-x-date-pickers-pro @mui/x-date-pickers-pro
```

## How every component behaves

- `name`, `control`, `rules`, `defaultValue`, `shouldUnregister` and `disabled` go to
  `useController`; everything else goes to the MUI component. `disabled` also reaches React Hook
  Form, so a disabled field is not validated and is left out of the submitted values.
- The helper text shows the rule's message when there is an error, and your `helperText` otherwise.
  A rule without a message (`rules={{required: true}}`) falls back to `FormErrorMessagesProvider`
  (English defaults), then to the error type.
- Your `onChange` and `onBlur` run after the form binding instead of replacing it.
- `form.setFocus(name)` focuses the input.
- An `undefined` value renders as empty (`''`, `null` or `[]`), so there are no
  uncontrolled-to-controlled warnings.

```tsx
import {FormErrorMessagesProvider} from '@stackworx/react-hook-form-mui';

<FormErrorMessagesProvider messages={{required: 'Dit is verpligtend'}}>
  <App />
</FormErrorMessagesProvider>;
```

## Core components

### TextField

Stores the input's string. `transform` maps the form value to the text and back.

```tsx
<TextField
  name='email'
  control={control}
  label='Email'
  rules={{required: 'Email is required'}}
  transform={{input: (value) => value, output: (text) => text.trim()}}
/>;
```

### NumberField

Stores `number | null`. Built from MUI's Base UI recipe, so it ships on its own entry point and needs
`@base-ui/react`.

```tsx
import {NumberField} from '@stackworx/react-hook-form-mui/number-field';

<NumberField
  name='hours'
  control={control}
  label='Hours'
  min={0}
  max={60}
  step={0.5}
  rules={{min: {value: 4, message: 'At least 4 hours'}}}
/>;
```

### Select

Stores the chosen option's `value`: `TValue | null`, or `TValue[]` with `multiple`. Numbers stay
numbers.

```tsx
<Select
  name='length'
  control={control}
  label='Shift length'
  options={[{value: 4, label: '4 hours'}, {value: 8, label: '8 hours'}]}
/>;
```

### Checkbox and Switch

Store a boolean and render their own label and helper text.

```tsx
<Checkbox
  name='accept'
  control={control}
  label='I accept the terms'
  rules={{validate: (value) => value || 'Please accept the terms'}}
/>;
<Switch name='notifications' control={control} label='Email notifications' />;
```

### CheckboxGroup

Stores the array of checked option values.

```tsx
<CheckboxGroup
  name='days'
  control={control}
  label='Working days'
  row
  options={[{value: 1, label: 'Mon'}, {value: 2, label: 'Tue'}]}
  rules={{required: 'Pick at least one day'}}
/>;
```

### RadioGroup

Stores the chosen option's typed value (`TValue | null`); strings, numbers and booleans all work.

```tsx
<RadioGroup
  name='overtime'
  control={control}
  label='Eligible for overtime'
  options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]}
/>;
```

### ToggleButtonGroup

Stores `TValue | null` (the default, `exclusive`) or `TValue[]` (`exclusive={false}`).
`enforceValue` ignores a click that would clear the selection.

```tsx
<ToggleButtonGroup
  name='view'
  control={control}
  label='Roster view'
  enforceValue
  options={[{value: 'day', label: 'Day'}, {value: 'week', label: 'Week'}]}
/>;
```

### Autocomplete

A static list. The form stores the selected option, or an array of them with `multiple`, as MUI's
Autocomplete does. To store something else, such as the option's id, pass `getOptionValue`; the field's
type decides which is allowed. Stored options are matched by `getOptionKey`, not by reference, so
default values and refetched options stay selected.

```tsx
// Stores the locations: {locations: Location[]}
<Autocomplete
  name='locations'
  control={control}
  label='Locations'
  multiple
  options={locations}
  getOptionKey={(location) => location.id}
  getOptionLabel={(location) => location.name}
/>;

// Stores their ids: {locationIds: string[]}
<Autocomplete
  name='locationIds'
  control={control}
  label='Locations'
  multiple
  options={locations}
  getOptionKey={(location) => location.id}
  getOptionLabel={(location) => location.name}
  getOptionValue={(location) => location.id}
/>;
```

### AsyncAutocomplete

Server-backed options, with the same choice of stored value as `Autocomplete`. The library never
fetches: you pass an `OptionsSource` (for example built from Relay's `usePaginationFragment`).

```ts
interface OptionsSource<TOption> {
  options: readonly TOption[];
  loading: boolean; // e.g. isPending of the transition around refetch
  onSearch: (search: string) => void; // debounced (debounceMs, default 250)
  hasMore: boolean;
  loadingMore?: boolean;
  onLoadMore: () => void;
  totalCount?: number;
}
```

```tsx
<AsyncAutocomplete
  name='locationIds'
  control={control}
  label='Locations'
  multiple
  source={source}
  knownOptions={selectedLocations} // labels for stored ids, e.g. from nodes(ids:)
  getOptionKey={(location) => location.id}
  getOptionLabel={(location) => location.name}
  getOptionValue={(location) => location.id}
/>;
```

Selected options keep their labels after the options change. Stored options carry their own labels,
so only stored ids need `knownOptions`. The list's footer shows a **Load
more** button while `hasMore` is true, and "Showing 8 of 40 — type to narrow" while nothing has been
searched. Scrolling to the end also calls `onLoadMore`. `loadMoreText` and `countText` change the
wording.

## Date and time pickers

Wrap your app in MUI X's `LocalizationProvider` with the adapter you use. The components never import
an adapter.

```tsx
import {DatePicker} from '@stackworx/react-hook-form-mui-x-date-pickers';

<DatePicker
  name='startDate'
  control={control}
  label='Start date'
  disablePast
  rules={{required: 'Pick a start date'}}
  // Store an ISO date instead of the adapter's date object:
  transform={{
    input: (value) => (value === null ? null : DateTime.fromISO(value)),
    output: (date) => date?.toISODate() ?? null,
  }}
/>;
```

`TimePicker`, `DateTimePicker`, `DateField`, `TimeField` and `DateTimeField` take the same props.
Without `transform` the form stores the adapter's date (or `null`).

MUI X's own validation (`minDate`, `disablePast`, `shouldDisableDate`, `minTime`, `minutesStep`,
invalid dates, …) becomes a form error with an English message that appears on the change that
causes it. A `rules.validate` function still runs alongside. Override the text per field with
`messages={{minDate: 'Too early for this roster'}}`; the defaults are in
`defaultPickerErrorMessages`.

`usePickerController`, `pickerValueProps` and `pickerTextFieldSlotProps` bind any other MUI X
picker (for example `MobileDatePicker`) the same way.

## Range pickers (Pro)

The form value is `[start, end]` and defaults to `[null, null]`; `transform` maps it to your own
shape.

```tsx
import {DateRangePicker} from '@stackworx/react-hook-form-mui-x-date-pickers-pro';

<DateRangePicker
  name='period'
  control={control}
  label='Leave period'
  rules={{
    validate: ({from, to}) =>
      (from !== null && to !== null) || 'Pick both dates',
  }}
  transform={{
    input: ({from, to}) => [
      from === null ? null : DateTime.fromISO(from),
      to === null ? null : DateTime.fromISO(to),
    ],
    output: ([start, end]) => ({
      from: start?.toISODate() ?? null,
      to: end?.toISODate() ?? null,
    }),
  }}
/>;
```

`DateTimeRangePicker` and `SingleInputDateRangeField` work the same way.

## Development

```bash
npm install
npm run check            # dprint, ESLint, TypeScript, Vitest, library builds
npm run storybook        # one story per component
```

See [CHANGELOG.md](CHANGELOG.md) for the changes since 0.0.x.
