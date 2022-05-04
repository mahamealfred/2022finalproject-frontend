import React from 'react'
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
import StudentsInSchool from "../components/pages/school/StudentsInSchool";
//import {decode} from "../helpers/jwtTokenizer";
import {useEffect} from "react";
import jwt from "jsonwebtoken";
import { useHistory } from 'react-router-dom';

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
              <PrivateRoute exact path={`${path}/schools`} component={School} />
              <PrivateRoute exact path={`${path}/exams`} component={Exam} />
              <PrivateRoute
                exact
                path={`${path}/questions/:id`}
                component={Question}
              />
              <PrivateRoute exact path={`${path}/results`} component={Result} />
              <PrivateRoute
                exact
                path={`${path}/districts`}
                component={District}
              />
              <PrivateRoute
                exact
                path={`${path}/results`}
                component={Result}
              />
              <PrivateRoute exact path={`${path}/studentsinschool/:id`} component={StudentsInSchool}/>
            </>
          )}
        />
      </Dashboard>
    </Switch>
  );
}

export default App;
