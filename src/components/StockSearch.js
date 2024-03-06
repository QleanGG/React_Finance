import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import stockList from '../json/nasdaq_listed.json';
import './StockSearch.css';

function StockSearch() {
  const [inputValue, setInputValue] = useState('');
  const [tickerSymbol, setTickerSymbol] = useState('');
  const [error, setError] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const filtered = stockList.filter(item => 
      item["Company Name"].toLowerCase().includes(inputValue.toLowerCase()) || item.Symbol.toLocaleLowerCase().includes(inputValue.toLowerCase)
    ).slice(0, 20); // Limit the number of options displayed
    setFilteredOptions(filtered);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const matchedStock = stockList.find(item =>
      item["Company Name"] === e.target.value || item.Symbol === e.target.value.split(' - ')[1]
    );

    if (matchedStock) {
      setTickerSymbol(matchedStock.Symbol);
    } else {
      const isTickerFormat = /^[A-Z0-9]+$/.test(e.target.value);
      setTickerSymbol(isTickerFormat ? e.target.value : '');
    }
  };

  const handleSearch = () => {
    if (!tickerSymbol) {
      setError('Company not found, please try another one');
      return;
    }

    navigate(`/stocks/${tickerSymbol}`); // Navigate to the detailed stock page
  };

  return (
    <div className='stock-search-container'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Ticker or Company Name"
        list="stock-datalist"
      />
      <datalist id="stock-datalist">
        {filteredOptions.map((item, index) => (
          <option key={index} value={`${item["Company Name"]} - ${item.Symbol}`} />
        ))}
      </datalist>

      <button className='search-btn' onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default StockSearch;
