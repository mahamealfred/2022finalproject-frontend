import "./pieChart.css";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PieChart(resultsData) {
  const [data, setData] = useState({ datasets: [] });
  console.log("examId Id resultsData", resultsData);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const id = params.id;
      const labelSet = [];

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

      const res = resultsData;

      console.log("assessmentss detailes", res);
      labelSet.push("Assessments Analysis");
      for (const key in res) {
        let marks = res[key].marks;
        let totalNumberStudents = res.length;
        console.log("All students", totalNumberStudents);
        if (marks < 25) {
          marksbetween0and25Counter = marksbetween0and25Counter + 1;
          marksBetween0and25 = Math.round(
            (marksbetween0and25Counter / totalNumberStudents) * 100
          );
          //break;
        } else if (marks <= 50) {
          marksbetween25and50Counter = marksbetween25and50Counter + 1;
          marksBetween25and50 = Math.round(
            (marksbetween25and50Counter / totalNumberStudents) * 100
          );
          //break;
        } else if (marks <= 75) {
          marksbetween50and75Counter = marksbetween50and75Counter + 1;
          marksBetween50and75 = Math.round(
            (marksbetween50and75Counter / totalNumberStudents) * 100
          );
          // break;
        } else {
          marksbetween75and100Counter = marksbetween75and100Counter + 1;
          marksBetween75and100 = Math.round(
            (marksbetween75and100Counter / totalNumberStudents) * 100
          );
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
      console.log("data set", data);
      data.map((d) => {
        nameSet.push(d.name);

        valueSet.push(d.value);
        console.log("value", d.value);
      });
      setData({
        labels: nameSet,

        datasets: [
          {
            label: "",
            data: valueSet,
            backgroundColor: ["red", "green", "yellow", "pink", "blue"],
            barThickness: 12,
          },
        ],
      });
    }
    fetchData();
  }, []);
  return (
    <div className="pieChart">
      <span className="pieChartTitle">Students Performance Based In {}</span>
      <div className="chart">{/* <Pie
    data={data}
    >

    </Pie> */}</div>
    </div>
  );
}

export default PieChart;
