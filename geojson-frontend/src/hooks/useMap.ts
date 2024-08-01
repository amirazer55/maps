import { useState, useEffect } from "react";
import mapboxgl, { GeoJSONSource, LngLatLike } from "mapbox-gl";
import { Location } from "./useLocations";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXplcjU1NSIsImEiOiJjbHo1Y2p3MTkzYXAxMmtzZ3p3NGhoY3RjIn0.XnW4oIxvCHcfBPleMPAR_w";

const haversineDistance = (
  coords1: [number, number],
  coords2: [number, number]
) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(coords2[1] - coords1[1]);
  const dLng = toRad(coords2[0] - coords1[0]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1[1])) *
      Math.cos(toRad(coords2[1])) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const useMap = (
  allLocations: Location[]
) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v10",
      center: [0, 0] as LngLatLike,
      zoom: 1,
      projection: 'globe', 
      maxBounds: [
        [-180, -90],
        [180, 90],
      ],
    });

    map.on("load", () => {
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

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCurrentLocation([longitude, latitude]);
          map.setCenter([longitude, latitude]);
          console.log("Current location set:", [longitude, latitude]);
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

      setMap(map);
    });

    map.on("click", "locations", (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0] as any;
        setPopupInfo(feature);
        map.flyTo({
          center: feature.geometry.coordinates,
        });
      }
    });

    return () => map.remove();
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
          return distance <= 1000;
        });

        console.log("Filtered locations:", filtered);

        source.setData({
          type: "FeatureCollection",
          features: filtered,
        });
      }
    }
  }, [allLocations, map, currentLocation]);

  useEffect(() => {
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

  return { map, popupInfo, setPopupInfo, setSelectedLocation };
};
