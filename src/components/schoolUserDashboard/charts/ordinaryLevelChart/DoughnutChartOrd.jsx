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
            const finalTotal =( (val.total / (resCount * 100)) * 100).toFixed(2);
            dataSet1.push(finalTotal);
          }
          console.log("lebal set...:", res);
          setData({
            labels: [
            "Chemistry Assessment %",
            "Kinyarwanda Assessment %",
            "Social Study %",
          ],
          datasets: [
            {
              label: labelSet,
              data: dataSet1,
              backgroundColor: ["red", "green", "yellow", "pink", "blue"],
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
