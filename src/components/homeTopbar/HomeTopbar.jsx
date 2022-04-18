import React from "react";
import "./homeTopBar.css";
// import { useNavigate } from 'react-router-dom';

import InputIcon from "@material-ui/icons/Input";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function HomeTopbar() {
  const history = useHistory();
  const isAuth = localStorage.getItem("x-access-token");
  const handleLogout = () => {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("user-data");
    history.push("/assessments", { push: true });
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src="../../Assets/images/reb.jpg" alt="" className="topAvatar" />
        </div>
        <div className="leftTopBar">
          <span className="logo">
            Primary and Ordinary level Quality Eduction  Booster
          </span>
        </div>
        {
          !isAuth? null:
        <div className="toRight">
          <IconButton color="inherit" onClick={() => handleLogout()}>
            <InputIcon />
          </IconButton>
        </div>
}
      </div>
    </div>
  );
}
