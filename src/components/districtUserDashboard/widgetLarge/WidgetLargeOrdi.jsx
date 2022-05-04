import React from "react";
import "./widgetLarge.css";

export default function WidgetLarge() {
  return (
      <>
       <div className="widgetLarge">
      
        
       <h3 className="widgetLargeTitle">Student Performance in S3</h3>
      <table className="widgetLargeTable">
        <tr className="widgetLargeTr">
          <th className="widgetLargeTh">Student Name</th>
          <th className="widgetLargeTh">Student Code</th>
          <th className="widgetLargeTh">Assessment</th>
          <th className="widgetLargeTh">Level</th>
          <th className="widgetLargeTh">%</th>
        </tr>
        <tr className="widgetLargeTr">
          <td className="widgetLargeUser">
            <span className="widgetLargName">Mirindi Sagi</span>
            
          </td>
          <td>
          <span className="widgetLargName">STD-1234</span>
          </td>
          <td className="widgetLargeDate">English</td>
          <td className="widgetLargeAmount">S3</td>
          <td className="widgetLargeAmount">90%</td>
        </tr>
        <tr className="widgetLargeTr">
          <td className="widgetLargeUser">
            <span className="widgetLargName">Uwera Ange</span>
            
          </td>
          <td>
          <span className="widgetLargName">STD-256</span>
          </td>
          <td className="widgetLargeDate">English</td>
          <td className="widgetLargeAmount">S3</td>
          <td className="widgetLargeAmount">50%</td>
        </tr>
        <tr className="widgetLargeTr">
          <td className="widgetLargeUser">
            <span className="widgetLargName">Ismael Kagabo</span>
            
          </td>
          <td>
          <span className="widgetLargName">STD-45674</span>
          </td>
          <td className="widgetLargeDate">English</td>
          <td className="widgetLargeAmount">S3</td>
          <td className="widgetLargeAmount">70%</td>
        </tr>
      </table>

     
    </div>

  
     
      </>
   
  );
}
