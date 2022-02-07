
import { useRouteMatch, Switch, Route } from "react-router-dom";
import StudentLogin from "../components/pages/login/StudentLogin";
import PrivateRoute from "./PrivateRoute";
import AssessmentHome from "../components/pages/assessmentHome/AssessmentHome";
import Assessment from "../components/pages/assessment/Assessment";

function App() {
  
  const { path } = useRouteMatch();
  return (
    <Switch>
      
        <Route
          component={({ match }) => (
            <>

              <PrivateRoute
                exact
                path={`${path}/studentLogin`}
                component={StudentLogin}
              />
             <PrivateRoute
                exact
                path={`${path}/assessmentHome`}
                component={AssessmentHome} 
              />
               <PrivateRoute
                exact
                path={`${path}/assessments`}
                component={Assessment} 
               
              />
            
            </>
          )}
        />
     
    </Switch>
  );
}

export default App;
