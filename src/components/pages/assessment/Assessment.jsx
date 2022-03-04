// import React, { useState } from 'react';
// import Header from '../../header/Header';
// import './assessment.css'
// import HomeTopbar from '../../homeTopbar/HomeTopbar';
// import Footer from '../../Footer/Footer';
// import { useRouteMatch,Switch, Route } from 'react-router-dom';
// import AssessmentHome from '../../pages/AssessmentPages/AssessmentHome/AssessmentHome';
// import PrivateRoute from "../../../routes/PrivateRoute";
// import AssessmentQuestion from '../AssessmentPages/AssessmentQuestion/AssessmentQuestion';
// import AssessmentResult from '../AssessmentPages/AssessmentResult/AssessmentResult';
// import axios from 'axios';

// const Assessment=()=> {

//   const [name, setName]=useState(" ");
//   const [questions, setQuestions]=useState();
//   const [score, setScore]=useState(0);
//   const fetchQuestions = async (category = "Mathematics", difficulty = "Medium") => {
//     const { data } = await axios.get(
//       `https://opentdb.com/api.php?amount=10${
//         category && `&category=${category}`
//       }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
//     );

//    console.log(data)
//   };

// const { path } = useRouteMatch();
//   return (
//       <>
//        <HomeTopbar />
//        <div className='assessment' style={{ backgroundImage:"url(../Assets/images/students.jpg)"}}>
//       <Header />
         
//       <Switch>
      
//       <Route
//         component={({ match }) => (
//           <>
//            <PrivateRoute
//               exact
//               path={`${path}/assessments/home`}
//              component={AssessmentHome} 
//              name={name}
//              setName={setName}
//              fetchQuestions={fetchQuestions}
             
//             />
//              <PrivateRoute
//               exact
//               path={`${path}/assessments/questions`}
//               component={AssessmentQuestion} 
//             />

//              <PrivateRoute
//               exact
//               path={`${path}/assessments/result`}
//               component={AssessmentResult} 
//               name={name}
//               setName={setName}
//             />
           
//           </>
//         )}
//       />
   
//     </Switch>
//        </div>
//        <Footer />
   
//       </>
   
//   );
// }
// export default Assessment;