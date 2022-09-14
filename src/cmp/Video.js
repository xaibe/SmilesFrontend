import React, { useState, useEffect } from "react";
// import { magnifyingGlass } from "react-icons/fa";
// import videoBg1 from "./videos/videoBg1.mp4";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";
// import Notifier from "react-desktop-notifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Spinner from "./Spinner";

// import FlightTable from "./FlightTable";
// import Table from "./Table";
// import FlightTable from "./FlightTable";

export default function Video(props) {

const [orgLabel, setOrgLabel] = useState("");
const [destLabel, setDestLabel] = useState("");
const [classLabel, setClassLabel] = useState("");
const [adultsLabel, setAdultsLabel] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    // formState: { errors },
  } = useForm();



  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const originUpperCase = (event) => {
    const result = event.target.value.toUpperCase();

    setOrigin(result);
  };

  const destinationUpperCase = (event) => {
    const result = event.target.value.toUpperCase();

    setDestination(result);
  };

  const handleSearch = async (data) => {
    console.log("main shazaib" , data);
    if (data) {
      const parseDate = (str) => {
        const [year, month, day] = str.split("-");

        const newDat = month + "-" + day + "-" + year;
        return newDat;
      };

      const newFromDate = parseDate(data.dateFrom);
      const newToDate = parseDate(data.dateTo);
      
      setOrgLabel(data.origin);
    setDestLabel(data.destination);
    setClassLabel(data.class);
    setAdultsLabel(data.adults);

      console.log("form data", data);
      const obj = {
        id: 1,
        dateFrom: newFromDate,
        dateTo: newToDate,
        adults: data.adults,
        class: data.class,
        notification:data.notification,
        stop:data.stop,
        destination: data.destination,
        origin: data.origin,
        min_miles: data.min_miles,
      };
      const newResponse = await userActionOnSearch(obj);
      console.log("newResponse in search", newResponse);
      if (newResponse) {
        if (newResponse.status === 201) {
          if( newResponse.data.length===0){
            toast("No Flights Found");
          }
          else{
            toast("opration Successfull");  
          }
          
          // window.location.reload();
        } else {
          console.log("recieved error");
          toast("Error! please input correct information");
        }
      } else {
        console.log("recieved error");
        toast("Error! please input correct information");
        // window.location.href = '/sidebar';
      }

      //window.location.href = '/';
    }
  };

  const userActionOnSearch = async (data) => {
    try {
      let url;

      // let Usr = document.getElementById("select").value;

      // if (Usr === "byflight") {
      if (data.min_miles === null || data.min_miles === "") {
        
          url = "https://smiles-helper.herokuapp.com/miles/searchOnly";
          console.log("data hu without min miles");  
        
      } else {
        
        url = "https://smiles-helper.herokuapp.com/smiles/searchOnly";
        console.log("data hu min miles");
      
    }

      // } else if (Usr === "bydestination") {
      // url = "https://smiles-helper.herokuapp.com/smiles/addByDestination";
      //  }
      // else {
      //   toast("please chose one option above");
      // }
console.log("data in search",data);
      const response = await axios.post(url, data);

      if (response) {
        
        
        console.log("response of search", response);
        setData1(response.data);
        
        return response;
        // window.location.reload();
      } else {
        toast("Error! Unable to Search, Please Try again");
      }
      
    } catch (error) {
      toast(error);
      //   toast(error);
      console.log("catch in fetch", error);
    }
  };
  const onSubmit = async (data) => {
    // alert(JSON.stringify(data));
    if (data) {
      console.log("form data", data);
      const newResponse = await userAction(data);
      console.log("newResponse", newResponse);
      if (newResponse) {
        if (newResponse.status === 201) {
          toast("opration Successfull");

          // window.location.reload();
        } else {
          console.log("recieved error");
          toast("Error! please input correct information");
        }
      } else {
        console.log("recieved error");
        toast("Error! please input correct information");
        // window.location.href = '/sidebar';
      }

      //window.location.href = '/';
    }
   
  };



  const userAction = async (data) => {
    try {
      let url;
      console.log("data noti", data.notification);
      console.log("data noti", data.stop);

let obj;    

      if (data.min_miles === null || data.min_miles === "") {
        url = "https://smiles-helper.herokuapp.com/miles/addByDestination";
         obj=
        {
          "flight": "",
          "dateFrom": data.dateFrom,
          "dateTo":data.dateTo,
          "destination": data.destination,
          "notification": data.notification,
          "stop":data.stop,
          "origin": data.origin,
          "adults": data.adults,
          "class": data.class,
        }
        console.log("data hu without min miles");
      } else {
        url = "https://smiles-helper.herokuapp.com/smiles/addByDestination";
       obj=
        {
          "flight": "",
          "dateFrom": data.dateFrom,
          "dateTo":data.dateTo,
          "destination": data.destination,
          "notification": data.notification,
          "stop":data.stop,
          "origin": data.origin,
          "adults": data.adults,
          "class": data.class,
          "min_miles":data.min_miles
        }
        console.log("data hu min miles");
      }
      // } else if (Usr === "bydestination") {
      // url = "https://smiles-helper.herokuapp.com/smiles/addByDestination";
      //  }
      // else {
      //   toast("please chose one option above");
      // }

      const response = await axios.post(url, obj);

      if (response) {
        console.warn(response);

        const newUrl =
          "https://smiles-helper.herokuapp.com/smiles/findByDestination";
        await getIt(newUrl);

        // window.location.reload();
      } else {
        toast("Error! Unable to delete, Please Try again");
      }
      return response;
    } catch (error) {
      toast(error);
      //   toast(error);
      console.log("catch in fetch", error);
    }
  };
  
  const newPage = async (user) => {
   let arr=[];
    setData1(arr);
    setOrgLabel(user.origin);
    setDestLabel(user.destination);
    setClassLabel(user.class);
    setAdultsLabel(user.adults);
   
 
    const newUrl = "https://smiles-helper.herokuapp.com/smiles/" + user.id;
    const response = await axios.get(newUrl);
 
 if(response)   {
  if(response.data.length===0){
    toast('No Best Miles Found Yet');
 
  } else{
    console.log("response HU HEADER WALA", response);
    setData1(response.data);
    
 
     }
  }
 else{
toast('No Best Miles Found Yet');
 }
  };

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [order1, setOrder1] = useState("ASC");
  const [order2, setOrder2] = useState("ASC");

 

