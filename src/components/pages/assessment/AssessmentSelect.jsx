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
  const [allowed, setAllow] = useState(false);
  const [startDate, setStartDate] = useState("");

  const handleSubmit = () => {
    setError(false);
    history.push(`/assessments/select/${exams}`);
  };

  const handlegetAssessment = (e) => {
    if (e) {
      console.log("exams",e.target.value.id )
      setExams(e.target.value.id);
      const currentDate = moment(new Date()).format("YYYY-MM-DD  HH:mm:ss");
      var m = moment.utc(e.target.value.startDate, "YYYY-MM-DD  HH:mm:ss");

      var isBefore = m.isSameOrBefore(currentDate);
      setAllow(isBefore);
      
      setStartDate(e.target.value.startDate);
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
  console.log("exam id...:", exams);
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
              disabled={exams && allowed ? false : true}
              onClick={() => handleSubmit()}
              style={{ borderStartEndRadius: 5 }}
            >
              {allowed === true ? " Start Assessment" : allowed == false ? "Not Yet Time" :  "Start Assessment"}
            </Button>
          </div>
        </div>
        {!startDate ? null : (
          <span style={{ fontSize: 20 }}>
            This Assessments will be available till:
            {moment(startDate).format("MMMM Do YYYY, h:mm:ss a")}
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
