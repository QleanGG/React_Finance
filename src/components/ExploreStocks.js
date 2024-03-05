import React, { useState, useEffect } from 'react';
import { fetchStockData } from '../services/stockService';
import StockCard from './Stock/StockCard';
import stockList from '../json/nasdaq_listed.json';



const getRandomStocks = (stocks, count = 3) => {
  const shuffled = [...stocks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ExploreStocksPage = () => {
  const [randomStocksData, setRandomStocksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    const loadRandomStocksData = async () => {
      setIsLoading(true); // Start loading
      const randomStocks = getRandomStocks(stockList, 3);
      try {
        const stocksData = await Promise.all(
          randomStocks.map((stock) => fetchStockData(stock.Symbol))
        );
        setRandomStocksData(stocksData);
      } catch (error) {
        console.error("Failed to fetch stock data for random stocks", error);
      } finally {
        setIsLoading(false); // Stop loading once data is fetched or an error occurs
      }
    };

    loadRandomStocksData();
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Explore Stocks</h2>
      <div className="row">
        {randomStocksData.length > 0 ? (
          randomStocksData.map((stockData, index) => (
            <StockCard
              key={index}
              companyName={stockData.companyName}
              ticker={stockData.ticker}
              currentPrice={stockData.currentPrice}
            />
          ))
        ) : (
          <p>No stock data available.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreStocksPage;




