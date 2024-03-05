import axios from 'axios';

const MY_SERVER = 'http://127.0.0.1:5000';

const addToWatchList = async (symbol, token) => {
    try {
        console.log(token);
        const response = await axios.post(`${MY_SERVER}/watch_history`, { query: symbol }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 201) {
            console.log('Added to watch list');
            return true; 
        } else {
            console.error('Failed to add to watch list');
            return false; 
        }
    } catch (error) {
        console.error('Failed to add to watch list', error);
        return false; 
    }
};

export { addToWatchList };