import React, { Component } from 'react'
import {  Switch, Route } from "react-router-dom";
import Login from "../components/pages/login/Login";
import DashboardRoute from './dashboard.routes';

export default class index extends Component {
    render() {
        return (
            <Switch>
                      <Route exact path="/" component={Login}/>
          <Route path="/dashboard">
            <DashboardRoute />
          </Route>
            </Switch>
        )
    }
}
