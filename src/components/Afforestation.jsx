import React, { useEffect, useState } from "react";
import { calculateCO2ReductionFromTrees } from "../utils/reduction";

function Afforestation({onReductionChange}) {
  const [treesPerHectare, setTreesPerHectare] = useState(null);
  const [areaHectares, setAreaHectares] = useState(null);
  const [calculations, setCalculations] = useState([]);

  const handleRemove = (index) => {
    setCalculations(calculations.filter((_, i) => i !== index));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const reduction = calculateCO2ReductionFromTrees(treesPerHectare,areaHectares);

    const newCalculation = {
      treesPerHectare,
      areaHectares,
      reduction,
    };
    setCalculations([...calculations, newCalculation]);
    onReductionChange(reduction);
  };
  useEffect(() => {
    const totalRedution = calculations.reduce(
      (total, object) => total + parseFloat(object.reduction),
      0
    );
    onReductionChange(totalRedution);
  }, [calculations]);
  return (
    <div className={`flex justify-around w-full my-2 pt-8 px-10 h-[90%]`}>
      <div className=" rounded  ">
        <h2 className="text-2xl font-action font-bold mb-4">
          Calculate Tree Based CO2 Reductions
        </h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              Number of Trees per Hectare
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={treesPerHectare}
              onChange={(e) => setTreesPerHectare(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              Afforestation Area (Hectares)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={areaHectares}
              onChange={(e) => setAreaHectares(e.target.value)}
              required
            />
          </div>

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
          Afforestation List
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
                <strong>Number of Trees per Hectare: </strong> {calc.treesPerHectare}{" "} Trees
              </div>
              <div>
                <strong>Afforestation Area: </strong> {calc.areaHectares}{" "} Hectares
              </div>
              <div>
                <strong>CO2 Emissions Reduced: </strong>{" "}
                {parseFloat(calc.reduction).toFixed(2)} Tonnes
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
            Total Reductions ={" "}
            {parseFloat(
              calculations.reduce((total, object) => {
                return total + parseFloat(object.reduction);
              }, 0)
            ).toFixed(3)}{" "}
            <span className="text-nowrap"> tonnes </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Afforestation;