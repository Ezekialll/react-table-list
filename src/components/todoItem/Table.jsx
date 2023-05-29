import React from "react" 
import "./Table.css"

const Table = ({list}) => {
    return (
    <center>      
        <table>
            <tr >
                <th>Идентификатор</th>
                <th>Коэффицент</th>
                <th>Name</th>
                <th>Название</th>
                <th>Аты</th>
            </tr>

            {list.length > 0 && (
                list.map(item => (
                    <tr key={item.id}>
                        <td >{item.id ?? '---'}</td>
                        <td >{item.coefficient_crop ?? '---'}</td>
                        <td >{item.name_en ?? '---'}</td>
                        <td >{item.name_ru ?? '---'}</td>
                        <td >{item.name_ky ?? '---'}</td>
                    </tr>
                ))
            )}
        </table>
    </center>
  );
}

export default Table;

