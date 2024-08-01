import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../constant/mapBoxAccessToken";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export const initializeMap = (
  containerId: string,
  center: mapboxgl.LngLatLike = [0, 0], 
  zoom: number = 2
): mapboxgl.Map => {
  return new mapboxgl.Map({
    container: containerId, 
    style: "mapbox://styles/mapbox/dark-v10",           // used to get the dark theme
    center,                                     
    zoom: 1,                                     // if you want more zoom level to map use can change it to 2 or 3 
    // projection: "globe",                      // uncomment this if you want globe projection
    maxBounds: [
      [-180, -90],
      [180, 90],
    ], // Set max bounds to prevent panning beyond the world and  when you zoom out not seeing duplicating in the world 
  });
};
