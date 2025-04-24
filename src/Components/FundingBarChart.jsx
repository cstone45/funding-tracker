import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function FundingBarChart() {
  const [fundingData, setFundingData] = useState([]);
  const [chartData, setChartData] = useState(null); // Initialize as null

  useEffect(() => {
    // Fetch funding data
    fetch('/funding.json')
      .then((response) => response.json())
      .then((data) => {
        setFundingData(data);

        // Calculate total funding per year
        const fundingByYear = data.reduce((acc, item) => {
          acc[item.year] = (acc[item.year] || 0) + item.amount;
          return acc;
        }, {});

        // Prepare chart data
        setChartData({
          labels: Object.keys(fundingByYear),
          datasets: [
            {
              label: 'Total Funding ($)',
              data: Object.values(fundingByYear),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error('Error fetching funding data:', error));
  }, []);

  if (!chartData) {
    return <p>Loading chart...</p>; // Render a loading message while chartData is null
  }

  return (
    <div>
      <h2>Total Startup Funding by Year</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default FundingBarChart;