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
  const combinedData = tableData[1]?.map((table1, i) => ({
    table1,
    table2: tableData[3]?.[i] || {},
  }));
  
  combinedData.sort((a, b) => a.table1.c[0].localeCompare(b.table1.c[0]));
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
              {/* {tableData[1]?.map((table1, i) => (
                <tr key={i}>
                  <th scope="row">{table1.c[0] || "----"}</th>
                  <td>{table1.c[5] || "----"}</td>
                  <td>{table1.c[2] || "----"}</td>
                  <td>{table1.c[6]?.t || "----"}</td>
                  {tableData[3]?.[i] && (
                    <>
                    <td>{tableData[3][i].c[4] || "----"}</td>
          <td>{tableData[3][i].c[4] || "----"}</td>
          <td>{tableData[3][i].c[7] || "----"}</td>
          <td>{tableData[3][i].c[4] || "----"}</td>
                    
                    </>
                  )}
                  <td>{  "----"}</td>
                  <td>{ "----"}</td>
                  <td>{ "----"}</td>
                  <td>{ "----"}</td>
                 
                </tr>
              ))} */}
              {combinedData.map(({ table1, table2 }, i) => (
    <tr key={i}>
      <th scope="row">{table1.c[0] || "----"}</th>
      <td>{table1.c[5] || "----"}</td>
      <td>{table1.c[2] || "----"}</td>
      <td>{table1.c[6]?.t || "----"}</td>
      <td>{table2.c[4] || "----"}</td>
      <td>{table2.c[4] || "----"}</td>
      <td>{table2.c[7] || "----"}</td>
      <td>{table2.c[4] || "----"}</td>
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
