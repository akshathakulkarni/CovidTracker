import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import styles from './Chart.module.css';

//register all components before use
Chart.register(...registerables);

const Charts = ({data: { confirmed, recovered, deaths }, country }) => {
  const [ dailyData, setDailyData ] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      //this data is used only for global data and represented using Line Chart
      setDailyData(await fetchDailyData());
    };
    console.log(dailyData);
    fetchAPI();
  }, []);
  
  const lineChart = (
    dailyData.length 
    ? (
      <Line 
      data={{
        // loop over dailyData and return date as labels
        labels: dailyData.map(({ date }) => date),
        datasets: [{
          label: 'Infected',
          data: dailyData.map(({ confirmed }) => confirmed),
          borderColor: '#3333ff',
          fill: true
        }, {
          label: 'Deaths',
          data: dailyData.map(({ deaths }) => deaths),
          borderColor: 'red',
          fill: true
        }]
      }}
    />
    ) : null

  );

  const barChart = (
    confirmed 
    ? (
      <Bar 
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
          data: [ confirmed.value, recovered.value, deaths.value]
        }],
        
      }}
      options={{
        legend: {display: false},
        title: { display: true, text: `Current state in ${country}`}
      }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Charts;