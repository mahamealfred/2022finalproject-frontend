import React, { Component } from 'react'
import {  Switch, Route } from "react-router-dom";
import Login from "../components/pages/login/Login";
import DashboardRoute from './dashboard.routes';
import SchoolDashboardRoute from './schoolDashboard.routes';
import DistrictDashboardRoute from './districtDashboard.routes';
import AssessmentRoute from './assessment.routes'




export default class index extends Component {
    render() {
        return (
            <Switch>
         <Route exact path="/" component={Login}/>
          <Route path="/dashboard">
            <DashboardRoute />
          </Route>
          <Route path="/schooldashboard">
            <SchoolDashboardRoute/>
          </Route>
          <Route path="/districtdashboard">
            <DistrictDashboardRoute/>
          </Route>
          <Route path="/assessments">
          <AssessmentRoute/>
          </Route>
         
            </Switch>
        )
    }
}
