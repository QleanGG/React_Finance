import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './StockChart.css'

const StockChart = ({ data }) => {
  // State to manage the selected period
  const [selectedPeriod, setSelectedPeriod] = useState("1mo");

  // Data and labels states
  const [prices, setPrices] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (data && data.historicalData && data.historicalData[selectedPeriod]) {
      // Process the historical data for the selected period
      const historicalData = data.historicalData[selectedPeriod];
      const processedPrices = historicalData.map(item => item.close || item.Close); // Adjust based on your data structure
      const processedLabels = historicalData.map((item, index) => `Day ${index + 1}`);

      setPrices(processedPrices);
      setLabels(processedLabels);
    }
  }, [data, selectedPeriod]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Stock Price for ${selectedPeriod}`,
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div chart-canvas style={{ width: '1000px' }}>
        <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}>
          <option value="1d">1 Day</option>
          <option value="1wk">1 Week</option>
          <option value="1mo">1 Month</option>
          <option value="1y">1 Year</option>
        </select>
        <Line data={chartData} options={options} />
      </div>
    </div>

  );
}

export default StockChart;
