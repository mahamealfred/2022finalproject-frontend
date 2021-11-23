// import Topbar from "./components/topbar/Topbar";
// import Sidebar from "./components/sidebar/Sidebar";
import './app.css'
// import Home from "./components/pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
// import UserList from "./components/pages/userList/UserList";
// import User from "./components/pages/user/User";
// import NewUser from "./components/pages/newUser/NewUser";
// import ProductList from "./components/pages/productList/ProductList";
// import Product from "./components/pages/product/Product";
// import NewProduct from "./components/pages/newProduct/NewProduct";
  import Login from "./components/pages/login/Login";
// import ListStudent from "./components/pages/students/ListStudent";



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
        <Login />
        </Route>
      </Switch>

    {/* <Topbar />
      
     <div className="container">
     <Sidebar />
       <Switch>
       <Route exact path="/">
         <Home/>
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
         <Route path="/products">
         <ProductList />
         </Route>
         <Route path="/product/:productId">
         <Product />
         </Route>
         <Route path="/newProduct">
         <NewProduct />
         </Route>
        
        </Switch>
     </div>
     {/* <Switch>
       <Route exact path="/">
        <Login />
       </Route>
     </Switch> */}
      */}
    </Router>


  );
}

export default App;
