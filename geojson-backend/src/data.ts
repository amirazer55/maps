import { faker } from '@faker-js/faker';

export const generateLocations = (count: number) => {
  const locations = [];
  for (let i = 0; i < count; i++) {
    locations.push({
      id: faker.datatype.uuid(),
      name: faker.address.cityName(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      score: faker.datatype.number({ min: 0, max: 100 }),
      address: faker.address.streetAddress(),
    });
  }
  return {
    type: "FeatureCollection",
    features: locations.map((location) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
      properties: location,
    })),
  };
};
