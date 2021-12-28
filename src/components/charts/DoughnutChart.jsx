
import './doughnut.css';
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2'

function DoughnutChart() {
  return (
    <div className="doughnutChart">
    <span className="doughnutChartTitle">Student Performance</span>
    
    <Doughnut
    data={{
      labels:['Jan','Feb','Mar','Apr','May','Jun'],
      datasets:[
        {
      
        data:[100,200,300,400,500,600],
        backgroundColor:['red','green','yellow','purple','pink','cyan'],
       
      },
      
    ]

    }
    }
    >

    </Doughnut>

    </div>
  );
}

export default DoughnutChart;
