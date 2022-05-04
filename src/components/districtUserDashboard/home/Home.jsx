import React from "react";
import DoughnutChart from "../charts/DoughnutChart";
import LineChartPrimary from "../charts/LineChart";
import PieChart from "../charts/PieChart";
import FeaturedInfo from "../featuredInfo/FeaturedInfo";
import FeaturedInfoOrdi from "../featuredInfo/FeaturedInfoOrdi";
import WidgetLarge from "../widgetLarge/WidgetLarge";
import WidgetLargeOrdi from "../widgetLarge/WidgetLargeOrdi";
import RadarChart from "../charts/RadarChart";
import BarChart from "../charts/BarChart";
import BarChartOrdi from "../charts/oridinaryLevelCharts/BarChart";
import DoughnutChartOrdi from "../charts/oridinaryLevelCharts/DoughnutChart";
import LineChart from "../charts/oridinaryLevelCharts/LineChart";
import PieChartOrdi from "../charts/oridinaryLevelCharts/PieChart";
import RadarChartOrdi from "../charts/oridinaryLevelCharts/RadarChart";


function Home() {
  return (
    <div className="home">
      <FeaturedInfoOrdi />
      <div className="homeWidgets">
        <PieChartOrdi />
        <WidgetLargeOrdi />
        <BarChartOrdi />
       
      </div>
      <div className="homeWidgets">
        <RadarChartOrdi />
        <LineChart />
      </div>
      <FeaturedInfo />
      <div className="homeWidgets">
        <PieChart />
        <WidgetLarge />
        <BarChart />
      </div>
      <div className="homeWidgets">
        <RadarChart />
        <LineChartPrimary />
      </div>
    </div>
  );
}

export default Home;
