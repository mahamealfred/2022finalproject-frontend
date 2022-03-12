import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DialogTitle } from "@mui/material";

export default function FeaturedInfo() {
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);

  return (
    <>
      <DialogTitle>
        <span className="featuredStudent">Ordinary Level Analytics (S3)</span>
      </DialogTitle>

      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Total Students In Ordinary Level (S3)</span>
          <div className="featuredMoneyContainer">
            <span className="featuredStudent">46</span>
            <span className="featuredRate">
              Students <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">
            Number of Male Students In Ordinary Level (S3)
          </span>
          <div className="featuredMoneyContainer">
            <span className="featuredStudent">4</span>
            <span className="featuredRate">
              Students <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">Number of Female in Ordinary Level (S3)</span>
          <div className="featuredMoneyContainer">
            <span className="featuredStudent">59</span>
            <span className="featuredRate">
              Stusents <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Total Number of School</span>
          <div className="featuredMoneyContainer">
            <span className="featuredStudent">65</span>
            <span className="featuredRate">
              Schools
              <ArrowUpward className="featuredIcon " />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>
      </div>
      <DialogTitle>
        <span className="featuredStudent">Primary Level Analytics (P6)</span>
      </DialogTitle>

      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Total Students In Primary (P6)</span>
          <div className="featuredMoneyContainer">
            <span className="featuredStudent">46</span>
            <span className="featuredRate">
              Students <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">
            Total Student In Ordinary Level (S3)
          </span>
          <div className="featuredMoneyContainer">
            <span className="featuredStudent">4</span>
            <span className="featuredRate">
              Students <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">Number of Male in P6</span>
          <div className="featuredMoneyContainer">
            <span className="featuredStudent">59</span>
            <span className="featuredRate">
              Stusents <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>

        <div className="featuredItem">
          <span className="featuredTitle">Number of Female in S3</span>
          <div className="featuredMoneyContainer">
            <span className="featuredStudent">65</span>
            <span className="featuredRate">
              Students
              <ArrowUpward className="featuredIcon " />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>
      </div>
    </>
  );
}
