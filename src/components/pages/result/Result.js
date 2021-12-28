import { DataGrid } from "@material-ui/data-grid";

import * as React from "react";


import { DeleteOutline } from "@material-ui/icons";


import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import { getAllResult } from "../../../redux/actions/resultsAction";


import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "studentId", headerName: "Student name", width: 200 },
  { field: "examId", headerName: "Exam", width: 200 },
  {
    field: "marks",
    headerName: "Marks",
    type: "date",
    width: 200,
  },
  
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/user/" + params.row.id}>
            <button className="userListEdit">Edit</button>
          </Link>

          <DeleteOutline className="userListDelete" />
        </>
      );
    },
  },
];



export default function Result({openn,...rest}) {

  const dispatch = useDispatch();
  const resultsState = useSelector((state) => state.results);
  const [results, setResults] = useState([]);

 
  //const [value, setValue] = React.useState(new Date());


  useEffect(()=>{
     
    if (!resultsState.loading) {
        if (resultsState.results) {
          setResults(resultsState.results);
          dispatch(getAllResult());
        }
      }
    }, [resultsState.results,resultsState.loading, dispatch]);

  

  //select input field

  return (
    <div
      style={{ flex: 4, height: "auto", width: "400px", margin: "80px 0px" }}
    >
      
      <DataGrid
        rows={results}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
Result.propTypes = {
  results: PropTypes.array.isRequired,
};
