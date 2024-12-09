import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CountryData } from "../pages/CountryDetails";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartProps {
  countryData: CountryData;
}

export default function Chart({ countryData }: ChartProps) {
  const chartData = {
    labels: countryData.populationCounts.map((entry) => entry.year),
    datasets: [
      {
        label: "Population", // You can remove this label if you prefer
        data: countryData.populationCounts.map((entry) => entry.value),
        fill: false,
        borderColor: "#6563FF",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true, // Ensure the chart is responsive
    maintainAspectRatio: true, // Optionally, prevent the aspect ratio from being maintained
  };

  return (
    <div className="mt-4" style={{ maxWidth: "650px", width: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
