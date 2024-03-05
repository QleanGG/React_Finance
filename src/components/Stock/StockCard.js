import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import './StockCard.css'

const StockCard = ({ companyName, ticker, currentPrice }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/stocks/${ticker}`);
  }
  return (
    <div className="col-sm-4 mb-4 click" onClick={handleClick}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {companyName} ({ticker})
          </h5>
          <p className="card-text">${currentPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
