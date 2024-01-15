import React from "react";

function timeToSeconds(time) {
  if (!time) {
    return 0;
  }
  const [hours, minutes, seconds] = time.split(":").map(Number);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return totalSeconds;
}

function calculateSpeed(distance, timeInSeconds) {
  if (timeInSeconds === 0) {
    return 0;
  }
  const timeInHours = timeInSeconds / 3600;

  const speed = distance / timeInHours;

  return speed.toFixed(2);
}


const DriverTable = ({ tableData }) => {

  console.log(tableData);
  return (
    <div>
      <div>
        <h1>Driver Performance Table</h1>

        <div className="table-responsive scrollable-table">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th scope="col" rowSpan="2">
                  Driver Name
                </th>
                <th scope="col" rowSpan="2">
                  Driver Score
                </th>
                <th scope="col" rowSpan="2">
                  Distance
                </th>
                <th scope="col" rowSpan="2">
                  Max Speed
                </th>
                <th scope="col" colSpan="4">
                  Violation count
                </th>
                <th scope="col" colSpan="4">
                  Driver Score Component
                </th>
              </tr>
              <tr>
                <th scope="col">Accelaration</th>
                <th scope="col">Brake</th>
                <th scope="col">Driving Hours</th>
                <th scope="col">Speed</th>
                <th scope="col">Accelaration</th>
                <th scope="col">Brake</th>
                <th scope="col">Driving Hours</th>
                <th scope="col">Speed</th>
              </tr>
            </thead>
            <tbody>
              {tableData[1].map((table, i) => (
                
                <tr key={i}>
                  <th scope="row">{table.c[0] || "----"}</th>
                  <td>{table.c[11] || "----"}</td>
                  <td>{table.c[3] || "----"}</td>
                   <td>{tableData[3].map((table1, j) =>(
                    <span key={j}>{table1.c[2].t}</span>
                  ))}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>{table.c[7] || "----"}hrs</td>
                  
                  {/* <td>
                    {(
                      (parseFloat(table.c[16]) || 0) -
                      (parseFloat(table.c[15]) || 0)
                    ).toFixed(2) || "----"}{" "}
                    km
                  </td>
                  <td>{table.c[7] || "----"}</td>
                  <td>---</td>
                  <td>---</td>
                  <td>{timeToSeconds(table.c[13]) || 0}</td>
                  <td>
                    {calculateSpeed(
                      parseFloat(table.c[14]),
                      timeToSeconds(table.c[13])
                    ) || 0}{" "}
                    km/h
                  </td>
                  <td>---</td>
                  <td>---</td>
                  <td>
                    {parseInt(
                      (
                        (parseFloat(table.c[16]) - parseFloat(table.c[15])) /
                          parseFloat(table.c[6]) || 0
                      ).toFixed(2) * 3600
                    )}
                  </td>
                  <td>{table.c[6] || "0 km/h"}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverTable;
