import React from 'react';
import {useForm} from 'react-hook-form';

export default function EditAbleData() {
   
    const input_styles = {
        width: "100%"
    }
  return (
    

    
    <tr>
        <td>  <input
        type="text"
        placeholder="Origin"
        style={input_styles}
      
      />
   </td>
        <td> <input
        type="text"
        placeholder="Destination"
        style={input_styles}
      /></td>
        <td> <input
        type="date"
        id="dateFrom"
        style={input_styles}
      /></td>
        <td><input
        type="date"
        id="dateTo"
        style={input_styles}
      />
 </td>
        <td>
      <input
        type="number"
        id="numbers"
        placeholder="Miles"
        style={input_styles}
        
      /></td>
        <td>   <select style={input_styles} >
        <option value="">Adults</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select></td>
     
     <td><select >
        <option value="all" style={input_styles}>Class</option>
        <option value="business">Exective</option>
        <option value="Economic">Economic</option>
      </select>
 </td>      
 </tr>
  )
}
