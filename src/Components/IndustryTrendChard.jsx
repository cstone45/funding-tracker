import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function IndustryTrendChart() {
  const [fundingData, setFundingData] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch funding data
    fetch('/funding.json')
      .then((response) => response.json())
      .then((data) => {
        setFundingData(data);

        // Group funding by industry and year
        const fundingByIndustry = data.reduce((acc, item) => {
          if (!acc[item.industry]) acc[item.industry] = {};
          acc[item.industry][item.year] = (acc[item.industry][item.year] || 0) + item.amount;
          return acc;
        }, {});

        // Prepare chart data
        const labels = [...new Set(data.map((item) => item.year))].sort();
        const datasets = Object.keys(fundingByIndustry).map((industry) => ({
          label: industry,
          data: labels.map((year) => fundingByIndustry[industry][year] || 0),
          fill: false,
          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        }));

        setChartData({
          labels,
          datasets,
        });
      })
      .catch((error) => console.error('Error fetching funding data:', error));
  }, []);

  return (
    <div>
      <h2>Funding Trends by Industry</h2>
      <Line data={chartData} />
    </div>
  );
}

export default IndustryTrendChart;