import React from 'react'
import BarChart from '../charts/BarChart'
import DoughnutChart from '../charts/DoughnutChart'
import PieChart from '../charts/PieChart'
import PieChartOrd from '../charts/ordinaryLevelChart/PieChartOrd'
import FeaturedInfo from '../featuredInfo/FeaturedInfo'
import WidgetLarge from '../widgetLarge/WidgetLarge'
import BarChartOrd from '../charts/ordinaryLevelChart/BarChartOrd'
import DoughnutChartOrd from '../charts/ordinaryLevelChart/DoughnutChartOrd'


function Home() {
  return (
    <div className="home">
  <FeaturedInfo/>
    <div className="homeWidgets">
    <PieChart/>
    {/* <WidgetLarge/> */}
    <BarChart/>
    <DoughnutChart/>
        </div>  
        <div className="homeWidgets">
    <PieChartOrd/>
    {/* <WidgetLarge/> */}
    <BarChartOrd/>
    <DoughnutChartOrd/>
        </div>  
    </div>
    
  )
}

export default Home