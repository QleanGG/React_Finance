import axios from 'axios';

const MY_SERVER = 'http://127.0.0.1:5000';

export const fetchStockData = async (tickerSymbol) => {
  try {
    const response = await axios.post(`${MY_SERVER}/get_stock`, { ticker: tickerSymbol });
    if (response.status === 200) {
      console.log('Stock data response:', response.data);
      return response.data;
    } else {
      console.error('Unexpected status code:', response.status);
      return null; // or throw an error
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null; // or throw an error
  }
};
