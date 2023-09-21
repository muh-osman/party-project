// React
import { useEffect, useState } from "react";
// chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// Sass
import css from "./Statistics.module.scss"
// MUI
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



ChartJS.register(ArcElement, Tooltip, Legend);




export default function Statistics() {

  const [userNum, setUserNum] = useState({
    attended: 170,
    notAttend: 30
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

        <div className={css.card_box}>

            <Card sx={{ width: 175, height: 175, backgroundColor: "rgba(255, 206, 86, 1)" }}>
          <CardActionArea sx={{height: "100%"}}>
            <CardContent sx={{height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <Typography variant="h4" component="div">
                {userNum.attended + userNum.notAttend}
              </Typography>
              <Typography variant="h6" color="text.secondary">
              All
          </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

            <Card sx={{ width: 175, height: 175, backgroundColor: "#36A2EB" }}>
          <CardActionArea sx={{height: "100%"}}>
            <CardContent sx={{height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <Typography variant="h4" component="div">
                {userNum.attended}
              </Typography>
              <Typography variant="h6" color="text.secondary">
              Attended
          </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

            <Card sx={{ width: 175, height: 175, backgroundColor: "#FF6384" }}>
          <CardActionArea sx={{height: "100%"}}>
            <CardContent sx={{height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <Typography variant="h4" component="div">
                {userNum.notAttend}
              </Typography>
              <Typography variant="h6" color="text.secondary">
              Not Attend
          </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        </div>

        <div className={css.box}>
          <Doughnut data={data} options={{ responsive: true }} />
       </div>

    </div>
  )
}