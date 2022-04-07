import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/index"
import {Routes} from 'react-router-dom';
import Booking from "./components/booking";
import Purchasing from "./components/purchasing";
import React, { useEffect, useState } from "react";
import "./CSS/navbar.css"
import { NavLink, Link } from "react-router-dom"
import axios from "axios";
function Navbar(props) {
  const [user,setuser] = useState([]);
  useEffect(()=>{
      async function user()
      {
          await axios.get("http://localhost:8070/user").then((res)=>{
              setuser(res.data[0]["money"]);
              console.log("User = ",res.data[0]["money"]);
              props.onadd(res.data[0]["money"]);
          })
      }
      user();
  },[])
return (
 
 
 <nav>
     <div className="Logo">
        <div className="textlogo">
            <h3>BOOK</h3>
        </div>

    </div><ul className="bar">

            <NavLink to="/"><li className="link">รายการหนังสือ</li></NavLink>
            <NavLink to="/home"><li className="link">รายการโปรด</li></NavLink>
            <NavLink to="/booking"><li className="link">รายการสั่งจอง</li></NavLink>
            <NavLink to="/purchasing"><li className="link">รายการสั่งซื้อ</li></NavLink>
        </ul><div className="money">
            <h4>{user}</h4>
        </div>
 </nav>
 
 
);
}
function App() {
  const [money,setmoney]= useState();
  function onadd(money)
  {
    console.log("onadd = ",money);
    setmoney(money);

  }
  return (
  //   <Switch>
  //   <Route exact path="/" component={navbar} />
   
  // </Switch>
    <>
       <Router>
         <Navbar  onadd={onadd} />
      <Routes>
        <Route path="/"  element={<Home money={money}/>} />
        <Route path="/booking"  element={<Booking />} />
        <Route path="/purchasing"  element={<Purchasing />} />
        
        
         </Routes>
        
    </Router>
    </>
    
  );
}

export default App;
