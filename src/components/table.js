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
              {tableData[1]?.map((table, i) => (
                <tr key={i}>
                  <th scope="row">{table.c[0] || "----"}</th>
                  <td>{table.c[11] || "----"}</td>
                  <td>{table.c[3] || "----"}</td>
                  <td>{table.c[12]?.t || "----"}</td>
                  <td>{table.c[8] || "----"}</td>
                  <td>{table.c[10] || "----"}</td>
                  <td>{table.c[8] || "----"}</td>
                  <td>{table.c[10] || "----"}</td>
                  <td>{"----"}</td>
                  <td>{"----"}</td>
                  <td>{"----"}</td>
                  <td>{"----"}</td>
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
