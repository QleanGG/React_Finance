import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
const initialChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(0, 99, 132, 0.2)',
            borderColor: 'rgba(199, 99, 132, 21)',
            borderWidth: 0.5,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
}
const options = {
    maintainAspectRatio: true,
    scales: {
        // ... other scale options
    },
    plugins: {
        legend: {
            // ... legend options
        },
    },
    layout: {
        padding: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
        }
    },
    backgroundColor: 'lightGreen', 
};

const BasicChart = () => {
    const [chartData, setChartData] = useState(initialChartData);
    const changeInfo = () => {
        setChartData({
            ...chartData,
            datasets: [
                {
                    ...chartData.datasets[0],
                    data: chartData.datasets[0].data.map(key => key + Math.floor(Math.random() * 10))
                }
            ]
        })
    }
    return (
        <div style={{backgroundColor:'#20222a',width:'400px'} }>
            <Line data={chartData} options={options} />
            <button onClick={changeInfo}>Change the Data</button>
        </div>
    )
}

export default BasicChart;