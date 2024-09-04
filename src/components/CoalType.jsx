import React, { useEffect, useState } from "react";
import { annualCO2inMilTonnes } from "../utils/emission";
import data from "../constants/emission.json";

function CoalType({onEmissionChange}) {
  const [coalType, setCoalType] = useState("");
  const [yearlyProduction, setYearlyProduction] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [exclusionFactor, setExclusionFactor] = useState(null);
  const [conversionFactor, setConversionFactor] = useState(null);
  const [co2EmissionFactor, setCo2EmissionFactor] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const handleCoalTypeChange = (e) => {
    const selectedCoalType = e.target.value;
    setCoalType(selectedCoalType);

    if (data[selectedCoalType]) {
      setConversionFactor(data[selectedCoalType].conversionFactorTJ_kt);
      setCo2EmissionFactor(data[selectedCoalType].co2EmissionFactor_kg_CO2_TJ);
      setExclusionFactor(data[selectedCoalType].exclusionFactor);
    } else {
      setConversionFactor(0);
      setCo2EmissionFactor(0);
      setExclusionFactor(0.017);
    }
  };
  const handleRemove = (index) => {
    setCalculations(calculations.filter((_, i) => i !== index));
  };
  const handleSubmit = (e) => {
    if (!coalType.length) {
      alert("Choose a valid coal type");
      return;
    }
    e.preventDefault();
    const emission = annualCO2inMilTonnes(
      yearlyProduction,
      coalType,
      exclusionFactor,
      conversionFactor,
      co2EmissionFactor
    );

    const newCalculation = {
      coalType,
      yearlyProduction,
      emission,
    };
    setCalculations([...calculations, newCalculation]);
    onEmissionChange(emission);
  };
  useEffect(() => {
    const totalEmission = calculations.reduce(
      (total, object) => total + parseFloat(object.emission),
      0
    );
    onEmissionChange(totalEmission);
  }, [calculations]);
  return (
    <div className={`flex justify-around w-full my-2 pt-8 px-10 h-[90%]`}>
      <div className=" rounded  ">
        <h2 className="text-2xl font-action font-bold mb-4">
          Calculate Annual CO2 Emissions
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Coal Type</label>
            <select
              className="w-full p-2 border rounded bg-white"
              value={coalType}
              onChange={handleCoalTypeChange}
            >
              <option value="">Select Coal Type</option>
              {Object.keys(data).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              Yearly Production (Tonnes)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={yearlyProduction}
              onChange={(e) => setYearlyProduction(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm text-secondary hover:underline mb-2"
          >
            {showAdvanced ? "-" : "+"} Advanced Inputs
          </button>

          {showAdvanced && (
            <div className="space-y-2 ">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Exclusion Factor
                </label>
                <input
                  type="number"
                  step="0.001"
                  className="w-full p-2 border rounded"
                  value={exclusionFactor}
                  onChange={(e) => setExclusionFactor(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Conversion Factor (TJ/kt)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={conversionFactor}
                  onChange={(e) => setConversionFactor(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  CO2 Emission Factor (kg CO2/TJ)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={co2EmissionFactor}
                  onChange={(e) => setCo2EmissionFactor(e.target.value)}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-secondary/85 hover:bg-secondary text-white py-2 rounded mt-2"
          >
            Calculate
          </button>
        </form>
      </div>

      <div
        className={` flex shadow-md bg-background/80 rounded-md  flex-col  justify-between w-[30%]`}
      >
        <h2 className="text-2xl p-2 rounded-t-md text-center font-bold text-white bg-secondary/85 font-action tracking-wide">
          Coal List
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
                <strong>Coal Type:</strong> {calc.coalType}
              </div>
              <div>
                <strong>Yearly Production:</strong> {calc.yearlyProduction}{" "}
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

export default CoalType;