import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import "./AssessmentSelect.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getExamsByLevel } from "../../../redux/actions/getExamsByLevelAction";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import HomeTopbar from "../../homeTopbar/HomeTopbar";
import Header from "../../header/Header";
import Footer from "../../Footer/Footer";
import { getExamsAndQuestionByLevel } from "../../../redux/actions/getExamsAndQuestionByIdAction";
import moment from "moment";
import jwt from "jsonwebtoken";
const AssessmentSelect = () => {
  const getExamsByLevelState = useSelector((state) => state.getExamsByLevel);
  const [error, setError] = useState(false);
  const getExamAndQuestionState = useSelector(
    (state) => state.getExamAndQuestionById
  );
  const getExamAndQuestionById = useSelector(
    (state) => state.getExamAndQuestionById
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const [exams, setExams] = useState("");
  const [examId, setExamId] = useState("");
  const [allow, setAllow] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate,setEndDate]=useState("");
  const [errorMessage,setErrorMessage]=useState("");

  const handleSubmit = () => {
    setError(false);
    history.push(`/assessments/select/${exams}`);
  };

  const handlegetAssessment = (e) => {
    if (e) {
      console.log("exams",e.target.value.id )
      setExams(e.target.value.id);
      const currentDate = moment(new Date()).format("YYYY-MM-DD  HH:mm:ss a");
      var m = moment.utc(e.target.value.startDate, "YYYY-MM-DD  HH:mm:ss");
      var stdate= moment(new Date(e.target.value.startDate)).format("YYYY-MM-DD  HH:mm:ss a");
      var endate= moment(new Date(e.target.value.endDate)).format("YYYY-MM-DD  HH:mm:ss a");
      
      //var endDate=moment(new Date('2022-05-20 13:23:00')).format("YYYY-MM-DD  HH:mm:ss")
      
      var startTime=new Date(e.target.value.startDate)
    var start_time=startTime.getHours()+":"+startTime.getMinutes()+":"+startTime.getSeconds()

    var currentTime=new Date()
    var current_time=currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds()
   
     // var isBefore =m.isSame(stdate);
      if(endate<currentDate){
        setAllow(false)
        setErrorMessage(`This Assessment was available untill: ${endate}`)
      }
     else if(stdate>currentDate){
        setAllow(false)
        setErrorMessage(`This will be available From: ${stdate} \n To ${endate}`)
      }
      else if( stdate<=currentDate && start_time > current_time){
        setAllow(false)
        setErrorMessage(`This will be available from: ${stdate}`);
      }
     else if( (stdate<=currentDate)  && (start_time <= current_time) && (endate>=currentDate)){
      setErrorMessage(`This Assessment is available from ${stdate} To  ${endate}`)
        setAllow(true)
      }
      else{
        setAllow(false)
      }
      // setAllow(isBefore);
      
      setStartDate(e.target.value.startDate);
      setEndDate(e.target.value.endDate);
    }
  };
  const decode = (token) => {
    const JWT_SECRET = "mytokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    if (token) {
      const { exp } = decode(token);
      console.log(history);
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("x-access-token");
        return history.push("/assessments/studentLogin", { push: true });
      } else {
        return null;
      }
    }
    return history.push("/", { push: true });
  }, []);

  useEffect(() => {
    setExams("");
    handlegetAssessment();
    async function fetchData() {
      await dispatch(getExamsByLevel());
    }
    fetchData();
  }, []);

  return (
    <>
      <HomeTopbar />
      <Header />
      <div className="content">
        <div className="settings">
          <span style={{ fontSize: 30 }}>Assessment Settings</span>
          <div className="settings_select">
            {error && <ErrorMessage>Please Fill All The Fields</ErrorMessage>}
            {console.log("exam", getExamsByLevelState.exams)}
            {getExamsByLevelState.loading ? (
              "loading.."
            ) : getExamsByLevelState.exams.length > 0 ? (
              <TextField
                select
                label="Select Assessment"
                variant="outlined"
                style={{ marginBottom: 30 }}
                // value={exams}
                onChange={(e) => handlegetAssessment(e)}
              >
                {getExamsByLevelState.exams.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              "No Assessment Found"
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={exams && allow ? false : true}
              onClick={() => handleSubmit()}
              style={{ borderStartEndRadius: 5 }}
            >
              {allow=== true ? " Start Assessment" : allow== false ? "Not Yet Time" :  "Start Assessment"}
            </Button>
          </div>
        </div>
        {!startDate ? null : (
          <span style={{ fontSize: 20 }}>
            {/* This Assessments will be available till:
            {moment(startDate).format("MMMM Do YYYY, h:mm:ss a")} */}
            {errorMessage}
          </span>
        )}
        <img
          src="../../Assets/images/reb.jpg"
          alt="Assessment Image"
          className="banner"
        />
      </div>
      <Footer />
    </>
  );
};
export default AssessmentSelect;
