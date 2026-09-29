import {AsyncAutocomplete} from '@stackworx/react-hook-form-mui';
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
import {locations, useLocationSource} from './locations';
import type {Location} from './locations';

interface Args extends FormArgs, FieldArgs {
  debounceMs: number;
  latencyMs: number;
  pageSize: number;
}

const getOptionKey = (location: Location) => location.id;
const getOptionLabel = (location: Location) => location.name;

function StoredOptions({args}: {args: Args}) {
  const source = useLocationSource(args.pageSize, args.latencyMs);
  return (
    <FormStory<{locations: Location[]}>
      defaultValues={{
        locations: locations.filter((location) => location.id === 'L40'),
      }}
      settings={args}
    >
      {(control) => (
        <AsyncAutocomplete
          name='locations'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          multiple
          source={source}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
          debounceMs={args.debounceMs}
        />
      )}
    </FormStory>
  );
}

function StoredIds({args}: {args: Args}) {
  const source = useLocationSource(args.pageSize, args.latencyMs);
  return (
    <FormStory<{locationIds: string[]}>
      defaultValues={{locationIds: ['L40']}}
      settings={args}
    >
      {(control) => (
        <AsyncAutocomplete
          name='locationIds'
          control={control}
          {...fieldProps(args)}
          rules={{required: requiredRule(args)}}
          multiple
          source={source}
          // A stored id needs its option for a label until the source loads it.
          knownOptions={locations.filter((location) => location.id === 'L40')}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
          getOptionValue={(location) => location.id}
          debounceMs={args.debounceMs}
        />
      )}
    </FormStory>
  );
}

const meta = {
  title: 'Core/AsyncAutocomplete',
  component: documented<Args>(AsyncAutocomplete),
  args: {
    ...formArgs,
    ...fieldArgs,
    label: 'Locations',
    helperText: 'Type to search; scroll or press Load more for more',
    debounceMs: 250,
    latencyMs: 300,
    pageSize: 8,
  },
  argTypes: {
    ...formArgTypes,
    ...fieldArgTypes,
    latencyMs: {
      control: 'number',
      description: 'How long the example source takes to answer, in ms.',
      table: {category: 'Source'},
    },
    pageSize: {
      control: 'number',
      description:
        'Options per page from the example source. Changing it starts the story again.',
      table: {category: 'Source'},
    },
  },
  parameters: {
    controls: {
      include: [
        ...formAndFieldControls,
        'debounceMs',
        'latencyMs',
        'pageSize',
      ],
    },
  },
  // The source reads its page size once, so a new one needs a new source.
  render: (args) => <StoredOptions key={args.pageSize} args={args} />,
} satisfies Meta<Args>;
export default meta;

type Story = StoryObj<typeof meta>;

export const StoresTheOptions: Story = {name: 'Stores the options'};

export const StoresIds: Story = {
  name: 'Stores ids (getOptionValue)',
  render: (args) => <StoredIds key={args.pageSize} args={args} />,
};
