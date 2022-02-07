import React, { Component } from 'react'
import {  Switch, Route } from "react-router-dom";
import Login from "../components/pages/login/Login";
import DashboardRoute from './dashboard.routes';
import AssessmentRoute from './assessment.routes'
import Assessment from '../components/pages/assessment/Assessment';


export default class index extends Component {
    render() {
        return (
            <Switch>
         <Route exact path="/" component={Login}/>
          <Route path="/dashboard">
            <DashboardRoute />
          </Route>
          <Route path="/assessment">
            <AssessmentRoute/>
            <Assessment/>
          </Route>
            </Switch>
        )
    }
}
