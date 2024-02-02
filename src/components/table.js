import React, { useState } from 'react';

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

const DriverTable = ({ tableData }) => {
  console.log(tableData);

  return (
    <div>
      <div>
        <h1>Driver Performance Table</h1>

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
            <tbody>
              {tableData[1]?.map((table, i) => (
                <tr key={i}>
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
