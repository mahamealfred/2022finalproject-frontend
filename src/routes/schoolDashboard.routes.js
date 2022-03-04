
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Home from "../components/schoolUserDashboard/home/Home";
import SchoolDashboard from "../Views/SchoolDashboard";
import ListStudent from "../components/schoolUserDashboard/students/ListStudent";

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

              <PrivateRoute exact path={`${path}/students`} component={ListStudent} />

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
