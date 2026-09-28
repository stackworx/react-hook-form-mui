import {Autocomplete} from '@stackworx/react-hook-form-mui';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {FormStory} from './FormStory';
import {locations} from './locations';
import type {Location} from './locations';

const meta = {title: 'Core/Autocomplete'} satisfies Meta;
export default meta;

const getOptionKey = (location: Location) => location.id;
const getOptionLabel = (location: Location) => location.name;
const byId = (id: string) => locations.filter((location) => location.id === id);

export const StoresTheOption: StoryObj = {
  name: 'Stores the option',
  render: () => (
    <FormStory<{home: Location | null; workplaces: Location[]}>
      defaultValues={{
        home: byId('L1')[0] ?? null,
        workplaces: [...byId('L2'), ...byId('L12')],
      }}
    >
      {(control) => (
        <>
          <Autocomplete
            name='home'
            control={control}
            label='Home location'
            options={locations}
            getOptionKey={getOptionKey}
            getOptionLabel={getOptionLabel}
            groupBy={(location) => location.region}
            rules={{required: 'Pick a home location'}}
          />
          <Autocomplete
            name='workplaces'
            control={control}
            label='Can work at'
            options={locations}
            getOptionKey={getOptionKey}
            getOptionLabel={getOptionLabel}
            multiple
          />
        </>
      )}
    </FormStory>
  ),
};

export const StoresAnId: StoryObj = {
  name: 'Stores an id (getOptionValue)',
  render: () => (
    <FormStory<{homeId: string | null; locationIds: string[]}>
      defaultValues={{homeId: 'L1', locationIds: ['L2', 'L12']}}
    >
      {(control) => (
        <>
          <Autocomplete
            name='homeId'
            control={control}
            label='Home location'
            options={locations}
            getOptionKey={getOptionKey}
            getOptionLabel={getOptionLabel}
            getOptionValue={(location) => location.id}
            groupBy={(location) => location.region}
            rules={{required: 'Pick a home location'}}
          />
          <Autocomplete
            name='locationIds'
            control={control}
            label='Can work at'
            options={locations}
            getOptionKey={getOptionKey}
            getOptionLabel={getOptionLabel}
            getOptionValue={(location) => location.id}
            multiple
          />
        </>
      )}
    </FormStory>
  ),
};
