import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getSpecificStudentNumberInSchoolAction } from "../../../redux/actions/getSpecificStudentNumberInSchoolAction";
import { DialogTitle } from "@mui/material";
export default function FeaturedInfo() {
  const dispatch = useDispatch();
  const studentsState = useSelector(
    (state) => state.getSpecificStudentNumberInSchool
  );

  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await dispatch(getSpecificStudentNumberInSchoolAction());
    }
    fetchData();
  }, []);
  console.log(studentsState.students.totalStudent);

  return (
    <>
      {studentsState.loading ? (
        "Loading"
      ) : studentsState.students.length > 0 ? (
        <>
          <DialogTitle>
            <span className="featuredStudent">Ordinary Level (S3)</span>
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
                  {Math.round(
                    (studentsState.students[0].ordinaryStudentPercentage[0]
                      .total /
                      (studentsState.students[0].ordinaryStudentPercentage[0]
                        .AssessmentCount *
                        100)) *
                    100
                  )}
                </span>
                <span className="featuredRate">
                  %
                  <ArrowUpward className="featuredIcon " />
                </span>
              </div>
              <span className="featuredSub">Compared to last semester</span>
            </div>
          </div>
          <DialogTitle>
            <span className="featuredStudent">Primary (P6)</span>
          </DialogTitle>
          <div className="featured">
            <div className="featuredItem">
              <span className="featuredTitle">
                Total Students In Primary (P6)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {studentsState.students[0].totalStudentInPrimary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last semester</span>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">
                Number of Male Student In Primary (P6)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {studentsState.students[0].totalMaleStudentInPrimary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last semester</span>
            </div>

            <div className="featuredItem">
              <span className="featuredTitle">
                Number of Female in Primary (P6)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {studentsState.students[0].totalFemaleStudentInPrimary}
                </span>
                <span className="featuredRate">
                  Stusents <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last semester</span>
            </div>

            <div className="featuredItem">
              <span className="featuredTitle">Performance in Assessment</span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {Math.round(
                    (studentsState.students[0].primaryStudentPercentage[0]
                      .total /
                      (studentsState.students[0].primaryStudentPercentage[0]
                        .AssessmentCount *
                        100)) *
                    100
                  )}
                </span>
                {/* {console.log('student perc..',studentsState.students[0].primaryStudentPercentage[0].total)} */}
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
