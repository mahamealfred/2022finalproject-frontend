
import React from 'react'
import './pieChart.css';
import 'chart.js/auto';
import {Pie} from 'react-chartjs-2'
import  {useEffect,useState} from "react";
import axios from "axios";

function PieChart() {
  const [data, setData] = useState({datasets:[]});

  useEffect(()=>{
     async function fetchData(){
      const labelSet = [];
      const dataSet1 = [];
      const dataSet2 = [];
      const genderSet=[];
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
        .get(`http://localhost:8000/results/percentageordinaryresultsbasedongender`, {
          headers: headers,
        })
        .then(function (response) {
          const res = response.data.data;
          return res;
        })
        .then(function (res) {
          labelSet.push( "Assessments Results ");
          const numberOfMale=parseInt(res[0].studentCount);
          const numberofFemale =  parseInt( res[1].studentCount);
          const resCount=numberOfMale + numberofFemale;
          for (const val of res) {
            // const resCount = val.AssessmentCount;
            const genderValue=val['student.gender']
            const finalTotal =Math.round((val.total / (resCount * 100)) * 100);
            dataSet1.push(finalTotal);
            genderSet.push(genderValue)
          }
          console.log("lebal set...:", res);
          setData({
            labels:genderSet,
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
     }
     fetchData();
  },[])



  return (
    <div className="pieChart">
    <span className="pieChartTitle">Students Performance Based on Gender In S3</span>
    <Pie
    data={data}
    ></Pie>
    </div>
  );
}

export default PieChart;
