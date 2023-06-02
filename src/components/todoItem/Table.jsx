import React from "react" 
import './Table.css'
import { translations } from "../../translations";

const Table = ({list, currLang}) => {
    return (
    <center>      
        <table>
  <tbody>
    <tr>
      <th>{translations['identificator_' + currLang]}</th>
      <th>{translations['coefficent_' + currLang]}</th>
      <th>{translations['name_' + currLang]}</th>
    </tr>

    {list.length > 0 && (
      list.map(item => (
        <tr key={item.id}>
          <td>{item.id ?? '---'}</td>
          <td>{item.coefficient_crop ?? '---'}</td>
          <td>{item['name_' + currLang] ?? '---'}</td>
        </tr>
      ))
    )}
  </tbody>
</table>

    </center>

    
  );

  
}

export default Table;

