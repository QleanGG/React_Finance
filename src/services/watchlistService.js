import axios from 'axios';
import { MY_SERVER } from './server';

const addToWatchList = async (symbol, token) => {
    try {
        const response = await axios.post(`${MY_SERVER}/watch_history`, { query: symbol }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 201) {
            // console.log('Added to watch list');
            return true; 
        } else {
            // console.error('Failed to add to watch list');
            return false; 
        }
    } catch (error) {
        // console.error('Failed to add to watch list', error);
        return false; 
    }
};

export { addToWatchList };
