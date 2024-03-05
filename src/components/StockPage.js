import React from 'react';
import StockChart from './StockChart';
import ExploreStocks from './ExploreStocks';
import StockSearch from './StockSearch';
import { useNavigate } from 'react-router-dom';

const StockPage = () => {
  const chartData = {
    
  };

  return (
    <div>
      <ExploreStocks />
      <StockSearch />
    </div>
  );
};

export default StockPage;
