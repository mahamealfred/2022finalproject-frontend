import "./barChart.css";
import React from 'react'
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";




function BarChart(resultsData) {
 
  const [data, setData] = useState({datasets:[]});
useEffect(() => {
  const labelSet = [];
  const fetchData = async () => {
    let marksbetween0and25Counter = 0;
    let marksbetween25and50Counter = 0;
    let marksbetween50and75Counter = 0;
    let marksbetween75and100Counter = 0;
    let marksBetween0and25 = 0;
    let marksBetween25and50 = 0;
    let marksBetween50and75 = 0;
    let marksBetween75and100 = 0;
    // const marksBetween50and75=0;
    const nameSet = [];
    const valueSet = [];

    const res = resultsData.data;
   
    labelSet.push("Assessments Analysis");
    for (const key in res) {
      let marks = res[key].marks;
      let totalNumberStudents = res.length;
      console.log("All students", totalNumberStudents);
      if (marks <= 25) {
        marksbetween0and25Counter = marksbetween0and25Counter + 1;
        marksBetween0and25 = (
          (marksbetween0and25Counter / totalNumberStudents) * 100
        ).toFixed(2);
        //break;
      } else if (marks>25 && marks <= 50) {
        marksbetween25and50Counter = marksbetween25and50Counter + 1;
        marksBetween25and50 = (
          (marksbetween25and50Counter / totalNumberStudents) * 100
        ).toFixed(2);
        //break;
      } else if (marks>50 &&marks <= 75) {
        marksbetween50and75Counter = marksbetween50and75Counter + 1;
        marksBetween50and75 = (
          (marksbetween50and75Counter / totalNumberStudents) * 100
        ).toFixed(2);
        // break;
      } else {
        marksbetween75and100Counter = marksbetween75and100Counter + 1;
        marksBetween75and100 = (
          (marksbetween75and100Counter / totalNumberStudents) * 100
        ).toFixed(2);
        // break;
      }
    }
    const data = [
      { name: "Marks with range 0-25 ", value: marksBetween0and25 },
      {
        name: "Marks with range 26-50 ",
        value: marksBetween25and50,
      },
      {
        name: "Makrs with range 51-75",
        value: marksBetween50and75,
      },
      {
        name: "Makrs with range 76-100 ",
        value: marksBetween75and100,
      },
    ];
  
    data.map((d) => {
      nameSet.push(d.name);

      valueSet.push(d.value);
      console.log("value", d.value);
    });
    setData({
      labels: nameSet,

      datasets: [
        {
          label: "Assessment Performance",
          data: valueSet,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
       borderColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1,
          barThickness: 12,
        },
      ],
    });
  }
  fetchData();
}, [resultsData]);
return (
  <div className="barChart">
  <span className="barChartTitle">S3 Students Performance </span>
    
    <Line
      data={data}
      options={{
        tooltips: {
          model: "index",
          callbacks: {
            label: function (toolTipItem) {
              return "Revenue: $" + toolTipItem.data;
            },
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 15,
            bottom: 0
          }
        }
        
        }}
      
    ></Line>
  </div>
);
}

export default BarChart;
