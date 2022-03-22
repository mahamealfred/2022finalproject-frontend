import React from 'react'
import "./user.css";
import {Link} from "react-router-dom";
import { PermIdentity,CalendarToday,MailOutline,PhoneAndroid,LocationSearching,Publish } from "@material-ui/icons";

export default function User() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                <button className="userAddButton">Create</button>
                </Link>
               
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="../../Assets/images/alf1.jpeg"  className="userShowImg" alt="" />
                       <div className="userShowTopTitle">
                           <span className="userShowUsername">Alice uwera</span>
                           <span className="userShowUserTitle">Software Engineer</span>
                       </div>
                    </div>
                    <div className="userShowBotton">
                        <span className="userShowTitle">Account Details</span>
                         <div className="userShowInfo">       
                           <PermIdentity className="userIcon"/>
                           <span className="userShowInfoTitle">alfred56</span>
                        </div>  
                        <div className="userShowInfo">       
                           <CalendarToday className="userIcon"/>
                           <span className="userShowInfoTitle">12.1.2020</span>
                        </div>  
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">       
                           <PhoneAndroid className="userIcon"/>
                           <span className="userShowInfoTitle">+25078946464</span>
                        </div> 
                        <div className="userShowInfo">       
                           <MailOutline className="userIcon"/>
                           <span className="userShowInfoTitle">alfred56@gmail.com</span>
                        </div>  
                        <div className="userShowInfo">       
                           <LocationSearching className="userIcon"/>
                           <span className="userShowInfoTitle">Kigali | Rwanda</span>
                        </div>   
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form  className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label >Username</label>
                               <input
                               type="text"
                               placeholder="Useranme" 
                               className="userUpdateInput"
                               />
                               
                            </div>
                            <div className="userUpdateItem">
                                <label >Full Name</label>
                               <input
                               type="text"
                               placeholder="Full Name" 
                               className="userUpdateInput"
                               />
                               
                            </div>
                            <div className="userUpdateItem">
                                <label >Email</label>
                               <input
                               type="email"
                               placeholder="Email" 
                               className="userUpdateInput"
                               />
                               
                            </div>
                            <div className="userUpdateItem">
                                <label >Phone</label>
                               <input
                               type="text"
                               placeholder="+ Phone ..." 
                               className="userUpdateInput"
                               />
                               
                            </div>
                            <div className="userUpdateItem">
                                <label >Address</label>
                               <input
                               type="text"
                               placeholder="Address" 
                               className="userUpdateInput"
                               />
                               
                            </div>

                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img 
                                className="userUpdateImg"
                                src="../../Assets/images/alf1.jpeg"
                                 alt=""
                                 />
                                 <label htmlFor="file"><Publish className="userUpdateIcon" /></label>
                                 <input type="file" id="file" style={{display:"none"}}/>
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
