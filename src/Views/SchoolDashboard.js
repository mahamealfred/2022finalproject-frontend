import React, { Component } from "react";
import Topbar from "../components/schoolUserDashboard/topbar/Topbar";
import Sidebar from "../components/schoolUserDashboard/sidebar/Sidebar";

import "../app.css";

export default class SchoolDashboard extends Component {
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
