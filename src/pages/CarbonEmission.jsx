import React, { useState } from "react";
import { annualCO2inMilTonnes } from "../utils/emission";
import data from "../constants/emission.json";

function CarbonEmission() {
  const [coalType, setCoalType] = useState("");
  const [yearlyProduction, setYearlyProduction] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [exclusionFactor, setExclusionFactor] = useState(null);
  const [conversionFactor, setConversionFactor] = useState(null);
  const [co2EmissionFactor, setCo2EmissionFactor] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Annual CO2 Emissions: ${annualCO2inMilTonnes(
        yearlyProduction,
        coalType,
        exclusionFactor,
        conversionFactor,
        co2EmissionFactor
      ).toFixed(2)} million tonnes`
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        Calculate Annual CO2 Emissions
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Coal Type</label>
          <select
            className="w-full p-2 border rounded"
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

        <div className="mb-4">
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
          className="flex items-center text-sm text-blue-500 hover:underline mb-4"
        >
          {showAdvanced ? "-" : "+"} Advanced Inputs
        </button>

        {showAdvanced && (
          <div className="space-y-4 mb-4">
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
          className="w-full bg-blue-500 text-white py-2 rounded mt-2"
        >
          Calculate
        </button>
      </form>
    </div>
  );
}

export default CarbonEmission;
