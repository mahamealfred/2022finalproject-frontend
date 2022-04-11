
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
          labelSet.push("Assessments Results ");
          for (const val of res) {
            const resCount = val.AssessmentCount;
            const genderValue = val["student.gender"];
            const finalTotal = ((val.total / (resCount * 100)) * 100).toFixed( 2);
            dataSet1.push(finalTotal);

            genderSet.push(genderValue);
          }

          setData({
            labels: genderSet,

            datasets: [
              {
                label: "",
                data: dataSet1,
                backgroundColor: ["red", "green", "yellow", "pink", "blue"],
                barThickness: 12,
              },
            ],
          });
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
    <span className="pieChartTitle">Students Performance Based on Gender In S3</span>
    <Pie
    data={data}
    >

    </Pie>
    </div>
  );
}

export default PieChart;
