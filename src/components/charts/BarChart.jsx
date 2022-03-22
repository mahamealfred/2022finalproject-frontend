
import React from 'react'
import './pieChart.css';
import 'chart.js/auto';
import {Bar} from 'react-chartjs-2'

function BarChart() {
  return (
    <div className="barChart">
    <span className="barChartTitle">Student Performance</span>
    <Bar
    data={
      {
      labels:['Jan','Feb','Mar','Apr','May','Jun'],
      datasets:[
        {
        label:'Store 1',
        data:[100,200,300,400,500,600],
        backgroundColor:'red',
        barThickness:12
      },
      {
        label:'Store 2',
        data:[300,60,30,480,440,400],
        backgroundColor:'green',
        barThickness:12
      },
      {
        label:'Store 3',
        data:[300,200,300,400,500,600],
        backgroundColor:'yellow',
        barThickness:12
      },
      {
        label:'Store 4',
        data:[100,200,300,400,500,600],
        backgroundColor:'purple',
        barThickness:12
      },
      {
        label:'Store 5',
        data:[100,200,300,400,500,80],
        backgroundColor:'pink',
        barThickness:12
      }
    ]

    }}
    


    options={{
      tooltips:{
        model:'index',
        callbacks:{
          label:function(toolTipItem){
            return ("Revenue: $"+toolTipItem.data)
          }
        }

      },
      scales:{
        xAxes:[
         {
          gridLines:{
            color:'cyan'
          },
           scaleLabel:{
             labelString:'Months',
             display: true,
             fontColor:'blue',
             fontSize:20
           },
           ticks:{
            
            fontColor:'green'
          }
         }
        ] ,

        yAxes:[
          {
           gridLines:{
             color:'cyan'
           },

            scaleLabel:{
              labelString:'Revenue',
              display:true,
              fontColor:'blue',
              fontSize:20
            },
            ticks:{
              beginAtZero:true,
              fontColor:'green'
            }

          }
        ]
      }
    }}
    >

    </Bar>
    </div>
  );
}

export default BarChart;
