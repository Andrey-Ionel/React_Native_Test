import { Countries } from './types';

export const normalizeCities = (data: Countries[]) => {
  if (!data?.length) {
    return;
  }

  return data?.map(countries => countries?.cities)?.flat();
};
