// import FetchApi from './cmp/FetchApi';
// import Flight from './cmp/Flight';
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Video from "./cmp/Video";
// import Header from './cmp/Header';
import React, { useEffect } from "react";
import axios from "axios";
import Notifier from "react-desktop-notifications";

function App() {
  async function gotNewNotificationWithoutMiles() {
    console.log("entered checking notifications");
    const url1 =
      "https://smiles-helper.herokuapp.com/miles/findWithoutMinMiles";
    const response = await axios.get(url1);
    const newValue = response.data;
    let url2;
    console.log("New value of all destination", newValue);
    newValue.forEach(async (i) => {
      console.log("i ki value", i);
      const obj = {
        id: i.id,
        dateFrom: i.dateFrom,
        dateTo: i.dateTo,
        destination: i.destination,
        origin: i.origin,
        adults: i.adults,
        class: i.class,
        notification : i.notification,
        stop: i.stop
      };
      url2 = "https://smiles-helper.herokuapp.com/miles/searchAllMiles";

      const response1 = await axios.post(url2, obj);

      if (response1) {
        if (response1.data.message) {
        } else {
          console.log("response1", response1);
        }
      }
});

    //for showing notifier
    const newResponse = await axios.get(url1);
    const newResponseValue = newResponse.data;
    console.log("New value of all destination", newResponseValue);
    newResponseValue.forEach(async (i) => {
      if(i.notification===true){
      console.log("bestPrice:", i.BestPrice);
      const newArr = i.BestPrice;
      console.log("newArr", newArr);
      newArr.forEach(async (y) => {
        if (y.notified === false) {
          const title = "New Best Miles found for id = " + i.id;
          const context =
            "The Date for the New Best Mile is= " +
            y.bestMilesdate +
            "& the Best Mile is =" +
            y.bestMiles;
          Notifier.start(title, context);
          const urlForNotifier =
            "https://smiles-helper.herokuapp.com/smiles/updateNotified/" + y.id;
          const newResponse = await axios.post(urlForNotifier);
          console.log("response foe notifier update", newResponse);
        }
      });
    } 
   });
  }

  async function gotNewNotification() {
    console.log("entered checking notifications");
    const url1 = "https://smiles-helper.herokuapp.com/smiles/findByDestinationWithMiles";
    const response = await axios.get(url1);
    const newValue = response.data;
    let obj;
    let url2;
    console.log("New value of all destination", newValue);
    newValue.forEach(async (i) => {
      console.log("i ki value", i);

      obj = {
        id: i.id,
        dateFrom: i.dateFrom,
        dateTo: i.dateTo,
        destination: i.destination,
        origin: i.origin,   
        notification: i.notification,
        stop: i.stop,
        min_miles: i.min_miles,
        adults: i.adults,
        class: i.class,
      };
      url2 = "https://smiles-helper.herokuapp.com/smiles/search";

      const response1 = await axios.post(url2, obj);

      if (response1) {
        if (response1.data.message) {
        } else {
          console.log("response1", response1);
        }
      }
    });

    //for showing notifier
    const newResponse = await axios.get(url1);
    const newResponseValue = newResponse.data;
    console.log("New value of all destination", newResponseValue);
    newResponseValue.forEach(async (i) => {
      if(i.notification===true){
      console.log("bestPrice:", i.BestPrice);
      const newArr = i.BestPrice;
      console.log("newArr", newArr);
      newArr.forEach(async (y) => {
        if (y.notified === false) {
          const title = "New Best Miles found for id = " + i.id;
          const context =
            "The Date for the New Best Mile is= " +
            y.bestMilesdate +
            "& the Best Mile is =" +
            y.bestMiles;
          Notifier.start(title, context);
          const urlForNotifier =
            "https://smiles-helper.herokuapp.com/smiles/updateNotified/" + y.id;
          const newResponse = await axios.post(urlForNotifier);
          console.log("response foe notifier update", newResponse);
        }
      });
    }
    });

    //Here will pop a notifier and always open in a new window when clicked.
    // Notifier.start("Title","Here is context");

    //Here will pop notifier and open in a specified name window "popwin1" when clicked.
    // Notifier.start("Title","Here is context","www.google.com","validated image url","popwin1");

    //Here will pop notifier and focus parent window only when clicked.
    // Notifier.focus("Title","Here is context","www.google.com","validated image url");
  }

  async function newCheck() {
    console.log("Logs every hour");
    await gotNewNotificationWithoutMiles();
    await gotNewNotification();
  }
  const MINUTE_MS = 120000;

  useEffect(() => {
    const interval = setInterval(() => {
      newCheck()
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  });

  return (
    <div className="App">
      {/* <FetchApi/> */}
      {/* <Header/> */}
      <Video title="smiles:)" />
      {/* <Flight/> */}
    </div>
  );
}

export default App;
