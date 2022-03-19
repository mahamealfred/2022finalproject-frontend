import Home from "../components/pages/home/Home";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import UserList from "../components/pages/userList/UserList";
import User from "../components/pages/user/User";
import NewUser from "../components/pages/newUser/NewUser";
//import Login from "./components/pages/login/Login";
import ListStudent from "../components/pages/students/ListStudent";
import School from "../components/pages/school/School";
import Exam from "../components/pages/exam/Exam";
import Question from "../components/pages/question/Question";
import Dashboard from "../Views/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Result from "../components/pages/result/Result";
import District from "../components/pages/district/District";

function App() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Dashboard>
        <Route
          component={({ match }) => (
            <>
              <PrivateRoute exact path={path} component={Home} />

              <PrivateRoute exact path={`${path}/users`} component={UserList} />

              <PrivateRoute
                exact
                path={`${path}/students`}
                component={ListStudent}
              />
              <PrivateRoute
                exact
                path={`${path}/user/:userId`}
                component={User}
              />
              <PrivateRoute
                exact
                path={`${path}/newUser`}
                component={NewUser}
              />
              <PrivateRoute exact path={`${path}/school`} component={School} />
              <PrivateRoute exact path={`${path}/exams`} component={Exam} />
              <PrivateRoute
                exact
                path={`${path}/questions`}
                component={Question}
              />
              <PrivateRoute exact path={`${path}/results`} component={Result} />
              <PrivateRoute exact path={`${path}/districts`} component={District} />
            </>
          )}
        />
      </Dashboard>
    </Switch>
  );
}

export default App;
