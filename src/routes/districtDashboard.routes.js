
import React from 'react'
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Home from "../components/districtUserDashboard/home/Home";
import OrdinaryLevelResults from "../components/districtUserDashboard/studentResults/OrdinaryLevelResults";
import PrimaryResults from "../components/districtUserDashboard/studentResults/PrimaryResults";
import SchoolDashboard from "../Views/DistrictDashboard";
// import ListStudent from "../components/districtUserDashboard/students/ListStudent";

import PrivateRoute from "./PrivateRoute";
function App() {
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
