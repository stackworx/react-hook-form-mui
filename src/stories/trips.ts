import type {OptionsSource} from '@stackworx/react-hook-form-mui';
import {useInMemorySource} from './inMemorySource';

export interface City {
  id: string;
  name: string;
  country: string;
}

export interface Airport {
  code: string;
  name: string;
  country: string;
}

const places: [city: string, country: string][] = [
  ['Amsterdam', 'Netherlands'],
  ['Athens', 'Greece'],
  ['Bangkok', 'Thailand'],
  ['Barcelona', 'Spain'],
  ['Berlin', 'Germany'],
  ['Boston', 'United States'],
  ['Buenos Aires', 'Argentina'],
  ['Cairo', 'Egypt'],
  ['Cape Town', 'South Africa'],
  ['Chicago', 'United States'],
  ['Copenhagen', 'Denmark'],
  ['Dubai', 'United Arab Emirates'],
  ['Dublin', 'Ireland'],
  ['Edinburgh', 'United Kingdom'],
  ['Florence', 'Italy'],
  ['Hanoi', 'Vietnam'],
  ['Helsinki', 'Finland'],
  ['Hong Kong', 'China'],
  ['Istanbul', 'Türkiye'],
  ['Kyoto', 'Japan'],
  ['Lisbon', 'Portugal'],
  ['London', 'United Kingdom'],
  ['Los Angeles', 'United States'],
  ['Madrid', 'Spain'],
  ['Marrakesh', 'Morocco'],
  ['Melbourne', 'Australia'],
  ['Mexico City', 'Mexico'],
  ['Montreal', 'Canada'],
  ['Mumbai', 'India'],
  ['Munich', 'Germany'],
  ['Nairobi', 'Kenya'],
  ['New York', 'United States'],
  ['Oslo', 'Norway'],
  ['Paris', 'France'],
  ['Prague', 'Czechia'],
  ['Reykjavik', 'Iceland'],
  ['Rio de Janeiro', 'Brazil'],
  ['Rome', 'Italy'],
  ['San Francisco', 'United States'],
  ['Seoul', 'South Korea'],
  ['Singapore', 'Singapore'],
  ['Stockholm', 'Sweden'],
  ['Sydney', 'Australia'],
  ['Tokyo', 'Japan'],
  ['Toronto', 'Canada'],
  ['Vancouver', 'Canada'],
  ['Vienna', 'Austria'],
  ['Zanzibar', 'Tanzania'],
  ['Zurich', 'Switzerland'],
];

export const cities: City[] = places.map(([name, country], index) => ({
  id: `C${String(index + 1)}`,
  name,
  country,
}));

/** Sorted by country, as MUI's `groupBy` expects. */
export const airports: Airport[] = [
  {code: 'SYD', name: 'Sydney Kingsford Smith', country: 'Australia'},
  {code: 'CDG', name: 'Paris Charles de Gaulle', country: 'France'},
  {code: 'FRA', name: 'Frankfurt', country: 'Germany'},
  {code: 'HND', name: 'Tokyo Haneda', country: 'Japan'},
  {code: 'NBO', name: 'Nairobi Jomo Kenyatta', country: 'Kenya'},
  {code: 'AMS', name: 'Amsterdam Schiphol', country: 'Netherlands'},
  {code: 'SIN', name: 'Singapore Changi', country: 'Singapore'},
  {code: 'CPT', name: 'Cape Town International', country: 'South Africa'},
  {code: 'DUR', name: 'Durban King Shaka', country: 'South Africa'},
  {code: 'JNB', name: 'Johannesburg O. R. Tambo', country: 'South Africa'},
  {code: 'DXB', name: 'Dubai International', country: 'United Arab Emirates'},
  {code: 'LGW', name: 'London Gatwick', country: 'United Kingdom'},
  {code: 'LHR', name: 'London Heathrow', country: 'United Kingdom'},
  {code: 'JFK', name: 'New York JFK', country: 'United States'},
  {code: 'LAX', name: 'Los Angeles International', country: 'United States'},
  {code: 'SFO', name: 'San Francisco International', country: 'United States'},
];

/** Cities served like a paged, searchable API. */
export function useCitySource(): OptionsSource<City> {
  return useInMemorySource(
    cities,
    (city) => `${city.name} ${city.country}`,
    10,
  );
}
