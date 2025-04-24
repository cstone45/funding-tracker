import React from 'react';
import FundingBarChart from './FundingBarChart.jsx';
import IndustryTrendChart from './IndustryTrendChart.jsx';

function App() {
  return (
    <div className="App">
      <h1>Funding Tracker</h1>
      <FundingBarChart />
      <IndustryTrendChart />
    </div>
  );
}

export default App;
