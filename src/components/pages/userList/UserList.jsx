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
   
   const [userId, setUserId] = useState(0);
   const [fullname, setFullname] = useState("");
   const [email, setEmail] = useState("");
   const [password,setPassword]=useState("");
   const [role,setRole]=useState("");

    useEffect(()=>{
        if (!usersState.loading) {
            if (usersState.users) {
              setUsers(usersState.users);
            }
          }
        }, [usersState.users]);

    const handleDelete=(id)=>{
     setData(data.filter((item)=>item.id !== id));
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'user', headerName: 'Username', width: 200, renderCell: (params)=>{
            return(
                <div className="userListUser">
                   <img className="userListImg" src={params.row.avatar} alt="" />
                   {params.user.fullname}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 200 },
        {
          field: 'status',
          headerName: 'Status',
          width: 120,
          renderCell: (params)=>{
            return(
                <div className="userListUser">
                   {params.user.email}
                </div>
            )
          }
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 160,
            renderCell: (params)=>{
                return(
                    <div className="userListUser">
                       {params.user.role}
                    </div>
                )
              }
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
        <span className="userlistTitle">List of Users</span> 
         <DataGrid rows={users} disableSelectionOnClick columns={columns} pageSize={5} checkboxSelection />
          
        </div>
       
        </>
    )
}
UserList.propTypes = {
    users: PropTypes.array.isRequired,
  };
  
export default UserList;