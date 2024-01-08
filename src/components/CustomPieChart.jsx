// CustomPieChart.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CustomPieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4CAF50",
              "#E7E9ED",
            ], // Colors for each part
            borderColor: "white",
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.formattedValue;
                const percentage = context.raw * 100;
                return `${label}: ${value} (${percentage.toFixed(2)}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="flex items-center py-4">
      <div>
        <canvas
          ref={chartRef}
          className="h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] "
        />
      </div>
      <div style={{ marginLeft: "20px" }}>
        <p>Total Users: {data.details.totalUsers}</p>
        {data.labels.map((label, index) => (
          <p className="p-1" key={index}>
            {label}: {data.details[label.toLowerCase()]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
