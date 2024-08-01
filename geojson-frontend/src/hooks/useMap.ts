import { useState, useEffect } from "react";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { Location } from "../interfaces/location.interface";
import { haversineDistance } from "../utils/haversineDistance";
import { initializeMap } from "../utils/mapUtils";


// Custom hook to handle Mapbox map initialization and interactions
export const useMap = (allLocations: Location[]) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null); // State for the Mapbox map instance
  const [popupInfo, setPopupInfo] = useState<Location | null>(null); // State for the popup information
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null); // State for the selected location
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null); // State for the current user location
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    // Initialize the map and add sources/layers on load
    const map = initializeMap("map");
    
    map.on("load", () => {
      // Add source and layer for locations
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

          // Update the current location source with the user's coordinates
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

      // Change cursor to pointer when hovering over locations
      map.on("mouseenter", "locations", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Revert cursor when not hovering over locations
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

    // Clean up map instance on component unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    // Update locations on the map when allLocations or currentLocation change
    if (map && currentLocation) {
      const source = map.getSource("locations") as GeoJSONSource;
      if (source && source.setData) {
        const filtered = allLocations.filter((location) => {
          const distance = haversineDistance(
            currentLocation,
            location.geometry.coordinates
          );
          return distance <= 1000; // Filter locations within 1000 km
        });

        source.setData({
          type: "FeatureCollection",
          features: filtered,
        });
        setLoading(false); // Set loading to false once data is fetched

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

  return { map, popupInfo, setPopupInfo, setSelectedLocation,loading };
};
