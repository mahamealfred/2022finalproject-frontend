import React, { Component } from "react";
import Topbar from "../components/districtUserDashboard/topbar/Topbar";
import Sidebar from "../components/districtUserDashboard/sidebar/Sidebar";

import "../app.css";

export default class DistrictDashboard extends Component {
  render() {
    console.log(this.props.children);
    return (
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          {this.props.children}
        </div>
      </div>
    );
  }
}
