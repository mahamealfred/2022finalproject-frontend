
import React from 'react'
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Home from "../components/districtUserDashboard/home/Home";
import OrdinaryLevelResults from "../components/districtUserDashboard/studentResults/OrdinaryLevelResults";
import PrimaryResults from "../components/districtUserDashboard/studentResults/PrimaryResults";
import SchoolDashboard from "../Views/DistrictDashboard";
// import ListStudent from "../components/districtUserDashboard/students/ListStudent";
import {useEffect} from "react";
import jwt from "jsonwebtoken";
import { useHistory } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
function App() {
  
  const decode= (token) => {
    const JWT_SECRET="mytokensecret";
    const payload =jwt.verify(token, JWT_SECRET);
     return payload;
  }
  const history= useHistory();
  useEffect(() => {
  
    const token =localStorage.getItem('x-access-token');
    if (token) {
    const {exp}=decode(token);
    console.log(history)
    if(Date.now()>=exp*1000){
      localStorage.removeItem("x-access-token")
     return history.push('/', { push: true })
    }
    else{
      return null
    }
  }
  return history.push('/', { push: true })

  }, [])
  const { path } = useRouteMatch();
  return (
    <Switch>
      <SchoolDashboard>
        <Route
          component={({ match }) => (
            <>
              <PrivateRoute exact path={path} component={Home} />

              <PrivateRoute exact path={`${path}/primaryresults`} component={PrimaryResults} />
              <PrivateRoute exact path={`${path}/ordinarylevelresults`} component={OrdinaryLevelResults} />

              {/* <PrivateRoute
                exact
                path={`${path}/students`}
                component={ListStudent}
              /> */}
            </>
          )}
        />
        
      </SchoolDashboard>
    </Switch>
  );
}

export default App;
