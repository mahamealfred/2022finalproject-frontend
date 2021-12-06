import React, { Component } from 'react'
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";

import "../app.css";

export default class Dashboard extends Component {
    render() {
        console.log(this.props.children)
        return (
            <div>
                    <Topbar />
                    <div className="container">
        <Sidebar />
        {this.props.children}
        </div>
        </div>
        )
    }
}
