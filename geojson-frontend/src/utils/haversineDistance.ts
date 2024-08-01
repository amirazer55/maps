// Function to calculate the distance between two coordinates using the Haversine formula
export const haversineDistance = (
  coords1: [number, number],
  coords2: [number, number]
): number => {
  const toRad = (x: number) => (x * Math.PI) / 180; // Convert degrees to radians
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(coords2[1] - coords1[1]); // Delta latitude in radians
  const dLng = toRad(coords2[0] - coords1[0]); // Delta longitude in radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1[1])) *
      Math.cos(toRad(coords2[1])) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2); // Haversine formula
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Angular distance in radians
  return R * c; // Distance in kilometers
};
