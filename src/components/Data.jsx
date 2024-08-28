import React, { useRef, useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import graph_data from "../constants/home.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Colors,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  LineElement,
  PointElement,
  Legend,
  Colors
);

function Data() {
  const chartRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentChartRef = chartRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (currentChartRef) {
      observer.observe(currentChartRef);
    }
    return () => {
      if (currentChartRef) {
        observer.unobserve(currentChartRef);
      }
    };
  }, []);

  return (
    <div ref={chartRef} className="min-h-screen flex flex-col m-3 gap-2">
      <div className="bg-white flex justify-between p-2 border-2 border-red-200 w-full">
        <div className="w-full">
          {isVisible && (
            <Bar
              data={graph_data.first.data}
              options={graph_data.first.options}
            />
          )}
        </div>
        <div className="p-3 w-3/4 flex flex-col justify-center gap-2">
          <h2 className="text-3xl font-heading font-semibold ">
            India and its Share
          </h2>
          <p className="text-justify">
            India plays a significant role in the global coal production
            landscape, contributing 10.35% to the world's total output. As the
            second-largest producer of coal after China, India's production is
            driven by its growing energy needs and its reliance on coal as a
            primary source of energy. The country has a vast reserve base, and
            coal remains a critical component of India's energy strategy,
            powering thermal power plants and supporting various industrial
            activities.
          </p>
        </div>
      </div>
      <div className="bg-white flex justify-between p-2 border-2 border-red-200 ">
        <div className="p-3 w-3/4 flex flex-col gap-2 justify-center">
          <h2 className="text-3xl font-heading font-semibold ">
            India's Import Export
          </h2>
          <p className="text-justify">
            India plays a significant role in the global coal production
            landscape, contributing 10.35% to the world's total output. As the
            second-largest producer of coal after China, India's production is
            driven by its growing energy needs and its reliance on coal as a
            primary source of energy. The country has a vast reserve base, and
            coal remains a critical component of India's energy strategy,
            powering thermal power plants and supporting various industrial
            activities.
          </p>
        </div>
        <div className="w-full">
          {isVisible && (
            <Line
              data={graph_data.second.data}
              options={graph_data.second.options}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Data;
