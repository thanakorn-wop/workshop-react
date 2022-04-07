import React, { useEffect,useState } from "react";
import Navbar from "./navbar";
import { useNavigate } from 'react-router-dom';
import "../CSS/booking.css"
import axios from "axios";
import pic from "../Images/หนูหิ่น.jpg"
function Booking()
{
    const [listbook,setbook] = useState([]);
    var cancelbook = {};
    var history = useNavigate();


    useEffect(()=>{
        async function getreservation()
        {
            await axios.get("http://localhost:8070/reservation").then((res)=>{
                console.log("reservation = ",res.data);
                setbook(res.data);
            })
        }
        getreservation()
    },[])
    async function cancelbooking(name)
    {
        cancelbook ={name:name};

        await axios.post("http://localhost:8070/delete",cancelbook)
      
        window.location.reload(false);

        // console.log("name dele",name)
    }
    
    return(
     <div className="bigbooking">
         <div className="title">
         <h2>RESERVATION</h2>
         </div>
         <div className="bookingbook">
         {
                listbook.map((qq,index) =>
              
                <div className="boxbook" key={index} >
                <div className="images">
                <img src={qq.images} alt="displayimage" style={{"width":"100%","height":"100%"}} />
                    {/* <img src= alt="display" style={{"width":"100%","height":"100%"}} /> */}
               
                </div>
                <div className="namebook" style={{"color":"white"}}>&ensp;{qq.name}</div>
                    <div className="price">
                        <input tyoe="text" className={"form-control " +qq.name} defaultValue={qq.amount} disabled style={{"width":"50%","textAlign":"center"}}></input>
                    </div>
                <div className="setbutton">
                   
                    <button type="button" className="btn btn-info"style={{"width":"50%"}}>ซื้อ</button>
                    <button type="button" className="btn btn-danger"style={{"width":"50%"}} onClick={()=>cancelbooking(qq.name)}>ยกเลิก</button>
                </div>
                </div>

                )
            }
         </div>

     </div>
    );

}
export default Booking;
