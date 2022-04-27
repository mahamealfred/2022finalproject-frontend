import React from 'react'
import './widgetLarge.css';
import { useEffect, useState } from "react";
import axios from "axios";
export let p6schoolPerformance=[]
export default function WidgetLarge() {

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
              `http://localhost:8000/results/topprimaryschool`,
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
              p6schoolPerformance=res
              
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
            <h3 className="widgetLargeTitle">P6 schools Performance</h3>
          
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
                   <td className="widgetLargeAmount">P6</td>
                   <td className="widgetLargeAmount">{(d['results.avarage']).toFixed(2)}%</td>
                </tr>
                           )))
                        }
            </table>
    
        </div>
    )
}