// const sortingBoolean = (col) => {
//   if (order2 === "ASC") {
    
//       // true values first
//       // false values first
//       // return (x === y)? 0 : x? 1 : -1;
   
//     const sorted2 =[...data1].sort((a, b)=>( (a[col] > b[col])? 0 : a[col]? 1 : -1));
//     //  [...data1].sort((a, b) => (a[col] > b[col] ? 1 : -1));
//     console.log("sorted2",sorted2);
//     setData(sorted2);
//     setOrder("DSC");
//   }
//   if (order2 === "DSC") {
//     const sorted2 = [...data1].sort((a, b) => (a[col] < b[col] ? 1 : -1));
//     setData1(sorted2);
//     setOrder2("ASC");
//   }
// };

  const sorting2 = (col) => {
    console.log("Sorting2", col);
    if (order2 === "ASC") {
      const sorted2 = [...data1].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData1(sorted2);
      setOrder2("DSC");
    }
    if (order2 === "DSC") {
      const sorted2 = [...data1].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData1(sorted2);
      setOrder2("ASC");
    }
  };

  const sorting1 = (col) => {
    console.log("Sorting1", col);
    if (order1 === "ASC") {
      const sorted1 = [...data1].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setData1(sorted1);
      setOrder1("DSC");
    }
    if (order1 === "DSC") {
      const sorted1 = [...data1].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setData1(sorted1);
      setOrder1("ASC");
    }
  };
  const sorting6 = (col) => {
    console.log("Sorting1", col);
    if (order1 === "ASC") {
      // dates.sort((date1, date2) => date1 - date2)

      // cars.sort((a, b) => Date.parse(new Date(a.bestMilesdate.split("/").reverse().join("-"))) - Date.parse(new Date(b.bestMilesdate.split("/").reverse().join("-"))))
      const sorted1 = [...data1].sort((a, b) => Date.parse(new Date(a.bestMilesdate.split("/").reverse().join("-"))) - Date.parse(new Date(b.bestMilesdate.split("/").reverse().join("-"))));
   
      setData1(sorted1);
      setOrder1("DSC");
    }
    if (order1 === "DSC") {
      const sorted1 = [...data1].sort((a,b) => {
        return new Date(a.bestMilesdate) - 
            new Date(b.bestMilesdate)
    }).reverse();
      setData1(sorted1);
      setOrder1("ASC");
    }
  };

  const sorting = (col) => {
    console.log("Sorting", col);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };
  const sorting4 = (col) => {
    console.log("Sorting", col);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col] > b[col] ? -1 : 1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col] < b[col] ? -1 : 1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };
  const sorting5 = (col) => {
    console.log("Sorting", col);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLocaleString() > b[col].toLocaleString() ? -1 : 1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLocaleString() < b[col].toLocaleString() ? -1 : 1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  useEffect(() => {
    OnPageLoad();
  }, []);
  let dateFrom;

  async function OnPageLoad() {
    
    const newUrl =
      "https://smiles-helper.herokuapp.com/smiles/findByDestination";
    const response = await axios.get(newUrl);
    console.log("recieved data on page load",response);
    setData(response.data);
    
    setOrgLabel('Origin');
    setDestLabel('Destination');
    setClassLabel('Class');
    setAdultsLabel('Adults');
    console.log();
    dateFrom = new Date();
    dateFrom = dateFrom.toISOString().slice(0, 10);
    const datePicker = document.getElementById("dateFrom");
    datePicker.min = dateFrom;

    const datePickerTo = document.getElementById("dateTo");

    datePickerTo.min = dateFrom;
  }

  const [text, setText] = useState("");
  const handleChang = (e) => {
    setText(e.target.value);
    const datePicker = document.getElementById("dateTo");
    console.log("value",e.target.value);
    const dateTo = moment(e.target.value).format("yyyy-MM-DD");
    datePicker.min = dateTo;
  };

  async function getIt(newUrl) {
    const response = await axios.get(newUrl);
    setData(response.data);
  }

  async function deleteUser(id) {
    let url = `https://smiles-helper.herokuapp.com/smiles/${id}`;
    const response = await axios.delete(url);
    if (response) {
      console.warn(response);
      const newUrl =
        "https://smiles-helper.herokuapp.com/smiles/findByDestination";
      await getIt(newUrl);

      // window.location.reload();
    } else {
      toast("Error! Unable to delete, Please Try again");
    }
  }

  async function gotNewNotification() {
    const url1 = "https://smiles-helper.herokuapp.com/smiles/findByDestination";
    const response = await axios.get(url1);
    const newValue = response.data;

    console.log("this is newvalue", newValue.length);

    newValue.forEach(async (i) => {
      console.log("i ki value", i);
      const obj = {
        flight: i.flight,
        dateFrom: i.dateFrom,
        dateTo: i.dateTo,
        destination: i.destination,
        origin: i.origin,
        min_miles: i.min_miles,
      };
      console.log("obj ki value", obj);
      const url2 = "https://smiles-helper.herokuapp.com/smiles/search";

      const response1 = await axios.post(url2, obj);
      // const
      console.log("response1", response1);
    });

    //Here will pop a notifier and always open in a new window when clicked.
    // Notifier.start("Title","Here is context");

    //Here will pop notifier and open in a specified name window "popwin1" when clicked.
    // Notifier.start("Title","Here is context","www.google.com","validated image url","popwin1");

    //Here will pop notifier and focus parent window only when clicked.
    // Notifier.focus("Title","Here is context","www.google.com","validated image url");
  }

  const MINUTE_MS = 300000;

  useEffect(() => {
    const interval = setInterval(() => {
      gotNewNotification();
      console.log("Logs every minute");
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
  

 
  const handleWeb = (user)=>{
    console.log("Link for website", user);

    const parseDate = (str) => {
      const [month, day, year] = str.split("-");

      const newDat = year + "-" + month + "-" + day;
      return newDat;
    };

const newDate=parseDate(user.bestMilesdate)
    const date= moment(newDate, 'YYYY-MM-DD HH:mm:ss').valueOf();
    console.log("new date",date);
          const url =  "https://www.smiles.com.ar/emission?originAirportCode="+                                       
          orgLabel +"&destinationAirportCode="+destLabel+"&departureDate="+date+ "&adults="+adultsLabel+"&children=0&infants=0&isFlexibleDateChecked=false&tripType=2&cabinType="+classLabel+"&currencyCode=BRL"
        console.log("main smiles searcg hu", url);
        window.open(url, "_blank");
        // window.location.href = url;
        }
  
   const RerenderTable = () => {
    return data1.map((user, index) => {
      return (
        <>
            <tr key={index}>
            <td onClick={()=>handleWeb(user)}>{user.bestMilesdate}</td>
            <td>{(user.bestMiles).toLocaleString().replaceAll(',', '.')}</td>
            <td>{user.stop}</td>
            <td>{user.duration}</td>
            <td>{user.airline}</td>

            
            {/* <td>{user.lastActivity}</td> */}

            {/* <td> */}
            {/* <button
                    className="btn btn-sm btn-primary"
                    onClick={() => deleteUser(user.id)}
                  >
                    delete
                  </button> */}
            {/* </td> */}
          </tr>
        </>
      );
    });
  };
  
  const renderTable = () => {
    
    return data.map((user, index) => {
      return (
        
        <tr key={index}>
          { 
           user.notified === false && user.notification === true ? <td><i className="fa fa-bell" style={{color : "red"}} /></td> : <>{user.notification ? <td><i className="fa fa-bell" /></td> : <td>{null}</td> }</>
            }
         
          <td>{user.origin}</td>
          <td>{user.destination}</td>
          <td>{user.dateFrom}</td>
          <td>{user.dateTo}</td>
          <td>{user.min_miles === null ? null : parseInt(user.min_miles).toLocaleString().replaceAll(',', '.') }</td>
          <td>{user.adults}</td>
          <td>{user.class}</td>


           {user.stop ? <td><i className="fa fa-check"/></td> :  <td>{null}</td>}
          <td>
            <i
              onClick={() => {
                newPage(user);
              }}
              className="fa fa-search"
              aria-hidden="true"
            ></i>
            <i
              onClick={() => deleteUser(user.id)}
              className="fa fa-trash"
              aria-hidden="true"
              ></i>
              
          </td>

          
        </tr>
     
      );
    });
  }; 

  //    function numberSeparator(x) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }
  // // get all second tds
  // [...document.querySelectorAll('#table tr > td:nth-child(5) input')].forEach(e => {
  //     // get text content and update
  //     e.value =  numberSeparator(e.value.trim());
  // })
  // const [date, setDate] = useState();
  const [minDate, setMinDate] = useState(null);
  const input = {
    width:"50px"
  }
  
  return (
    <React.Fragment>
      <div className="main">
        <div className="navbar">
          <h1>{props.title}</h1>
        </div>
      </div>
      <div className="form-container">
        

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="origin">
            <label>Origin</label>
            <input
              className="origin-input"
              value={origin}
              maxLength={3}
              type="text"
              // placeholder="Origin"
           
              {...register("origin", { onChange: originUpperCase })}
            />
          </div>
          <div className="destination">
            <label>Destination</label>
            <input
            className="destination-input"
           
              maxLength={3}
              value={destination}
              type="text"
              // placeholder="Destination"
              {...register("destination", {
                onChange: destinationUpperCase,
              })}
            />
          </div>
          <div className="min_miles">
            <label>Miles</label>
            <input
              type="number"
              id="numbers"
              placeholder="Miles"
              className="miles w-50"
              // style={{width:"100px"}}
              {...register("min_miles")}
            />
          </div>
          <div className="search-btn">
          <button
              className="btn btn-primary"
              type="button"
              form="my-form"
              onClick={() => handleSearch(getValues())}
            >
              <i className="fa fa-search mx-1 text-white" aria-hidden="true" />
              Search
            </button>
            </div>

            <div className="dateform" >
            
          <div className="dateFrom">
            <label>Date From</label>
            <input
            style={{width:"150px"}}
              type="date"
              id="dateFrom"
              value={text}
              {...register("dateFrom", { onChange: handleChang })}
            />
            </div>
          <div className="dateTo">
            <label>Date To</label>
            <input
              type="date"
              id="dateTo"
              {...register("dateTo")}
              style={{ width:"150px" }}
            />
          </div>
          
          </div>
          
          <div className="buttons">
           
           <button className="btn btn-primary" type="submit">
             <i className="fa fa-add mx-2" aria-hidden="true" />
             Add
           </button>
         </div>


          <div className="adults">
            <label>Adults</label>
            <select style={{ marginRight:"-15px"}} {...register("adults")}   >
              
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
              </div>
              <div className="class">
            <label style={{ marginLeft: "9px" }}>Class</label>
            <select {...register("class")} style={{ width: "70px" }}>
             
              <option value="Economic">Economic</option>
              <option value="business">Executive</option>
            </select>
          </div>

         
          <div
          className=" form-switch nonStop"
          style={{ display: "flex" }}
        >
          <label style={{ marginRight: "50px" }}>Non Stop</label>
          <input
          //value={nonStop}
          // onChange={handleNonStop}
           
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            {...register("stop")}
          />
          </div>
          <div
          className=" form-switch noti " style={{ padding: "0" }}>
          
        
          <label style={{ marginRight: "50px" }}><i className="fa fa-bell"/></label>
          <input
            //  value={noti}
            //  onChange={handlenoti}
            className="form-check-input pl-0"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            {...register("notification")}
          />
          </div>
         
        </form>
      </div>

      <div className="table table-container" >
        <div>
          <table id="users">
            <thead style={{ backgroundColor: "rgba(0, 0, 0, 0.73)" }}>
              <tr>
                <th onClick={() => sorting5("notification")}>Alert</th>
                <th onClick={() => sorting("origin")}>Origin</th>

                <th  onClick={() => sorting("destination")}>Destination</th>
                <th onClick={() => sorting("dateFrom")}>Date From</th>
                <th onClick={() => sorting("dateTo")}>Date To</th>
                <th onClick={() => sorting4("min_miles")}>Miles</th>
                <th onClick={() => sorting("adults")}>Adults</th>
                <th onClick={() => sorting("class")}>Class</th>
                <th onClick={() => sorting5("stop")} >Stops</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>
      </div>
      {/* <FlightTable/> */}
      <div className="main-header-value">
        <div>

        <h1 style={{display:"inline-block"}}>{orgLabel} &rarr;</h1>
        
        <h1 style={{display:"inline-block", marginLeft:"5px"}}>{destLabel}</h1>
        <h1 style={{display:"inline-block", marginLeft:"5px"}}>({classLabel})</h1>
       
        </div>
        <table
          id="users"
          style={{ overflow: "auto", width: "100%", margin: "0" }}
        >
          <thead
            style={{ backgroundColor: "rgba(0, 0, 0, 0.73)", width: "100%" }}
          >
            <tr>
              <th onClick={() => sorting6("bestMilesdate")}>Date</th>
              <th onClick={() => sorting2("bestMiles")}>BestPrice</th>
              <th onClick={() => sorting2("stop")}>Stops</th>
              <th onClick={() => sorting1("duration")}>Duration</th>
              <th onClick={() => sorting1("airline")}>Airline</th>
             
            </tr>
          </thead>
          <tbody>{RerenderTable()}</tbody>
        </table>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
