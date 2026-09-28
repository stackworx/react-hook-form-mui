import {AsyncAutocomplete} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';
import {locations, useLocationSource} from './locations';
import type {Location} from './locations';

const meta = {title: 'Core/AsyncAutocomplete'} satisfies Meta;
export default meta;

const getOptionKey = (location: Location) => location.id;
const getOptionLabel = (location: Location) => location.name;
const helperText = 'Type to search; scroll or press Load more for more';

function StoredOptions() {
  const source = useLocationSource();
  return (
    <FormStory<{locations: Location[]}>
      defaultValues={{
        locations: locations.filter((location) => location.id === 'L40'),
      }}
    >
      {(control) => (
        <AsyncAutocomplete
          name='locations'
          control={control}
          label='Locations'
          multiple
          source={source}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
          helperText={helperText}
        />
      )}
    </FormStory>
  );
}

function StoredIds() {
  const source = useLocationSource();
  return (
    <FormStory<{locationIds: string[]}> defaultValues={{locationIds: ['L40']}}>
      {(control) => (
        <AsyncAutocomplete
          name='locationIds'
          control={control}
          label='Locations'
          multiple
          source={source}
          // A stored id needs its option for a label until the source loads it.
          knownOptions={locations.filter((location) => location.id === 'L40')}
          getOptionKey={getOptionKey}
          getOptionLabel={getOptionLabel}
          getOptionValue={(location) =>
            location.id}
          helperText={helperText}
        />
      )}
    </FormStory>
  );
}

export const StoresTheOptions: StoryObj = {
  name: 'Stores the options',
  render: () => <StoredOptions />,
};

export const StoresIds: StoryObj = {
  name: 'Stores ids (getOptionValue)',
  render: () => <StoredIds />,
};
