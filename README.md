# React Hook Form × MUI

[React Hook Form](https://react-hook-form.com) bindings for [MUI](https://mui.com) 9 and MUI X 9.
Each component is the MUI component you already know, wired to `useController`: the value, the
error text, `setFocus` and `disabled` all behave the same way.

| Package                                             | Components                                                                                                                                          |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@stackworx/react-hook-form-mui`                    | `TextField`, `NumberField`, `Select`, `Checkbox`, `Switch`, `CheckboxGroup`, `RadioGroup`, `ToggleButtonGroup`, `Autocomplete`, `AsyncAutocomplete` |
| `@stackworx/react-hook-form-mui-x-date-pickers`     | `DatePicker`, `TimePicker`, `DateTimePicker`, `DateField`, `TimeField`, `DateTimeField`                                                             |
| `@stackworx/react-hook-form-mui-x-date-pickers-pro` | `DateRangePicker`, `DateTimeRangePicker`, `SingleInputDateRangeField`                                                                               |

## Install

The packages are ESM only and need React 18 or 19, MUI 9 and react-hook-form 7.62 or later.

```bash
npm install @stackworx/react-hook-form-mui react-hook-form @mui/material @emotion/react @emotion/styled
# NumberField only:
npm install @base-ui/react

# Date and time pickers (with the core package above; bring any MUI X adapter, e.g. Luxon):
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
- An empty helper line keeps its space, so an error appearing doesn't move the fields below it.
  `reserveHelperText={false}` turns that off for one field, and `HelperTextProvider` for a form or
  section; a field's own setting wins.
- Your handlers are `handleChange` and `handleBlur`; MUI's own `onChange` and `onBlur` aren't
  accepted. `handleChange` runs after the form stores each change, and takes the MUI component's
  `onChange` arguments: the option groups pass the typed option value, and `NumberField` Base UI's
  `(value, eventDetails)`. `handleBlur` runs after the form's blur handler marks the field touched.
- With `suppressFormChange`, the form stores nothing: `handleChange` stores the changes it keeps with
  `setValue`, and ignores the rest. Autocomplete and the pickers then show the stored value again.
  `NumberField` shows the text until it loses focus, and a date field keeps the text that was typed.
- `form.setFocus(name)` focuses the input.
- An `undefined` value renders as empty (`''`, `null` or `[]`), so there are no
  uncontrolled-to-controlled warnings.

```tsx
// Only products that are available can be picked.
<Autocomplete
  name='product'
  control={control}
  label='Product'
  options={products}
  getOptionKey={(product) => product.id}
  getOptionLabel={(product) => product.name}
  suppressFormChange
  handleChange={(_event, product) => {
    if (product && !isAvailable(product)) return;
    setValue('product', product, {shouldDirty: true, shouldValidate: true});
  }}
/>;
```

```tsx
import {FormErrorMessagesProvider} from '@stackworx/react-hook-form-mui';

<FormErrorMessagesProvider messages={{required: 'Dit is verpligtend'}}>
  <App />
</FormErrorMessagesProvider>;
```

```tsx
import {HelperTextProvider} from '@stackworx/react-hook-form-mui';

// A dense filter bar that shows no helper text needs no reserved lines.
<HelperTextProvider reserve={false}>
  <Filters />
</HelperTextProvider>;
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
type decides which is allowed.

Options follow MUI's conventions. A string or number is its own key and label, so it needs neither
`getOptionKey` nor `getOptionLabel`, and an object's label defaults to its `label`. Objects need
`getOptionKey`: stored options are matched by it, not by reference, so default values and refetched
options stay selected.

```tsx
// Strings: stores the size, {size: string | null}
<Autocomplete
  name='size'
  control={control}
  label='Size'
  options={['Small', 'Medium', 'Large']}
/>;

// Objects with a label: stores the colour, {colour: {id: number; label: string} | null}
<Autocomplete
  name='colour'
  control={control}
  label='Colour'
  options={colours}
  getOptionKey={(colour) => colour.id}
/>;

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

Server-backed options, with the same option conventions and choice of stored value as `Autocomplete`. The library never
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
npm run storybook        # every component, its Docs page and a "Book a trip" example
```

Each story's Controls panel changes the field (label, helper text, disabled, the reserved helper
line, a required message and the component's own props) and the form around it (validation mode,
`HelperTextProvider`, disabled). The panel under the fields shows the live form state, and Submit
logs the values in the Actions tab.

### Releasing

Each package has its own version, managed with Lerna.

1. On a branch, run `npm run release:version`. Lerna lists the packages changed since their last
   `<package>@<version>` tag, asks for each new version and updates the Pro package's dependency on the
   pickers to match. It doesn't commit, tag or push, so add the changes to `CHANGELOG.md` and open a
   PR.
2. Once the PR is merged, publish a GitHub release from `main`. The Release workflow runs the checks,
   publishes each version npm doesn't have yet, in dependency order and with provenance, and tags it
   `<package>@<version>`. To retry a run that failed, start the workflow from the Actions tab.

The workflow publishes through npm's trusted publishing: each package on npmjs.com trusts
`release.yaml` in this repository, so no npm token is stored. Until that is set up, `npm login` and
then `npm run release:publish` publish the same versions from a checkout of `main`, without
provenance.

Lerna doesn't change peer ranges, and below 1.0 a caret range doesn't reach the next minor version.
So before a breaking release of `@stackworx/react-hook-form-mui` (for example 0.1.x to 0.2.0), set the
pickers' and the Pro package's peer range on it to the new version (`^0.2.0`), then run
`npm run release:version`. Otherwise Lerna's lockfile update fails with `ERESOLVE`.

See [CHANGELOG.md](CHANGELOG.md) for the changes since 0.0.x.
