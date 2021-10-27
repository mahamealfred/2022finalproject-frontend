import React from 'react'
import './widgetLarge.css';

export default function WidgetLarge() {
    const Button=({type})=>{
        return <button className={"widgetLargeButton " + type}>{type}</button>
    }
    return (
        <div className="widgetLarge">
            <h3 className="widgetLargeTitle">Latest Transactions</h3>
            <table className="widgetLargeTable">
                <tr className="widgetLargeTr">
                    <th className="widgetLargeTh">Customer</th>
                    <th className="widgetLargeTh">Date</th>
                    <th className="widgetLargeTh">Amount</th>
                    <th className="widgetLargeTh">Status</th>
                </tr>
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">
                       <img src="../../Assets/images/alf1.jpeg" alt=""
                       className="widgetLargeImg"
                       />
                       <span className="widgetLargName">umutoni aime</span>
                   </td>
                   <td className="widgetLargeDate">1 Jun 2021</td>
                   <td className="widgetLargeAmount">$ 100,2400</td>
                   <td className="widgetLargeStatus"><Button type="Approved"/></td>
                </tr>
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">
                       <img src="../../Assets/images/alf1.jpeg" alt=""
                       className="widgetLargeImg"
                       />
                       <span className="widgetLargName">kalisa isaac</span>
                   </td>
                   <td className="widgetLargeDate">1 Jun 2021</td>
                   <td className="widgetLargeAmount">$ 100,2400</td>
                   <td className="widgetLargeStatus"><Button type="Declined"/></td>
                </tr>
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">
                       <img src="../../Assets/images/alf1.jpeg" alt=""
                       className="widgetLargeImg"
                       />
                       <span className="widgetLargName">Ange uwera</span>
                   </td>
                   <td className="widgetLargeDate">1 Jun 2021</td>
                   <td className="widgetLargeAmount">$ 100,2400</td>
                   <td className="widgetLargeStatus"><Button type="Approved"/></td>
                </tr>
                <tr className="widgetLargeTr">
                   <td className="widgetLargeUser">
                       <img src="../../Assets/images/alf1.jpeg" alt=""
                       className="widgetLargeImg"
                       />
                       <span className="widgetLargName">kagabo isa</span>
                   </td>
                   <td className="widgetLargeDate">1 Jun 2021</td>
                   <td className="widgetLargeAmount">$ 100,2400</td>
                   <td className="widgetLargeStatus"><Button type="Pending"/></td>
                </tr>

            </table>
        </div>
    )
}
