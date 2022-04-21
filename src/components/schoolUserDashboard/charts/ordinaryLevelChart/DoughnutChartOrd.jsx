import React from 'react'
import "./doughnut.css";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";


function DoughnutChart() {
  const [data, setData] = useState({datasets:[]});
  useEffect(() => {
    const fetchData = async () => {
      const labelSet = [];
      const dataSet1 = [];
      const dataSet2 = [];
      const examSet=[];
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
        .get(`http://localhost:8000/results/percentagemarksordinaryresults`, {
          headers: headers,
        })
        .then(function (response) {
          const res = response.data.data;
          return res;
        })
        .then(function (res) {
          labelSet.push(res.length + "  Available Assessment Results ");
          for (const val of res) {
            const resCount = val.AssessmentCount;
            const examName=val['exam.Name'];
            const finalTotal =( (val.total / (resCount * 100)) * 100).toFixed(2);
            dataSet1.push(finalTotal);
            examSet.push(examName);
          }
          console.log("lebal set...:", res);
          setData({
            labels: examSet ,
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
              barThickness: 12,
            },
          ],
        });
          console.log("arrData", dataSet1, dataSet2, labelSet);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    };
    fetchData();
   
    
  }, []);
  
  
  return (
    <div className="doughnutChart">
      <span className="doughnutChartTitle">Student Performance S3</span>
      
      <Doughnut data={data}></Doughnut>
    </div>
  );
}

export default DoughnutChart;
