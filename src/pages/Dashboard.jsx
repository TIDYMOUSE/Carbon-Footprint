import React from "react";
import { Bar } from "react-chartjs-2";
import data from "../constants/dash.json";
import { annualCO2inMilTonnes } from "../utils/emission";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const coalTypes = Object.keys(data);

  // Calculate emissions for each coal type
  const emissionData = coalTypes.map((coalType) => {
    const {
      yearlyProduction,
      exclusionFactor,
      conversionFactorTJ_kt,
      co2EmissionFactor_kg_CO2_TJ,
    } = data[coalType];

    return annualCO2inMilTonnes(
      yearlyProduction,
      coalType,
      exclusionFactor,
      conversionFactorTJ_kt,
      co2EmissionFactor_kg_CO2_TJ
    );
  });

  const chartData = {
    labels: coalTypes,
    datasets: [
      {
        label: "CO2 Emission in Million Tonnes",
        data: emissionData,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  let totalEmission = 0;
  Object.keys(data).forEach((coalType) => {
    const {
      yearlyProduction,
      exclusionFactor,
      conversionFactorTJ_kt,
      co2EmissionFactor_kg_CO2_TJ,
    } = data[coalType];

    totalEmission += annualCO2inMilTonnes(
      yearlyProduction,
      coalType,
      exclusionFactor,
      conversionFactorTJ_kt,
      co2EmissionFactor_kg_CO2_TJ
    );
  });

  return (
    <div className="flex flex-col gap-4 w-full bg-background min-h-screen p-5">
      {/* CO2 Emission Section */}
      <div className="flex flex-row-reverse gap-3">

        <section className="w-full flex">
          <div className="flex w-full bg-white p-5 rounded-md shadow-md">
            <div className="w-1/2 h-[350px]">
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            
          <section className="w-1/2 bg-white p-5 rounded-md">
          <h2 className="text-2xl font-semibold mb-3">Key Metrics</h2>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-background rounded-md">
              <h3 className="text-xl font-semibold">Total Emissions</h3>
              <p>{parseFloat(totalEmission).toFixed(3)} million Tonnes</p>
            </div>
            <div className="p-4 bg-background rounded-md">
              <h3 className="text-xl font-semibold">Progress Towards Carbon Neutrality</h3>
              <p>Currently at 25% of target</p>
            </div>
          </div>
        </section>

          </div>
        </section>
      </div>

      {/* Overview Section */}
      <section className="w-full bg-white p-5 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-3">Overview</h2>
        <p>
          This section provides a summary of the mine's carbon footprint,
          including a breakdown of CO2 emissions by coal type and key metrics
          related to carbon neutrality.
        </p>
      </section>

      {/* Recent Activities Section */}
      <section className="w-full bg-white p-5 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-3">Recent Activities</h2>
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-background rounded-md">Updated emission data for Coal Type A</div>
          <div className="p-3 bg-background rounded-md">Added new entry for Mine B</div>
          <div className="p-3 bg-background rounded-md">Reviewed carbon neutrality progress</div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
