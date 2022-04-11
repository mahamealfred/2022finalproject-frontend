import React from "react";
import "./featuredinfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { DialogTitle } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function FeaturedInfo() {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const id = params.id;
      console.log("School id", id);

      const token = await localStorage.getItem("x-access-token");
      let headers;
      if (token) {
        headers = {
          "Content-Type": "application/json",
          token: `${token}`,
        };
      } else {
        headers = {
          "Content-Type": "application/json",
        };
      }

      await axios
        .get(`http://localhost:8000/students/numbersinspecificschool/${id}`, {
          headers: headers,
        })
        .then(function(response) {
          const res = response.data.data;
          return res;
        })
        .then(function(res) {
          console.log("school data", res);
          setData(res);
        })
        .catch(function(error) {
          console.log("error", error);
        });
    }
    fetchData();
  }, []);
  return (
    <>
      {data.length > 0 ? (
        <div>
          <DialogTitle>
            <span className="featuredTitle">
              Ordinary Level Information (S3)
            </span>
          </DialogTitle>
          <div className="featured">
            <div className="featuredItem">
              <span className="featuredTitle">
                Total Students In Ordinary Level (S3)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {data[0].totalStudentInOrdinary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Quality Education</span>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">
                Total Male Student In Ordinary (S3)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {data[0].totalMaleStudentInOrdinary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last Month</span>
            </div>

            <div className="featuredItem">
              <span className="featuredTitle">
                Total Number of Female Student in Ordinary (P6)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {data[0].totalFemaleStudentInOrdinary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last Month</span>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">General Performance (S3)</span>
              <div className="featuredMoneyContainer">
                  {
                      !data[0].ordinaryStudentPercentage[0].total?null:
                      <>
                <span className="featuredStudent">
                  {Math.round(
                    (data[0].ordinaryStudentPercentage[0].total /
                      (data[0].ordinaryStudentPercentage[0].AssessmentCount *
                        100)) *
                      100
                  )}
                </span>
                </>
                  }
                <span className="featuredRate">
                  %
                  <ArrowUpward className="featuredIcon " />
                </span>
              </div>
              <span className="featuredSub">Compared to last Month</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
