import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const ChartTemp = ({ value }) => {

  // Формирование массива значений часов для подписи горизонтальной оси графика

  const hours = value.reduce((acc, _, index) => {
    if (String(index).length === 2) {
      acc.push(`${index}:00`);
    } else {
      acc.push(`0${index}:00`);
    }

    return acc;
  }, []);

   // Формирование массива значений температур для отрисовки графика
  
  const dataTemp = value.map(item => item.temp);

  const lineChartData = {
    labels: hours,
    datasets: [
      {
        data: dataTemp,
        borderColor: '#3333ff',
        fill: false,
        label: 't°C',
        lineTension: 0.5,
        pointBorderColor: 'white',
        pointBackgroundColor: 'blue',
        pointRadius: 7,
        pointHoverRadius: 15,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Суточная температура, °C',
        fontSize: '40px',
        color: 'black',
      },
    },
  };

  return (
    <Line width={160} height={50} options={options} data={lineChartData} />
  );
};
export default ChartTemp;

ChartTemp.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired
}

