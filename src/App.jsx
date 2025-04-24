import React from 'react';
import FundingBarChart from './Components/FundingBarChart';
import IndustryTrendChart from './Components/IndustryTrendChard'; // Corrected file name

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
