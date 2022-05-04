
import React from 'react'
import './lineChart.css';
import 'chart.js/auto';
import {Line} from 'react-chartjs-2'
import { useEffect, useState } from "react";
import axios from "axios";
function LineChart() {
  const [data, setData] = useState({datasets:[]});
  useEffect(() => {
    const fetchData = async () => {
      const labelSet = [];
      const dataSet1 = [];
      const dataSet2 = [];
      const schoolSet=[]
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
        .get(`http://localhost:8000/results/primaryschoolperformanceindistrict`, {
          headers: headers,
        })
        .then(function (response) {
          const res = response.data.data;
          return res;
        })
        .then(function (res) {
          labelSet.push(" Ordinary Level Schools Performance ");
          for (const val of res) {
            
            const schoolName=val['school.name'] +"%";
           // const finalTotal = ((val.total / (resCount * 100)) * 100).toFixed(2);
           const percentageResult=val['results.avarage']
            dataSet1.push(percentageResult);
            schoolSet.push(schoolName)
          }
        
          setData({
            labels:schoolSet,
          datasets: [
            {
              label: labelSet,
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
        .catch(function (error) {
          console.log("error", error);
        });
    };
    fetchData();
   
    
  }, []);
  return (
    <div className="lineChart">
    <span className="lineChartTitle">P6 School Performance In All Assessment</span>
    
    <Line
    data={data }
    
    >
    </Line>

    </div>
  );
}

export default LineChart;
