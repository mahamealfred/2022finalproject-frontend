
import './pieChart.css';
import 'chart.js/auto';
import {Pie} from 'react-chartjs-2'
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function PieChart() {
  const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
    async function fetchData() {
      const labelSet = [];
      const dataSet1 = [];
      const dataSet2 = [];

      const genderSet = [];
      const token = await localStorage.getItem("x-access-token");
      let headers;
      if (token) {
        headers = {
          "Content-Type": "application/json",
          token: `${token}`,
        };
      } else {
        headers = {
          "Content-Type": "application/json",
        };
      }

      await axios
        .get(
          `http://localhost:8000/results/ordinarylevelpercentagemarks`,
          {
            headers: headers,
          }
        )
        .then(function(response) {
          const res = response.data.data;
          return res;
        })
        .then(function(res) {
          labelSet.push("Assessments results ");
          const numberOfMale=parseInt(res[0].studentCount);
          const numberofFemale =  parseInt( res[1].studentCount);
          const resCount=numberOfMale + numberofFemale;
          const maleTotal=parseInt(res[0].total);
          const femaleTotal=parseInt(res[1].total);
          const parcentageOfMaleandFemale=((parseInt(maleTotal)+parseInt(femaleTotal))/(resCount*100)*100).toFixed(2);
          const parcentageMale=((parseInt(maleTotal)/(resCount*100))*100).toFixed(2)
          const parcentageFemale=((parseInt(femaleTotal)/(resCount*100))*100).toFixed(2)
          
          for (const val of res) {
            const genderValue = val["student.gender"];
            const total=0
            if(genderValue=="male"){
              total=((parcentageMale/parcentageOfMaleandFemale)*100).toFixed(2)
             //total=1
              dataSet1.push(total);
            }
            else{
              total=((parcentageFemale/parcentageOfMaleandFemale)*100).toFixed(2);
            // total=2
              dataSet1.push(total);
            }         
            genderSet.push(genderValue);
          }
          setData({
            labels: genderSet,
            datasets: [
              {
                label: "",
                data: dataSet1,
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
                options: {
                  layout: {
                    padding: 20
                },
                  animation: true,
                  plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              },
                borderWidth: 1
              }]
            }
        );
          console.log("arrData", dataSet1, dataSet2, labelSet);
        })
        .catch(function(error) {
          console.log("error", error);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="pieChart">
    <span className="pieChartTitle">S3 Students performance based on gender </span>
    
    <Pie
    data={data}
    >

    </Pie>
    </div>
  );
}

export default PieChart;
