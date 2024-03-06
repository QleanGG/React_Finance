import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStockData } from "../services/stockService";
import StockChart from "./StockChart";
import { addToWatchList } from "../services/watchlistService";
import { useAuth } from "../AuthContext"; // Import the AuthContext

const StockDetail = () => {
  const { symbol } = useParams();
  const { currentUser } = useAuth(); // Access the currentUser from the AuthContext
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStockData = async () => {
      try {
        setLoading(true);
        const data = await fetchStockData(symbol);
        if (data) {
          setStockData(data);
          setError("");
        } else {
          setError("No stock data found.");
        }
      } catch (err) {
        setError("Failed to fetch stock data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStockData();
  }, [symbol]);

  const handleAddToWatchList = async () => {
    try {
      const token = currentUser ? currentUser.token : null; // Get the token from currentUser
      if (!token) {
        console.error("User not authenticated"); // Handle unauthenticated user
        return;
      }
      const added = await addToWatchList(symbol, token);
      if (added) {
        console.log("Added to watch list");
      } else {
        console.error("Failed to add to watch list");
      }
    } catch (error) {
      console.error("Failed to add to watch list", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stockData) return <div>Stock data not available.</div>;

  return (
    <div>
      {stockData.companyName !== "Unknown Company" ? (
        <div className="stock-info">
          <h3>Stock Information for: {stockData.companyName}</h3>
          <h3>Ticker: {stockData.ticker}</h3>
          <h4>Current Price: ${stockData.currentPrice}</h4>
          <StockChart className="stock-chart" data={stockData} />
          <button className="search-btn" onClick={handleAddToWatchList}>
            Add to Watch List
          </button>
        </div>
      ) : (
        <div>
            <h1>Can't find Stock</h1>
        </div>
      )}
    </div>
  );
};

export default StockDetail;
