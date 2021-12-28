import React from 'react'
import './widgetLarge.css';

export default function WidgetLarge() {
    
    return (
        <div className="widgetLarge">
            <h3 className="widgetLargeTitle">Top 10 Schools</h3>
            <table className="widgetLargeTable">
                <tr className="widgetLargeTr">
                    <th className="widgetLargeTh">Shoool Name</th>
                    <th className="widgetLargeTh">District</th>
                    <th className="widgetLargeTh">Level</th>
                    <th className="widgetLargeTh">%</th>
                </tr>
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">
                     
                       <span className="widgetLargName">Saint Ignas</span>
                   </td>
                   <td className="widgetLargeDate">Gasabo</td>
                   <td className="widgetLargeAmount">S3</td>
                   <td className="widgetLargeAmount">90%</td>
                </tr>
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">
                   
                       <span className="widgetLargName">Remara Catholic</span>
                   </td>
                   <td className="widgetLargeDate">Nyarugenge</td>
                   <td className="widgetLargeAmount">S3</td>
                   <td className="widgetLargeAmount">50%</td>
                </tr>
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">
                      
                       <span className="widgetLargName">GSU I</span>
                   </td>
                   <td className="widgetLargeDate">Rubavu</td>
                   <td className="widgetLargeAmount">S3</td>
                   <td className="widgetLargeAmount">70%</td>
                </tr>
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">
                      
                       <span className="widgetLargName">Saint Joseph</span>
                   </td>
                   <td className="widgetLargeDate">Rwamagana</td>
                   <td className="widgetLargeAmount">S3</td>
                   <td className="widgetLargeAmount">45%</td>
                </tr>

            </table>
        </div>
    )
}
