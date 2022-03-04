
import './pieChart.css';
import 'chart.js/auto';
import {Pie} from 'react-chartjs-2'

function PieChart() {
  return (
    <div className="pieChart">
    <span className="pieChartTitle">Students Performance Based on Gender P6</span>
    
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
    <span className="pieChartTitle">Students Performance Based on Gender in S3</span>
    
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
