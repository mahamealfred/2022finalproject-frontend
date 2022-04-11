import React from 'react'
import Chart from '../../charts/Chart';
import FeaturedInfo from '../../featuredinfo/FeaturedInfo';
import './home.css';
import { userData } from '../../../userData';
import WidgetSmall from '../../widgetsSmall/WidgetSmall';
import WidgetLarge from '../../widgetsLarge/WidgetLarge';
import PieChart from '../../charts/PieChart';
import DoughnutOrdi from '../../charts/oridinaryLevelCharts/DoughnutChart';
import Doughnut from '../../charts/DoughnutChart';
import BarChart from '../../charts/BarChart';
import PieChartOrdi from '../../charts/oridinaryLevelCharts/PieChart';
import OrdinaryLevelWidgetLarge from '../../widgetsLarge/OrdinaryLevelWidgetLarge';
import BarChartOrdi from '../../charts/oridinaryLevelCharts/BarChart';


export default function Home() {
    return (
        <div className="home">
        <FeaturedInfo />
       
        <div className="homeWidgets">
          {/* <WidgetSmall/> */}
            
            <PieChart />
            <WidgetLarge />
            <Doughnut />
            </div>
            
        <div className="homeWidgets">
          {/* <WidgetSmall/> */}
          
          <PieChartOrdi/>
          {/* <BarChart /> */}
          <OrdinaryLevelWidgetLarge/>
          <DoughnutOrdi />
          
            </div>
            <div className="homeWidgets">
            {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User"/> */}
            <BarChart/>
            <BarChartOrdi/>
            </div>
    
           
        </div>
    )
}
