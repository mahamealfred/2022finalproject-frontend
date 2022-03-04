
import './doughnut.css';
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2'

function DoughnutChart() {
  return (
    <div className="doughnutChart">
    <span className="doughnutChartTitle">Student Performance P6</span>
    
    <Doughnut
    data={{
      labels:['English','Mathematics','Kinyarwanda','STD','French'],
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
    <span className="doughnutChartTitle">Student Performance in S3</span>
    
    <Doughnut
    data={{
      labels:['English','Mathematics','Kinyarwanda','Geograph','Chemistry'],
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
