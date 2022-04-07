import React from "react";
import navbar from "./navbar";
import "../CSS/index.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Home(props) {
    const [data, setdata] = useState([]);
    const [imagesar, setimages] = useState([]);
    const [amount, setamount] = useState();
    const [pricebook, setprice] = useState();
    const [user,setuser] = useState();
    var img = [];
    var listbook = {};
    var buybook = {};
    useEffect(() => {
        //Runs only on the first render
        var check = true;
        //* get list book from database
        async function getbook() {
            await axios.get("http://localhost:8070").then((res) => {
                if(check)
                {
                    setdata(res.data);
                }
              

                console.log(res.data);
                return ()=>{check = false};
            });
        }
        getbook();
       
    }, []);
    function getbooking(name, price, images) {
        console.log("check = name  ", name, " amount = ", amount);
        if (amount > 0) {
            listbook = { name: name, amount: amount, price: price, images: images };
            console.log(listbook);
            postbooking(listbook);
        } else {
            alert("pls input amount more than 1 ");
        }
    }
    function getamount(amount) {
        setamount(amount.target.value);
        console.log("amount = ", amount.target.value);
    }
    function buybooking(name, price, images,amoun) {
        var sum = 0;
        var priceperamount = price*amount;
        var m = {};

        if (amount > 0) {
            if(amount < amoun)
            {
                if(amoun >0)
                {
                    if(props["money"]>priceperamount)
                    {
                        sum = props["money"]-priceperamount;
                        m = {money:sum};
                        buybook = { name: name, amount: amount, price: priceperamount, images: images };
                        postbuybooking(buybook);
                        updatemoney(m);
                        window.location.reload(false);
                    }
                    else{
                        alert("your money is not enough");
                    }
                }
                else{
                    alert("book sold out");
                }
            }
            else{
                alert("books not enough for you ")
            }
          
          
        } else {
            alert("pls input amount more than 1");
        }
    }
    async function postbooking(listbook) {
        await axios.post("http://localhost:8070/booking", listbook).then((res) => {
            if (res.status == 200) {
                console.log("OK");
            } else {
                console.log("NOT OK");
            }
        });
    }
    async function postbuybooking(buybook) {
      
        await axios.post("http://localhost:8070/buybook", buybook).then((res) => {
            if (res.status == 200) {
                console.log("OK");
            } else {
                console.log("NOT OK");
            }
        });
    }
    async function updatemoney(money)
    {
        await axios.post("http://localhost:8070/updateuser",money)
    }
    return (
        <div className="bigbox-book">
            <div className="workshop">
                <h2>WORK SHOP</h2>
            </div>
            <div className="book">
                {data.map((qq, index) => (
                    <div className="boxbook" key={index}>
                        <div className="images">
                            <img
                                src={qq.images}
                                alt="displaydata"
                                style={{ width: "100%", height: "100%" }}
                            />
                            {/* <h3>Images</h3> */}
                        </div>
                        <div className="namebook"style={{"textAlign":"center","color":"white"}}>{qq.name}</div>
                        <div className="price"style={{"color":"white"}}>&ensp;ราคา : {qq.price}</div>
                        <div className="amount" style={{"textAlign":"center"}}>
                            <input
                                tyoe="text"
                                className={"form-control " + qq.name}
                                onChange={getamount}
                                defaultValue="0"
                                style={{ width: "50%", textAlign: "center" }}
                            ></input>
                        </div>

                        <div className="setbutton">
                            <button
                                type="button"
                                className="btn btn-warning"
                                style={{ width: "50%" }}
                                onClick={() => getbooking(qq.name, qq.price, qq.images)}
                            >
                                จอง
                            </button>
                            <button
                                type="button"
                                className="btn btn-info"
                                style={{ width: "50%" }}
                                onClick={() => buybooking(qq.name, qq.price, qq.images,qq.amount)}
                            >
                                ซื้อ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home;
