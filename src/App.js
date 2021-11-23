import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./components/pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./components/pages/userList/UserList";
import User from "./components/pages/user/User";
import NewUser from "./components/pages/newUser/NewUser";
//import Login from "./components/pages/login/Login";
import ListStudent from "./components/pages/students/ListStudent";
import School from "./components/pages/school/School";
import Exam from "./components/pages/exam/Exam";
import Question from "./components/pages/question/Question";

function App() {
  return (
    <Router>
      <Topbar />

      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/students">
            <ListStudent />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/school">
            <School />
          </Route>
         <Route path="/exam">
            <Exam />
          </Route>
          <Route path="/question">
            <Question />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
