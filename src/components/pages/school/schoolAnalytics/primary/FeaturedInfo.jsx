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
            <span className="featuredStudent">
              Primary level Information (P6)
            </span>
          </DialogTitle>
          <div className="featured">
            <div className="featuredItem">
              <span className="featuredTitle">
               P6 Total students 
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {data[0].totalStudentInPrimary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Quality Education</span>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">
               P6 Total male students 
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {data[0].totalMaleStudentInPrimary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last Month</span>
            </div>

            <div className="featuredItem">
              <span className="featuredTitle">
                Total Number of Female Student in Primary (P6)
              </span>
              <div className="featuredMoneyContainer">
                <span className="featuredStudent">
                  {data[0].totalFemaleStudentInPrimary}
                </span>
                <span className="featuredRate">
                  Students <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last Month</span>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">General Performance (Primary)</span>
              <div className="featuredMoneyContainer">
                {
                    !data[0].primaryStudentPercentage[0].total?null:<>
                <span className="featuredStudent">
                  {Math.round(
                    (data[0].primaryStudentPercentage[0].total /
                      (data[0].primaryStudentPercentage[0].AssessmentCount *
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
