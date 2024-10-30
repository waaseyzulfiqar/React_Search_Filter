import React from "react";
import "./App.css";

function Table({ data }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
          </tr>

          {data && data.map((item) => {
            return<tr key={item.id}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
