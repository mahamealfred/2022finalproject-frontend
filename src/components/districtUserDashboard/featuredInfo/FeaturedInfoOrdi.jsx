import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DialogTitle } from "@mui/material";
import { getStudentNumberByDistrictUserAction } from "../../../redux/actions/getStudentNumberByDistrictUserAction";
export default function FeaturedInfoOrdi() {
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);
  const studentsState = useSelector(
    (state) => state.getStudentNumberByDistictUser
  );

  useEffect(() => {
    async function fetchData() {
      await dispatch(getStudentNumberByDistrictUserAction());
    }
    fetchData();
  }, []);
  console.log(studentsState.students);
  return (
    <>
      {studentsState.loading ? (
        "Loading"
      ) : studentsState.students.length > 0 ? (
        <>
          <DialogTitle>
            <span className="featuredStudent">Ordinary Level Analytics(S3)</span>
          </DialogTitle>
          <div className="featured">
            <div className="featuredItemOrdinary">
              <span className="featuredTitle">
                Total Students In Ordinary Level (S3)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {studentsState.students[0].totalStudentInOrdinary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last semester</span>
            </div>
            <div className="featuredItemOrdinary">
              <span className="featuredTitle">
                Number of Male Student In Ordinary Level (S3)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {studentsState.students[0].totalMaleStudentInOrdinary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last semester</span>
            </div>

            <div className="featuredItemOrdinary">
              <span className="featuredTitle">
                Number of Female in Ordinary Level (S3)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {studentsState.students[0].totalFemaleStudentInOrdinary}
                </span>
                <span className="featuredRate">
                  Stusents <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last semester</span>
            </div>
            <div className="featuredItemOrdinary">
              <span className="featuredTitle">Performance in Assessment</span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {(
                    (studentsState.students[0].ordinaryStudentPercentage[0]
                      .total /
                      (studentsState.students[0].ordinaryStudentPercentage[0]
                        .AssessmentCount *
                        100)) *
                    100
                  ).toFixed(2)}
                </span>
                <span className="featuredRate">
                  %
                  <ArrowUpward className="featuredIcon " />
                </span>
              </div>
              <span className="featuredSub">Compared to last semester</span>
            </div>
          </div>
         
        </>
      ) : (
        "No Available Data"
      )}
    </>
  );
}
