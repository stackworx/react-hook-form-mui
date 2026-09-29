import type {OptionsSource} from '@stackworx/react-hook-form-mui';
import {useInMemorySource} from './inMemorySource';

export interface Location {
  id: string;
  name: string;
  region: string;
}

const regions = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape'];
const sites = [
  'Head Office',
  'Warehouse',
  'Depot',
  'Distribution Centre',
  'Workshop',
  'Store',
  'Yard',
  'Call Centre',
  'Training Centre',
  'Pop-up',
];

export const locations: Location[] = regions.flatMap((region, r) =>
  sites.map((site, s) => ({
    id: `L${String(r * sites.length + s + 1)}`,
    name: `${site} ${region}`,
    region,
  }))
);

/** Locations served like a paged, searchable API. */
export function useLocationSource(
  pageSize?: number,
  latencyMs?: number,
): OptionsSource<Location> {
  return useInMemorySource(
    locations,
    (location) => location.name,
    pageSize,
    latencyMs,
  );
}
