import React from 'react'

export default function ReadOnlyData({user,newPage,deleteUser,handleEditFormChange}) {
  return (
    <tr>
    <td>{user.origin}</td>
    <td>{user.destination}</td>
    <td>{user.dateFrom}</td>
    <td>{user.dateTo}</td>
    <td>{user.min_miles}</td>
    <td>{user.adults}</td>
    <td>{user.class}</td>
    {/* <td>{user.min}</td> */}
    <td>
      <i className="fa fa-edit" onClick={()=>{handleEditFormChange(user.id)}} aria-hidden="true"></i>
      <i
        onClick={() => {
          newPage(user.id);
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
  )
}
