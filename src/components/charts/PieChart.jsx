
import './pieChart.css';
import 'chart.js/auto';
import {Pie} from 'react-chartjs-2'
import React from 'react'
function PieChart() {
  return (
    <div className="pieChart">
    <span className="pieChartTitle">Students Performance Based on Gender</span>
    
    <Pie
    data={{
      labels:['Male','Female'],
      datasets:[
        {
      
        data:[57,43],
        backgroundColor:['red','green'],
       
      },
     
    ]

    }
    }
    >

    </Pie>
    </div>
  );
}

export default PieChart;
