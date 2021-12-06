import React, { Component } from 'react'
import Routes from './routes/index';
import { BrowserRouter as Router} from "react-router-dom";
import "./app.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes/>
      </Router>
    )
  }
}
