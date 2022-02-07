import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./assessmentResult.css"
const AssessmentResult = ({ name, score }) => {
  const history = useHistory();
  useEffect(() => {
    if (!name) {
      history.push("/assessment/assessments/result");
    }
  }, [name, history]);

  const handleSubmit=()=>{

  }
  return (
    <>
      <div className="result">
        <span className="title">Final score: 14</span>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{alignSelf:"center", marginTop:20 }}
          href="/assessment/assessments/home"
          onClick={handleSubmit}
        >
          Go To Homepage
        </Button>
      </div>
    </>
  );
};

export default AssessmentResult;
