import { useState, useEffect } from "react";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { Location } from "../interfaces/location.interface";
import { haversineDistance } from "../utils/haversineDistance";
import { initializeMap } from "../utils/mapUtils";

export const useMap = (allLocations: Location[]) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const map = initializeMap("map");

    map.on("load", () => {
      // when the map load add source and layer for locations
      map.addSource("locations", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "locations",
        type: "circle",
        source: "locations",
        paint: {
          "circle-radius": 5,
          "circle-color": "#007cbf",
        },
      });

      // Add source and layer for the current location
      map.addSource("current-location", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "current-location",
        type: "circle",
        source: "current-location",
        paint: {
          "circle-radius": 5,
          "circle-color": "#FF0000",
        },
      });

      // Get the current user location using the Geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCurrentLocation([longitude, latitude]);
          map.setCenter([longitude, latitude]);

          const source = map.getSource("current-location") as GeoJSONSource;
          source.setData({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
                properties: {},
              },
            ],
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      );

      map.on("mouseenter", "locations", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "locations", () => {
        map.getCanvas().style.cursor = "";
      });

      setMap(map); // Set the map instance in state
    });

    // Handle click events on locations to show a popup and fly to the location
    map.on("click", "locations", (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0] as any;
        setPopupInfo(feature);
        map.flyTo({
          center: feature.geometry.coordinates,
        });
      }
    });

    return () => map.remove(); // here we need to clean up the map instance on the unmounted compoenent
  }, []);

  useEffect(() => {
    if (map && currentLocation) {
      const source = map.getSource("locations") as GeoJSONSource;
      if (source && source.setData) {
        const filtered = allLocations.filter((location) => {
          const distance = haversineDistance(
            currentLocation,
            location.geometry.coordinates
          );
          return distance <= 1000; // Filter locations within 1000 km using haversine formula
        });

        source.setData({
          type: "FeatureCollection",
          features: filtered,
        });
        setLoading(false);
      }
    }
  }, [allLocations, map, currentLocation]);

  useEffect(() => {
    // Show a popup for the selected location and fly to it
    if (map && selectedLocation) {
      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(selectedLocation.geometry.coordinates)
        .setHTML(
          `<div style="color: black;"><h3>${selectedLocation.properties.name}</h3><p>${selectedLocation.properties.address}</p></div>`
        )
        .addTo(map);

      map.flyTo({
        center: selectedLocation.geometry.coordinates,
      });

      return () => {
        popup.remove();
      };
    }
  }, [selectedLocation, map]);

  return { map, popupInfo, setPopupInfo, setSelectedLocation, loading };
};
