import React from 'react'

export default function Results({user}) {
  return (
    <tr key={user.id}>
            <td>{user.search.origin}</td>
            <td>{user.search.destination}</td>
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
      
  )
}
