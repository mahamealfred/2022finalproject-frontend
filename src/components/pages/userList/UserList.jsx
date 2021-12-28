import "./userList.css";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../../dummyData";
import {Link} from "react-router-dom";
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";

import {useState,useEffect} from "react";

import { getUsersAction } from "../../../redux/actions/usersAction";

function UserList({ ...rest}) {
    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);
    const [users, setUsers] = useState([]);
   const [data,setData] = useState(userRows);
   
  //  const [userId, setUserId] = useState(0);
  //  const [fullname, setFullname] = useState("");
  //  const [email, setEmail] = useState("");
  //  const [password,setPassword]=useState("");
  //  const [role,setRole]=useState("");

    useEffect(()=>{
     
        if (!usersState.loading) {
            if (usersState.users) {
              setUsers(usersState.users);
              dispatch(getUsersAction());
            }
          }
        }, [usersState.users,usersState.loading, dispatch]);

    const handleDelete=(id)=>{
     setData(data.filter((item)=>item.id !== id));
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'fullname', headerName: 'Fullname', width: 200, },
        { field: 'email', headerName: 'Email', width: 200 },
        {
          field: 'isActive',
          headerName: 'Status',
          width: 120,
          
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 160,
           
          },
          {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params)=>{
                return(
                    <>
                    
                    <Link to={"/user/"+params.row.id}>
                    <button className="userListEdit" >Edit</button>
                    </Link>
                   
                    <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
                    </>

                )
            }
          },
        
      ];
      
     

    return (
        <>
      
        <div className="userList">
        <span className="userlistTitle">List of Users </span> 
         <DataGrid rows={users} disableSelectionOnClick columns={columns} pageSize={5} checkboxSelection />
          
        </div>
       
        </>
    )
}
UserList.propTypes = {
    users: PropTypes.array.isRequired,
  };
  
export default UserList;