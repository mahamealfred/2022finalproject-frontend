import React from 'react';
import "./radarChart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export let dataOrdi=[]
function RadarChart() {
    const [data, setData] = useState({ datasets: [] });

  useEffect(() => {
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
        .get(`http://localhost:8000/results/ordinarylevelresultsindistrict`,
        {
          headers: headers,
        }
        )
        .then(function(response) {
          const res = response.data.data;
          console.log("ordinary resp..",res)
          return res;
        })
        .then(function(res) {
         
          for (const key in res) {
            let totalMarksmarks = res[key].total;
            let counter=res[key].AssessmentCount;
            let percentangeResult=(totalMarksmarks/(counter*100))*100
            let totalNumberStudents = res.length;

            if (percentangeResult < 25) {
              marksbetween0and25Counter = marksbetween0and25Counter + 1;
              marksBetween0and25 =(
                (marksbetween0and25Counter / totalNumberStudents) * 100
              ).toFixed(2);
              //break;
            } else if (percentangeResult <= 50) {
              marksbetween25and50Counter = marksbetween25and50Counter + 1;
              marksBetween25and50 =(
                (marksbetween25and50Counter / totalNumberStudents) * 100
              ).toFixed(2);
              //break;
            } else if (percentangeResult <= 75) {
              marksbetween50and75Counter = marksbetween50and75Counter + 1;
              marksBetween50and75 =(
                (marksbetween50and75Counter / totalNumberStudents) * 100
              ).toFixed(2);
              // break;
            } else {
              marksbetween75and100Counter = marksbetween75and100Counter + 1;
              marksBetween75and100 =(
                (marksbetween75and100Counter / totalNumberStudents) * 100
              ).toFixed(2);
              // break;
            }
          }
           dataOrdi = [
            { name: "Marks with range 0-25 ", value: marksBetween0and25 },
            {
              name: "Marks with range 26-50",
              value: marksBetween25and50,
            },
            {
              name: "Makrs with range 51-75",
              value: marksBetween50and75,
            },
            {
              name: "Makrs with range 76-100",
              value: marksBetween75and100 ,
            },
          ];
          dataOrdi.map((d) => {
            nameSet.push(d.name);

            valueSet.push(d.value);
            console.log("value", d.value);
          });

          setData({
            labels: nameSet,
            datasets: [
              {
                label: "Ordinary Level Students Results In All Assessment :%",
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
          }
          });
        })

        .catch(function(error) {
          console.log("error", error);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="radarChart">
    <span className="radarChartTitle">S3 Students Performance In All Assessment</span>
      
      <Radar
        data={data}
        options={{
          tooltips: {
            model: "index",
            callbacks: {
              label: function (toolTipItem) {
                return "Revenue: %" + toolTipItem.data;
              },
            },
          }
          
          }}
        
      ></Radar>
    </div>
  )
}

export default RadarChart