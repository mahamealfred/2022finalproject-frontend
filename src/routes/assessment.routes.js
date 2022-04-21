
import React from 'react'
import { useRouteMatch, Switch, Route } from "react-router-dom";
import StudentLogin from "../components/pages/login/StudentLogin";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/pages/assessment/home/Home";
import AssessmentSelect from "../components/pages/assessment/AssessmentSelect";
import Question from "../components/pages/assessment/Question";
import StudentSingUp from '../components/pages/login/StudentSingUp';


function App() {
  
  const { path } = useRouteMatch();
  return (
    <Switch>
      
        <Route
          component={({ match }) => (
            <>
             <PrivateRoute exact path={path} component={Home} />
              <PrivateRoute
                exact
                path={`${path}/studentLogin`}
                component={StudentLogin}
              />
              <PrivateRoute
                exact
                path={`${path}/singup`}
                component={StudentSingUp}
              />
             
              <PrivateRoute
                exact
                path={`${path}/select`}
                component={AssessmentSelect} 
              />

<PrivateRoute
                exact
                path={`${path}/select/:id`}
                component={Question} 
              />
             
                
            
            </>
          )}
        />
     
    </Switch>
  );
}

export default App;
