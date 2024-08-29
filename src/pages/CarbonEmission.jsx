import React, { useEffect, useState } from "react";
import { annualCO2inMilTonnes } from "../utils/emission";
import data from "../constants/emission.json";

function CarbonEmission() {
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
    if(!coalType.length){
      alert("Choose a valid coal type")
      return
    }
    e.preventDefault();
    const emission = annualCO2inMilTonnes(
      yearlyProduction,
      coalType,
      exclusionFactor,
      conversionFactor,
      co2EmissionFactor
    ).toFixed(2);

    const newCalculation = {
      coalType,
      yearlyProduction,
      emission,
    };
    setCalculations([...calculations, newCalculation]);
  };
  useEffect(() => {
    console.log(calculations);
  }, [calculations]);

  return (
    <div className={`pt-24 pb-36 flex justify-evenly ${showAdvanced ? "h-[868px]" :"h-[600px]"} `}>
      <div className="max-w-md mx-auto p-4 bg-slate-600/5 rounded shadow ">
        <h2 className="text-2xl font-bold mb-4">
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
              <option value="" >Select Coal Type</option>
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
            className="flex items-center text-sm text-secondary hover:underline mb-4"
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
            className="w-full bg-secondary text-white py-2 rounded mt-2"
          >
            Calculate
          </button>
        </form>
      </div>
      <div className={`w-96 mx-auto ${calculations.length ===0?"hidden":""}`}>

      <div className= {`p-4 bg-slate-600/5 rounded shadow  h-[100%]  ${calculations.length >2?"overflow-y-scroll":""} `}>
        <h2 className="text-2xl font-bold mb-4">Previous Calculations</h2>
        <ul>
          {calculations.map((calc, index) => (
            <li key={index} className="mb-4 border-2 border-primary px-3 py-2 rounded-md relative">
              <div>
                <strong>Coal Type:</strong> {calc.coalType}
              </div>
              <div>
                <strong>Yearly Production:</strong> {calc.yearlyProduction}{" "}
                tonnes
              </div>
              <div>
                <strong>CO2 Emissions:</strong> {calc.emission} million tonnes
              </div>
              <button
                  onClick={() => handleRemove(index)}
                  className="text-xs text-red-500 mt-2 border-2 border-red-500 px-1 rounded-2xl absolute right-1 -top-1"
                >
                  X
                </button>
            </li>
          ))}
        </ul>
          <div className="">

          <h2 className="text-2xl font-bold mb-4">Total Emissions = {calculations.reduce((total,object)=>{return total+parseFloat(object.emission)},0)} <span className="text-nowrap"> million tonnes </span></h2>
          </div>
      </div>
      </div>
    </div>
  );
}

export default CarbonEmission;
