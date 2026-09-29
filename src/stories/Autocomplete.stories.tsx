import {Autocomplete} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {
  documented,
  fieldArgs,
  fieldArgTypes,
  fieldProps,
  formAndFieldControls,
  formArgs,
  formArgTypes,
  requiredRule,
} from './controls';
import type {FieldArgs, FormArgs} from './controls';
import {FormStory} from './FormStory';
import {locations} from './locations';
import type {Location} from './locations';

interface Args extends FormArgs, FieldArgs {
  placeholder: string;
  disableClearable: boolean;
  size: 'small' | 'medium';
  groupByRegion: boolean;
  limitTags: number;
}

const getOptionKey = (location: Location) => location.id;
const getOptionLabel = (location: Location) => location.name;
const byRegion = (location: Location) => location.region;
const byId = (id: string) => locations.filter((location) => location.id === id);

/** The props the Autocomplete controls set, except the multiple-only `limitTags`. */
function autocompleteProps(args: Args) {
  return {
    placeholder: args.placeholder === '' ? undefined : args.placeholder,
    disableClearable: args.disableClearable,
    size: args.size,
    groupBy: args.groupByRegion ? byRegion : undefined,
  };
}

const autocompleteControls = [
  ...formAndFieldControls,
  'placeholder',
  'disableClearable',
  'size',
  'groupByRegion',
];

const meta = {
  title: 'Core/Autocomplete',
  component: documented<Args>(Autocomplete),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Home location',
    required: 'Pick a home location',
    placeholder: '',
    disableClearable: false,
    size: 'medium',
    groupByRegion: true,
    limitTags: -1,
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    disableClearable: {control: 'boolean'},
    size: {control: 'inline-radio', options: ['small', 'medium']},
    groupByRegion: {
      control: 'boolean',
      description: 'Groups the options by region with `groupBy`.',
    },
  },
  parameters: {controls: {include: autocompleteControls}},
  render: (args) => (
    <FormStory<{home: Location | null}>
      defaultValues={{home: byId('L1')[0] ?? null}}
      settings={args}
    >
      {(control) => (
        <Autocomplete
          name='home'
          control={control}
          {...fieldProps(args)}
          {...autocompleteProps(args)}
          rules={{required: requiredRule(args)}}
          options={locations}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
        />
      )}
    </FormStory>
  ),
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const StoresTheOption: Story = {name: 'Stores the option'};

export const StoresTheOptions: Story = {
  name: 'Stores the options (multiple)',
  args: {label: 'Other locations', required: '', groupByRegion: false},
  parameters: {controls: {include: [...autocompleteControls, 'limitTags']}},
  render: (args) => (
    <FormStory<{otherLocations: Location[]}>
      defaultValues={{otherLocations: [...byId('L2'), ...byId('L12')]}}
      settings={args}
    >
      {(control) => (
        <Autocomplete
          name='otherLocations'
          control={control}
          {...fieldProps(args)}
          {...autocompleteProps(args)}
          rules={{required: requiredRule(args)}}
          options={locations}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
          multiple
          limitTags={args.limitTags}
        />
      )}
    </FormStory>
  ),
};

export const StoresAnId: Story = {
  name: 'Stores an id (getOptionValue)',
  render: (args) => (
    <FormStory<{homeId: string | null}>
      defaultValues={{homeId: 'L1'}}
      settings={args}
    >
      {(control) => (
        <Autocomplete
          name='homeId'
          control={control}
          {...fieldProps(args)}
          {...autocompleteProps(args)}
          rules={{required: requiredRule(args)}}
          options={locations}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
          getOptionValue={(location) => location.id}
        />
      )}
    </FormStory>
  ),
};

export const StoresIds: Story = {
  name: 'Stores ids (multiple)',
  args: {label: 'Other locations', required: '', groupByRegion: false},
  parameters: {controls: {include: [...autocompleteControls, 'limitTags']}},
  render: (args) => (
    <FormStory<{locationIds: string[]}>
      defaultValues={{locationIds: ['L2', 'L12']}}
      settings={args}
    >
      {(control) => (
        <Autocomplete
          name='locationIds'
          control={control}
          {...fieldProps(args)}
          {...autocompleteProps(args)}
          rules={{required: requiredRule(args)}}
          options={locations}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
          getOptionValue={(location) => location.id}
          multiple
          limitTags={args.limitTags}
        />
      )}
    </FormStory>
  ),
};
