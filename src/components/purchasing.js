import axios from "axios";
import React, { useEffect, useState } from "react";
import "../CSS/purchasing.css"
function Purchasing() {
    const [allbook,setallbokk] = useState([]);

    useEffect(()=>
    {
        async function getpurchasingbook()
        {
           await axios.get("http://localhost:8070/getpurchasing").then((res)=>{
               setallbokk(res.data);
               console.log(res.data);
           })
        }
        getpurchasingbook();
    },[])
  return (
    <div className="tablepurchasing">
      <table className="table table-bordered purchasing" style={{"color":"white"}}>
        <thead style={{"textAlign":"center"}}>
          <tr>
            <td style={{"width":"5%"}}>RANK</td>
            <td style={{"width":"35%"}}>Name</td>
            <td>details</td>
            <td>manage</td>
          </tr>
        </thead>
       {
           allbook.map((listbook,index)=>(
            <tbody key ={index}>
            <tr>
              <td style={{"textAlign":"center"}}>{index}</td>
              <td><img src={listbook.images} alt="book" style={{"width":"100%","height":"100%"}}></img></td>
              <td>
                <table  className="table table-bordered purchasing" style={{"width":"100%","height":"100%","color":"white"}}>
                  
                   <tbody>
                       <tr>
                           <td>ชื่อ: </td>
                           <td>{listbook.name}</td>
                       </tr>
                       <tr>
                           <td>จำนวน: </td>
                           <td>{listbook.amount}</td>
                       </tr>
                       <tr>
                           <td>ราคา: </td>
                           <td>{listbook.price}</td>
                       </tr>
                       <tr>
                           <td>วันที่ทำการซื้อ: </td>
                           <td>{listbook.date}</td>
                       </tr>
                       <tr>
                           <td>เวลทำการสั่งซื้อ: </td>
                           <td>{listbook.time}</td>
                       </tr>
                       <tr>
                           <td>สถานะการสั่งซื้อ: </td>
                           <td className={listbook.status ==="สำเร็จ" ? 'statussuc':"statusfail"}>{listbook.status}</td>
                       </tr>
                   </tbody>
                </table>
              </td>
              <td>
                  <button type="button" className="btn btn-primary success">สำเร็จ</button>
                  <button type="button" className="btn btn-danger notsuccess">ไม่สำเร็จ</button>
              </td>
            </tr>
         
          </tbody>
           ))
       }
       
      </table>
    </div>
  );
}
export default Purchasing;
