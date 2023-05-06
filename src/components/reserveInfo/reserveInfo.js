import React from "react";
import './reserveInfo.css'

    const information={
        store:{
            id:"misicIdblabla1231",
            imgUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2021/10/26/8f82be9c22ec2f4f9ab25363cc611b141.jpg",
            store_name:"미식성",
            Location:"광운대 앞",
            deposit: 12
        },
        dateInfo:{
            date:"2023.11.16",
            time:"18:00",
            man:2,
        }
    }

function PrintInformation(){
    const store= information.store;
    // useEffect(()=>{
    //     axios.get(`http://${process.env.REACT_APP_SERVER_HOST}/store/list`)
    //     .then((res)=>{
    //         const totalStore=res.data.map((store)=>({
    //             id:store.id,
    //             imgUrl:store.imgUrl,
    //             storeName:store.store_name,
    //             location:store.location,
    //             deposit:store.deposit,
    //             periodList:[
    //                 {
    //                   index:1,
    //                   startTime:"10:00",
    //                   endTime:"11:00"
    //                 },
    //                 { index:2,
    //                   startTime:"11:00",
    //                   endTime:"12:00"
    //                 },
    //                 {
    //                   index:3,
    //                   startTime:"12:00",
    //                   endTime:"13:00"
    //                 }
    //               ],
    //         }));
    //         storeDispatch({type:"LOAD_STORE_LIST",totalStore:totalStore});
    //     })
    // },[]);
        //어떻게 호출하는지 몰라서 일단 가져옴


    return ( 
        <div>
            <div className="upperInfo"> 
                <img src={store.imgUrl} alt="사진"/>
                <div><p><span>Store</span> : {store.store_name}</p>
                <p><span>Location </span>: {store.Location}</p>
                <p><span>Reservation Detail</span></p>
                <p><span>Date:</span>{information.dateInfo.date}  <span>Day:</span>{information.dateInfo.time}</p>
                </div>
               </div>
            <div className="downInfo" >
                <p style={{fontSize:"1.5em"}}><span>Price Detail</span></p>
                <p><span>Each Price:</span>{store.deposit}</p>
                <p><span>Number Of People</span>{information.dateInfo.man}</p>
                <p><span>totle: </span>{(information.dateInfo.man)*(store.deposit)}BNB</p>


            </div>


        </div>

    )



}

export default PrintInformation;