import React from "react";
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
import { Line } from "react-chartjs-2";
import { gasPrices, getCost } from "../pages";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  layout: {
    padding: 20,
  },
  interaction: {
    intersect: false,
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Cost (ETH)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Gas Price (gwei)",
      },
    },
  },
};

const Plot = ({ numGas }: { numGas: string }) => {
  const data = gasPrices.map((price) => ({
    x: price,
    y: parseFloat(getCost(numGas, price.toString())),
  }));

  return (
    <div className="plot">
      <Line
        options={options}
        data={{
          labels: gasPrices,
          datasets: [{ label: "Cost (ETH)", data }],
        }}
      />
    </div>
  );
};

export default Plot;
