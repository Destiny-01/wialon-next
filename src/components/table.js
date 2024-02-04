import React, { useState, useEffect } from 'react';

function timeToSeconds(time) {
  if (!time) {
    return 0;
  }
  const [hours, minutes, seconds] = time.split(':').map(Number);

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

function timeStringToSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to convert seconds to time string
function secondsToTimeString(seconds) {
  if (!seconds) {
    return null;
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Calculate average time
function calculateAverageTime(timeArray) {
  const totalSeconds = timeArray.reduce(
    (acc, timeString) => acc + timeStringToSeconds(timeString[4]),
    0
  );
  const averageSeconds = totalSeconds / timeArray.length;

  return secondsToTimeString(averageSeconds);
}

function calculateAverageSpeed(speedArray) {
  console.log('speedArray', speedArray);
  const totalSeconds = speedArray.reduce(
    (acc, speedString) => acc + parseFloat(speedString[4]),
    0
  );
  const averageSeconds = totalSeconds / speedArray.length;

  return averageSeconds ? averageSeconds.toFixed(2) + ' km' : null;
}

const computeViolations = (violations) => {
  if (!violations) return null;
  let speeding = violations.filter((viol) =>
    viol[2]?.toLowerCase().startsWith('speed')
  );
  let braking = violations.filter((viol) =>
    viol[2]?.toLowerCase().startsWith('bra')
  );

  let DriverViolationAcceleration = speeding?.reduce((acc, viol) => {
    acc += parseFloat(viol[5]);
    return acc;
  }, 0);

  let DriverViolationBraking = braking?.reduce((acc, viol) => {
    acc += parseFloat(viol[5]);
    return acc;
  }, 0);
  console.log('speeding', DriverViolationAcceleration);

  return (
    <>
      <td>{speeding?.length || '0'}</td>
      <td>{braking?.length || '0'}</td>
      <td>{'0'}</td>
      <td>{'0'}</td>
      <td>{DriverViolationAcceleration || '0'}</td>
      <td>{DriverViolationBraking || '0'}</td>
      <td>{'0'}</td>
      <td>{'0'}</td>
    </>
  );
};

const getBackgroundColorClass = (driverScore) => {
  const score = parseInt(driverScore, 10); // Convert driverScore to an integer if needed

  if (score < 5) {
    return 'low-score';
  } else if (score < 7.5) {
    return 'medium-score';
  } else {
    return 'high-score';
  }
};

const DriverTable = ({ tableData }) => {
  console.log(tableData);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    // Set the startDate based on the data from tableData when the component mounts
    if (tableData && tableData[5] && tableData[5][0] && tableData[5][0].c[9]) {
      const startDateFromTable = tableData[5][0].c[9].t;
      setStartDate(startDateFromTable);
    }

    if (tableData && tableData[5] && tableData[5][0] && tableData[5][0].c[11]) {
      const endDateFromTable = tableData[5][0].c[11].t;
      setEndDate(endDateFromTable);
    }
  }, [tableData]);
  const getCurrentTimeGMT = () => {
    const options = {
      timeZone: 'Africa/Lagos',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    const gmtTimeString = new Date().toLocaleString('en-US', options);
    return gmtTimeString;
  };

  const currentTime = getCurrentTimeGMT();

  return (
    <div>
      <div>
        <h1>Driver Performance Table</h1>

        <div className='fromDate'>
          <h4>From : {startDate}</h4>
          <h5>To : {endDate}</h5>
          <h6>Time : {currentTime}</h6>
        </div>

        <div className='table-responsive scrollable-table'>
          <table className='table table-bordered table-dark'>
            <thead>
              <tr>
                <th scope='col' rowSpan='2'>
                  Driver Name
                </th>
                <th scope='col' rowSpan='2'>
                  Driver Score
                </th>
                <th scope='col' rowSpan='2'>
                  Distance
                </th>
                <th scope='col' rowSpan='2'>
                  Max Speed
                </th>
                <th scope='col' colSpan='4'>
                  Violation count
                </th>
                <th scope='col' colSpan='4'>
                  Driver Score Component
                </th>
              </tr>
              <tr>
                <th scope='col'>Accelaration</th>
                <th scope='col'>Brake</th>
                <th scope='col'>Driving Hours</th>
                <th scope='col'>Speed</th>
                <th scope='col'>Accelaration</th>
                <th scope='col'>Brake</th>
                <th scope='col'>Driving Hours</th>
                <th scope='col'>Speed</th>
              </tr>
            </thead>
            <br></br>
            <tbody>
              {tableData[1]?.map((table, i) => (
                <tr key={i} className={getBackgroundColorClass(table.c[5])}>
                  <th scope='row'>{table.c[0] || '---'}</th>
                  <td>{table.c[5] || '0'}</td>
                  <td>{table.c[2] || '0'}</td>
                  <td>{table.c[6]?.t || '0 km/h'}</td>
                  {table.c[7] === undefined ? (
                    <>
                      <td>{'0'}</td>
                      <td>{'0'}</td>
                      <td>{'0'}</td>
                      <td>{'0'}</td>
                      <td>{'0'}</td>
                      <td>{'0'}</td>
                      <td>{'0'}</td>
                      <td>{'0'}</td>
                    </>
                  ) : (
                    computeViolations(table.c[table.c.length - 1]?.b)
                  )}
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
