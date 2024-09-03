import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import locations from "../constants/mine.json";

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY ?? "";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [78.9629, 20.5937],
      zoom: 4.5,
    });

    mapRef.current.on("load", () => {
      mapRef.current.loadImage("/coal.png", (error, image) => {
        if (error) throw error;

        if (!mapRef.current.hasImage("coal-icon")) {
          mapRef.current.addImage("coal-icon", image);
        }

        const features = Object.entries(locations).map(([name, details]) => ({
          type: "Feature",
          properties: {
            description: `<strong>${name}</strong><br />${details[1]}</p>`,
            icon: name === "Wardha" ? "coal-icon" : "coal-icon",
          },
          geometry: {
            type: "Point",
            coordinates: details[0],
          },
        }));

        if (!mapRef.current.getSource("mines")) {
          mapRef.current.addSource("mines", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: features,
            },
          });
        }

        if (!mapRef.current.getLayer("mines")) {
          mapRef.current.addLayer({
            id: "mines",
            type: "symbol",
            source: "mines",
            layout: {
              "icon-image": "{icon}",
              "icon-size": [
                "case",
                ["==", ["get", "icon"], "coal-icon"],
                0.05,
                0.03,
              ],
              "icon-allow-overlap": true,
            },
          });
        }

        const wardhaCoordinates = locations["Wardha"][0];
        mapRef.current.flyTo({
          center: wardhaCoordinates,
          zoom: 8,
          speed: 0.8,
          curve: 1,
          easing: (t) => t,
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        mapRef.current.on("mouseenter", "mines", (e) => {
          mapRef.current.getCanvas().style.cursor = "pointer";

          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(mapRef.current);
        });

        mapRef.current.on("mouseleave", "mines", () => {
          mapRef.current.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    });
  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: "80vh" }}></div>;
};

export default MapboxExample;
