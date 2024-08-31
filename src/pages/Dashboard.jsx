import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import { Pie } from "react-chartjs-2";
import data from "../constants/dash.json";
import { annualCO2inMilTonnes } from "../utils/emission";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const coalTypes = Object.keys(data);

  // Calculate emissions for each coal type
  const emissionData = coalTypes.map((coalType) => {
    const {
      yearlyProduction,
      exclusionFactor,
      conversionFactorTJ_kt,
      co2EmissionFactor_kg_CO2_TJ,
    } = data[coalType];

    // Calculate CO2 emission for the current coal type
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
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  let emission = 0;
  Object.keys(data).forEach((coalType) => {
    const {
      yearlyProduction,
      exclusionFactor,
      conversionFactorTJ_kt,
      co2EmissionFactor_kg_CO2_TJ,
    } = data[coalType];

    emission += annualCO2inMilTonnes(
      yearlyProduction,
      coalType,
      exclusionFactor,
      conversionFactorTJ_kt,
      co2EmissionFactor_kg_CO2_TJ
    );
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col gap-4 w-full bg-background min-h-screen p-5">
      <section className="w-full flex gap-4 items-start">
        <div className="flex flex-col  w-1/4 space-y-4 bg-primary p-5  rounded-md shadow-md">
          <h2 className="text-white text-4xl font-semibold">CO2 EMISSION</h2>
          <h2 className="text-white text-xl">
            <span className="text-4xl font-semibold text-accent underline">
              {parseFloat(emission).toFixed(3)}
            </span>{" "}
            million Tonnes
          </h2>
        </div>

        <div className="flex justify-center items-center w-full bg-white shadow-md rounded-md h-1/3">
          <Pie data={chartData} />
        </div>
      </section>

      <section className="w-full flex flex-col bg-white p-5 shadow-md rounded-md mt-5">
        <h2 className="text-2xl font-semibold mb-3">Manage Admins</h2>

        <div className="flex w-full flex-col p-3 gap-2 rounded-md bg-background">
          <div className="p-2 bg-white rounded-md ">XDD</div>
          <div className="p-2 bg-white rounded-md ">XDD</div>
          <div className="p-2 bg-white rounded-md ">XDD</div>
          <div className="p-2 bg-white rounded-md ">XDD</div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
