import React, { useEffect, useState } from "react";
import axios from "axios";
// import { a } from "react-router-dom";
import "./Header.css";

function Header() {
  let [data, setData] = useState([]);

  useEffect(() => {
    getIt();
  }, []);

  async function getIt()  {
    const bestId = localStorage.getItem("bestId");
    console.log("bestId in header js", bestId);
   
  }

  const renderTable = () => {
    return data.map((user) => {
      return (
        <>
          <tr key={user.id}>
            <td>{user.searchId}</td>
            <td>{user.bestMiles}</td>
            <td>{user.bestMilesdate}</td>
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

  return (
    <>
    
    </>
  );
}

export default Header;
