import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import locations from "../constants/mine.json";
import { Select } from "antd";

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [selectedMine, setSelectedMine] = useState({
    name: "Wardha",
    coordinates: locations["Wardha"][0],
    description: locations["Wardha"][1],
    production: locations["Wardha"][2],
    area: locations["Wardha"][3],
    employees: locations["Wardha"][4],
  });

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
            name: name,
            description: `<strong>${name}</strong><br />${details[1]}</p>`,
            icon: "coal-icon",
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
              "icon-size": 0.05,
              "icon-allow-overlap": true,
            },
          });
        }

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
        // Set initial fly to the default selected mine
        mapRef.current.flyTo({
          center: selectedMine.coordinates,
          zoom: 8,
          speed: 0.8,
          curve: 1,
          easing: (t) => t,
        });

        

        // Handle click event
        mapRef.current.on("click", "mines", (e) => {
          const mineName = e.features[0].properties.name;
          const mineDetails = locations[mineName];

          setSelectedMine({
            name: mineName,
            coordinates: mineDetails[0],
            description: mineDetails[1],
            production: mineDetails[2],
            area: mineDetails[3],
            employees: mineDetails[4],

          });

          mapRef.current.flyTo({
            center: mineDetails[0],
            zoom: 8,
            speed: 0.5,
            curve: 1,
            easing: (t) => t,
          });
        });
      });
    });

    return () => mapRef.current.remove(); // Cleanup on unmount
  }, []);

  const updateSelectedMine = (mineName) => {
    const mineDetails = locations[mineName];
    setSelectedMine({
      name: mineName,
      coordinates: mineDetails[0],
      description: mineDetails[1],
      production: mineDetails[2],
      area: mineDetails[3],
      employees: mineDetails[4],
    });

    mapRef.current.flyTo({
      center: mineDetails[0],
      zoom: 8,
      speed: 0.5,
      curve: 1,
      easing: (t) => t,
    });
  };

  return (
    <div className="flex h-full relative">
        <div className="w-1/4 absolute left-4 top-4 z-10 bg-gray-200/90 rounded-2xl p-6">


        <h2 className="text-2xl font-bold mb-4">{selectedMine.name}</h2>
        <p className="text-gray-700 mb-3">{selectedMine.description}</p>
        <p className="text-gray-700">Area of the mine is <span className="text-accent text-nowrap">{selectedMine.area}</span> </p>
        <p className="text-gray-700">Total no. of employees in this mine are <span className="text-accent text-nowrap">{selectedMine.employees}</span> </p>
        <p className="text-gray-700">The total production of the mine is <span className="text-accent text-nowrap">{selectedMine.production}</span> </p>
      </div>
      <div className="absolute top-4 z-20 right-4 w-1/6 ">


      <Select
  className="w-full"
  value={selectedMine.name}
  onChange={(value) => updateSelectedMine(value)} // Corrected this line
>
  {Object.keys(locations).map((mine) => (
    <Select.Option key={mine} value={mine}>
      {mine}
    </Select.Option>
  ))}
</Select>
</div>
      <div
        id="map"
        ref={mapContainerRef}
        className="w-full h-full"
      ></div>

    </div>
  );
};

export default MapboxExample;
