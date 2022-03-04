
import { useRouteMatch, Switch, Route } from "react-router-dom";
import StudentLogin from "../components/pages/login/StudentLogin";
import PrivateRoute from "./PrivateRoute";
import AssessmentsHome from "../components/pages/assessmentHome/AssessmentsHome";
import Assessment from "../components/pages/assessment/Assessment";


function App() {
  
  const { path } = useRouteMatch();
  return (
    <Switch>
      
        <Route
          component={({ match }) => (
            <>
             <PrivateRoute exact path={path} component={AssessmentsHome} />
              {/* <PrivateRoute
                exact
                path={`${path}/assessmentsHome`}
                component={AssessmentsHome} 
              />
              <PrivateRoute
                exact
                path={`${path}/studentLogin`}
                component={StudentLogin}
              />
             
               <PrivateRoute
                exact
                path={`${path}/assessments`}
                component={Assessment} 
               
              />
              <PrivateRoute
                exact
                path={`${path}/assessment`}
                component={Assessment} 
               
              />
                 */}
            
            </>
          )}
        />
     
    </Switch>
  );
}

export default App;
