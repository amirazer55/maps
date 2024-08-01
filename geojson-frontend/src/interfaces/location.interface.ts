export interface Location {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    id: string;
    name: string;
    score: number;
    address: string;
    country?: string;
    state?: string;
    siteType?: string;
    priorityScore?: number;
  };
}
