import Typography from '@mui/material/Typography';
import {
  AsyncAutocomplete,
  Autocomplete,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Select,
  Switch,
  TextField,
  ToggleButtonGroup,
} from '@stackworx/react-hook-form-mui';
import {NumberField} from '@stackworx/react-hook-form-mui/number-field';
import {
  DatePicker,
  DateTimePicker,
  TimePicker,
} from '@stackworx/react-hook-form-mui-x-date-pickers';
import type {Meta, StoryObj} from '@storybook/react-vite';
import {DateTime} from 'luxon';
import {useWatch} from 'react-hook-form';
import type {Control} from 'react-hook-form';
import {FormStory} from './FormStory';
import {airports, useCitySource} from './trips';
import type {City} from './trips';

const meta = {title: 'Examples/Book a trip'} satisfies Meta;
export default meta;

/** What a booking API would take: an option, codes, and ISO dates, times and timestamps. */
interface Trip {
  destination: City | null;
  from: string | null;
  departOn: string | null;
  returnOn: string | null;
  earliestDeparture: string | null;
  travellers: number | null;
  cabin: 'economy' | 'premium' | 'business';
  seat: 'window' | 'aisle' | 'any' | null;
  extras: string[];
  currency: string;
  flexible: boolean;
  flexibleDays: number | null;
  holdUntil: string | null;
  requests: string;
  acceptTerms: boolean;
}

const defaultValues: Trip = {
  destination: null,
  from: 'CPT',
  departOn: null,
  returnOn: null,
  earliestDeparture: null,
  travellers: 1,
  cabin: 'economy',
  seat: 'any',
  extras: [],
  currency: 'ZAR',
  flexible: false,
  flexibleDays: null,
  holdUntil: null,
  requests: '',
  acceptTerms: false,
};

function Heading({children}: {children: string}) {
  return <Typography variant='subtitle1' component='h3'>{children}</Typography>;
}

function ReturnDate({control}: {control: Control<Trip>}) {
  const departOn = useWatch({control, name: 'departOn'});
  return (
    <DatePicker
      name='returnOn'
      control={control}
      label='Return'
      disablePast
      minDate={departOn === null ? undefined : DateTime.fromISO(departOn)}
      messages={{minDate: 'Return on or after the departure date'}}
      rules={{required: 'Pick a return date'}}
      transform={{
        input: (value) => (value === null ? null : DateTime.fromISO(value)),
        output: (date) => date?.toISODate() ?? null,
      }}
    />
  );
}

function FlexibleDays({control}: {control: Control<Trip>}) {
  const flexible = useWatch({control, name: 'flexible'});
  if (!flexible) return null;
  // Unregistered while hidden, so a switched-off preference isn't submitted.
  return (
    <NumberField
      name='flexibleDays'
      control={control}
      label='By how many days, either way'
      min={1}
      max={3}
      step={1}
      shouldUnregister
      rules={{required: 'Choose 1 to 3 days'}}
    />
  );
}

function TripForm() {
  const citySource = useCitySource();
  return (
    <FormStory<Trip> defaultValues={defaultValues}>
      {(control) => (
        <>
          <Heading>Where</Heading>
          <AsyncAutocomplete
            name='destination'
            control={control}
            label='Destination'
            source={citySource}
            getOptionKey={(city) => city.id}
            getOptionLabel={(city) => `${city.name}, ${city.country}`}
            helperText='Search 49 cities'
            rules={{required: 'Where are you going?'}}
          />
          <Autocomplete
            name='from'
            control={control}
            label='From'
            options={airports}
            getOptionKey={(airport) => airport.code}
            getOptionLabel={(airport) => `${airport.name} (${airport.code})`}
            getOptionValue={(airport) => airport.code}
            groupBy={(airport) => airport.country}
            rules={{required: 'Choose an airport'}}
          />

          <Heading>When</Heading>
          <DatePicker
            name='departOn'
            control={control}
            label='Depart'
            disablePast
            rules={{required: 'Pick a departure date'}}
            transform={{
              input: (value) => value === null ? null : DateTime.fromISO(value),
              output: (date) => date?.toISODate() ?? null,
            }}
          />
          <ReturnDate control={control} />
          <TimePicker
            name='earliestDeparture'
            control={control}
            label='Earliest departure'
            helperText='Leave empty for any time'
            transform={{
              input: (value) =>
                value === null ? null : DateTime.fromFormat(value, 'HH:mm:ss'),
              output: (time) => time?.toFormat('HH:mm:ss') ?? null,
            }}
          />
          <Switch
            name='flexible'
            control={control}
            label='My dates are flexible'
          />
          <FlexibleDays control={control} />

          <Heading>Who and how</Heading>
          <NumberField
            name='travellers'
            control={control}
            label='Travellers'
            min={1}
            max={9}
            step={1}
            rules={{required: 'How many people are travelling?'}}
          />
          <RadioGroup
            name='cabin'
            control={control}
            label='Cabin'
            row
            options={[
              {value: 'economy', label: 'Economy'},
              {value: 'premium', label: 'Premium economy'},
              {value: 'business', label: 'Business'},
            ]}
          />
          <ToggleButtonGroup
            name='seat'
            control={control}
            label='Seat'
            enforceValue
            options={[
              {value: 'window', label: 'Window'},
              {value: 'aisle', label: 'Aisle'},
              {value: 'any', label: 'No preference'},
            ]}
          />
          <CheckboxGroup
            name='extras'
            control={control}
            label='Extras'
            row
            options={[
              {value: 'bag', label: 'Checked bag'},
              {value: 'meals', label: 'Meals'},
              {value: 'insurance', label: 'Travel insurance'},
            ]}
          />

          <Heading>Before you book</Heading>
          <Select
            name='currency'
            control={control}
            label='Pay in'
            options={[
              {value: 'ZAR', label: 'South African rand (ZAR)'},
              {value: 'USD', label: 'US dollar (USD)'},
              {value: 'EUR', label: 'Euro (EUR)'},
              {value: 'GBP', label: 'Pound sterling (GBP)'},
            ]}
          />
          <DateTimePicker
            name='holdUntil'
            control={control}
            label='Hold the fare until'
            helperText='Up to 48 hours from now; leave empty to book now'
            disablePast
            maxDateTime={DateTime.now().plus({hours: 48})}
            transform={{
              input: (value) => value === null ? null : DateTime.fromISO(value),
              output: (date) => date?.toISO() ?? null,
            }}
          />
          <TextField
            name='requests'
            control={control}
            label='Special requests'
            multiline
            minRows={3}
            rules={{
              maxLength: {value: 300, message: 'Keep it under 300 characters'},
            }}
          />
          <Checkbox
            name='acceptTerms'
            control={control}
            label='I accept the booking terms'
            rules={{required: 'Accept the terms to book'}}
          />
        </>
      )}
    </FormStory>
  );
}

export const BookATrip: StoryObj = {
  name: 'Book a trip',
  render: () => <TripForm />,
};
