import React from 'react'
import DoughnutChart from '../charts/DoughnutChart'
import PieChart from '../charts/PieChart'
import FeaturedInfo from '../featuredInfo/FeaturedInfo'
import WidgetLarge from '../widgetLarge/WidgetLarge'


function Home() {
  return (
    <div className="home">
  <FeaturedInfo/>
    <div className="homeWidgets">
    <PieChart/>
    <WidgetLarge/>
    <DoughnutChart/>
        </div>  
    </div>
  )
}

export default Home