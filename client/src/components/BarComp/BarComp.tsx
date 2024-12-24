import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { IBarData } from "../../types/Terrorism";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);


const BarChart = ({datasets, labelName}:{datasets:IBarData[], labelName:string}) => {
  const data = {
    labels: datasets.map((item) => item.label), 
    datasets: [
      {
        label: labelName,
        backgroundColor: 'rgba(31, 181, 201, 0.66)',
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
        data: datasets.map((item) => item.data)

      }
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: labelName,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart