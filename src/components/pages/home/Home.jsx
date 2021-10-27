import React from 'react'
import Chart from '../../charts/Chart';
import FeaturedInfo from '../../featuredinfo/FeaturedInfo';
import './home.css';
import { userData } from '../../../userData';
import WidgetSmall from '../../widgetsSmall/WidgetSmall';
import WidgetLarge from '../../widgetsLarge/WidgetLarge';

export default function Home() {
    return (
        <div className="home">
        <FeaturedInfo />
        <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
            <div className="homeWidgets">
            <WidgetSmall/>
            <WidgetLarge/>
            </div>
            
           
        </div>
    )
}
