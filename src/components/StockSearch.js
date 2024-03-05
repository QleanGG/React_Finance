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
      item["Company Name"].toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 50); // Limit the number of options displayed
    setFilteredOptions(filtered);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const stock = stockList.find(item => item["Company Name"] === e.target.value);
    if (stock) {
      setTickerSymbol(stock.Symbol);
    }
  };

  const handleSearch = () => {
    if (!tickerSymbol) {
      setError('Please select a valid company from the list');
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
        placeholder="Enter Company Name"
        list="stock-datalist"
      />
      <datalist id="stock-datalist">
        {filteredOptions.map((item, index) => (
          <option key={index} value={item["Company Name"]} />
        ))}
      </datalist>

      <button className='search-btn' onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default StockSearch;
