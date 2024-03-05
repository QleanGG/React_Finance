import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext'; 
import StockCard from '../Stock/StockCard';

const ProfilePage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const { currentUser } = useAuth(); // Assuming your AuthContext provides currentUser

  useEffect(() => {
    // Fetch the user's watchlist history after component mounts
    const fetchWatchlist = async () => {
      if (!currentUser) return; // Check if user is logged in
      try {
        const response = await axios.get(`http://localhost:5000/watch_history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Include the JWT token
          },
        });
        console.log(response.data);
        setWatchlist(response.data); // Set watchlist data to state
      } catch (error) {
        console.error("Failed to fetch watchlist", error);
      }
    };

    fetchWatchlist();
  }, [currentUser.username]);

  return (
    <div>
      <h2>{currentUser.username}'s Watchlist</h2>
      <div className="row">
        {/* Map each stock in the watchlist to a StockCard component */}
        {watchlist.map((stock, index) => (
          <StockCard
            key={index}
            companyName={stock.companyName}
            ticker={stock.query_text}
            currentPrice={stock.currentPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
