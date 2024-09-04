import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import axios from "axios";
import { CO2ByTransport } from "../utils/emission";

const MAPBOX_API_KEY = process.env.REACT_APP_MAP_API_KEY;

function TransportType({ onEmissionChange }) {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [tonnes, setTonnes] = useState(0);
  const [mode, setMode] = useState("Truck");
  const [result, setResult] = useState(null);
  const [distance, setDistance] = useState(0);
  const [locationOptions, setLocationOptions] = useState([]);
  const [calculations, setCalculations] = useState([]);
  const handleRemove = (index) => {
    setCalculations(calculations.filter((_, i) => i !== index));
  };

  const fetchLocationOptions = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json`,
        {
          params: {
            access_token: MAPBOX_API_KEY,
            country: "IN",
            limit: 5, // Limit to top 5 results
          },
        }
      );

      const locations = response.data.features.map((feature) => ({
        value: feature.place_name,
        label: feature.place_name,
      }));

      setLocationOptions(locations);
    } catch (error) {
      console.error("Error fetching location options:", error);
    }
  };

  const getCoordinates = async (location) => {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_API_KEY}&country=IN`
    );
    const coordinates = response.data.features[0].geometry.coordinates;
    return coordinates;
  };

  const getDistance = async () => {
    if (fromLocation && toLocation) {
      try {
        const [fromCoords, toCoords] = await Promise.all([
          getCoordinates(fromLocation),
          getCoordinates(toLocation),
        ]);

        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}`,
          {
            params: {
              access_token: MAPBOX_API_KEY,
              geometries: "geojson",
            },
          }
        );

        const distanceInMeters = response.data.routes[0].distance;
        const distanceInKm = distanceInMeters / 1000;
        setDistance(distanceInKm);
        return distanceInKm;
      } catch (error) {
        console.error("Error fetching distance:", error);
        alert("Failed to fetch distance. Please try again.");
      }
    }
  };

  useEffect(() => {
    const totalEmission = calculations.reduce(
      (total, object) => total + parseFloat(object.emission),
      0
    );
    onEmissionChange(totalEmission);
  }, [calculations]);

  async function handleSubmit() {
    if (tonnes > 0 && fromLocation && toLocation) {
      const distanceInKm = await getDistance();
      if (distanceInKm) {
        const emission = CO2ByTransport(mode, tonnes, distanceInKm);
        setResult(emission);
        const newCalculation = {
            mode,
            tonnes,
            emission,
          };
          setCalculations([...calculations, newCalculation]);
          onEmissionChange(emission);
      }
    } else {
      alert("Please enter valid values for tonnes and select locations.");
    }
  }

  return (
    <div className={`flex justify-around w-full my-2 pt-8 px-10 h-[90%]`}>
    <div className="flex flex-col space-y-4">
    <h2 className="text-2xl font-action font-bold mb-4">
          Calculate Transport CO2 Emissions
        </h2>
      <div className="flex space-x-4 justify-between">
        <div
          className={`w-36 p-3 rounded-xl flex flex-col space-y-2 justify-center items-center text-white cursor-pointer transition-all duration-300 ${
            mode==="Truck" ? " bg-accent " : "bg-secondary/85 hover:bg-secondary"
          }`}
          onClick={() => setMode("Truck")}
        >
          <img src="/truck.png" alt="Truck" className="w-16 invert" />
          <h2 className="text-3xl">Truck</h2>
        </div>
        <div
          className={`w-36 p-3  rounded-xl flex flex-col space-y-2 justify-center items-center text-white cursor-pointer transition-all duration-300 ${
            mode === "Rail" ? "bg-accent" : "bg-secondary/85 hover:bg-secondary"
          }`}
          onClick={() => setMode("Rail")}
        >
          <img src="/train.png" alt="Rail" className="w-16 invert" />
          <h2 className="text-3xl">Rail</h2>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-medium">From Location</label>
        <Select
          showSearch
          options={locationOptions}
          onSearch={fetchLocationOptions}
          onChange={setFromLocation}
          placeholder="Select starting location"
          style={{ width: "100%" }}
        />

        <label className="font-medium">To Location</label>
        <Select
          showSearch
          options={locationOptions}
          onSearch={fetchLocationOptions}
          onChange={setToLocation}
          placeholder="Select destination"
          style={{ width: "100%" }}
        />

        <label htmlFor="ton" className="font-medium">
          Tonnes of Coal
        </label>
        <input
          type="number"
          id="ton"
          value={tonnes}
          onChange={(e) => setTonnes(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <Button type="primary" onClick={handleSubmit}>
        Calculate
      </Button>
    </div>
    <div
        className={` flex shadow-md bg-background/80 rounded-md  flex-col  justify-between w-[30%]`}
      >
        <h2 className="text-2xl p-2 rounded-t-md text-center font-bold text-white bg-secondary/85 font-action tracking-wide">
          Transport List
        </h2>
        <div
          className={` flex flex-col gap-2 w-full flex-grow rounded p-2 h-[300px] overflow-y-scroll `}
        >
          {calculations.map((calc, index) => (
            <div
              key={index}
              className="border-2 border-primary px-3 py-2 h-fit w-full  rounded-md relative"
            >
              <div>
                <strong>Transport Type:</strong> {calc.coalType}
              </div>
              <div>
                <strong>Transport Quantity:</strong> {calc.yearlyProduction}{" "}
                tonnes
              </div>
              <div>
                <strong>CO2 Emissions:</strong>{" "}
                {parseFloat(calc.emission).toFixed(2)} tonnes
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="text-xs text-red-500 mt-2 border-2 border-red-500 px-1 rounded-2xl absolute right-1 -top-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className=" bg-accent rounded-b-md text-center p-3 ">
          <h2 className="text-2xl  text-white font-action">
            Total Emissions ={" "}
            {parseFloat(
              calculations.reduce((total, object) => {
                return total + parseFloat(object.emission);
              }, 0)
            ).toFixed(3)}{" "}
            <span className="text-nowrap"> tonnes </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default TransportType;
