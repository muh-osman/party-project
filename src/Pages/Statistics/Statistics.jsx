// React
import { useEffect, useState } from "react";
// chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// Sass
import css from "./Statistics.module.scss"



ChartJS.register(ArcElement, Tooltip, Legend);




export default function Statistics() {

  const [userNum, setUserNum] = useState({
    attended: 12,
    notAttend: 19
  })

   const data = {
    labels: ['Attended', 'Not attend'],
    datasets: [
      {
        label: '',
        data: [userNum.attended, userNum.notAttend],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
  
        ],
        borderWidth: 2,
      },
    ],
  };


  useEffect(() => {
    // // Fetch data from an API
    // fetch("https://api.example.com/data")
    //   .then(response => response.json())
    //   .then(data => {
    //     // Update the data array with fetched data
    //     setUserNum(data);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching data:", error);
    //   });
  }, []);


  return (
    <div className={css.container}>
      <div className={css.box}>
          <Doughnut data={data} options={{ responsive: true }} />
      </div>
    </div>
  )
}