import React from 'react'
import './ordinaryLevelWidgetLarge.css';
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdinaryLevelWidgetLarge() {

    const [data,setData]=useState([]);
    console.log("all data",data)
    useEffect(() => {
        async function fetchData() {
          const genderSet = [];
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
            .get(
              `http://localhost:8000/results/topordinarylevelresult`,
              {
                headers: headers,
              }
            )
            .then(function(response) {
              const res = response.data.data;
              return res;
            })
            .then(function(res) {
              
              setData(res)
              
            //   for (const val of res) {
            //     const schoolName=val['school.name'];
            //     console.log("schoool name", schoolName)
            //   } 
            })
            .catch(function(error) {
              console.log("error", error);
            });
        }
        fetchData();
      }, []);
    
    return (
        <div className="widgetLarge">
            <h3 className="widgetLargeTitle">S3 schools Performance</h3>
          
            <table className="widgetLargeTable">
                <tr className="widgetLargeTr">
                    <th className="widgetLargeTh">Shoool Name</th>
                    <th className="widgetLargeTh">Level</th>
                    <th className="widgetLargeTh">%</th>
                </tr>
                {
                !data? null:(data.map((d)=> (
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">  
                <span className="widgetLargName">{d['school.name']}</span>
                   </td>
                   <td className="widgetLargeAmount">S3</td>
                   <td className="widgetLargeAmount">{(d['results.avarage'])}%</td>
                </tr>
                           )))
                        }
            </table>
    
        </div>
    )
}
