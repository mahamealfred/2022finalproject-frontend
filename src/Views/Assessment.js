import React, { Component } from "react";
import Sidebar from "../components/sidebar/Sidebar";

import "../app.css";
import HomeTopbar from "../components/homeTopbar/HomeTopbar";

export default class Assessment extends Component {
 
  render() {
    console.log(this.props.children);
    return (
      <div>
    
       <HomeTopbar/>
   
        <div className="container">
          <Sidebar/>
          {this.props.children}
        </div>
      </div>
    );
  }
}
