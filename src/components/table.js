import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// function timeToSeconds(time) {
//   if (!time) {
//     return 0;
//   }
//   const [hours, minutes, seconds] = time.split(':').map(Number);

//   const totalSeconds = hours * 3600 + minutes * 60 + seconds;

//   return totalSeconds;
// }

// function calculateSpeed(distance, timeInSeconds) {
//   if (timeInSeconds === 0) {
//     return 0;
//   }
//   const timeInHours = timeInSeconds / 3600;

//   const speed = distance / timeInHours;

//   return speed.toFixed(2);
// }

// function timeStringToSeconds(timeString) {
//   const [hours, minutes, seconds] = timeString.split(':').map(Number);
//   return hours * 3600 + minutes * 60 + seconds;
// }

// // Function to convert seconds to time string
// function secondsToTimeString(seconds) {
//   if (!seconds) {
//     return null;
//   }
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;

//   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
//     2,
//     '0'
//   )}:${String(remainingSeconds).padStart(2, '0')}`;
// }

// // Calculate average time
// function calculateAverageTime(timeArray) {
//   const totalSeconds = timeArray.reduce(
//     (acc, timeString) => acc + timeStringToSeconds(timeString[4]),
//     0
//   );
//   const averageSeconds = totalSeconds / timeArray.length;

//   return secondsToTimeString(averageSeconds);
// }

// function calculateAverageSpeed(speedArray) {
//   console.log('speedArray', speedArray);
//   const totalSeconds = speedArray.reduce(
//     (acc, speedString) => acc + parseFloat(speedString[4]),
//     0
//   );
//   const averageSeconds = totalSeconds / speedArray.length;

//   return averageSeconds ? averageSeconds.toFixed(2) + ' km' : null;
// }

const getBackgroundColorClass = (driverScore) => {
  const score = parseInt(driverScore, 10);

  if (score < 5) {
    return 'low-score';
  } else if (score < 7.5) {
    return 'medium-score';
  } else {
    return 'high-score';
  }
};

const DriverTable = ({ tableData, selectedFromDate, selectedToDate }) => {
  console.log(tableData);
  console.log('selectedFromDate', selectedFromDate);
  console.log('selectedToDate', selectedToDate);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tableContains, setTableContains] = useState([]);

  useEffect(() => {
    if (tableData && tableData[5] && tableData[5][0] && tableData[5][0].c[9]) {
      const startDateFromTable = tableData[5][0].c[9].t;
      setStartDate(startDateFromTable);
    }

    if (tableData && tableData[5] && tableData[5][0] && tableData[5][0].c[11]) {
      const endDateFromTable = tableData[5][0].c[11].t;
      setEndDate(endDateFromTable);
    }

    const calculateViolations = (violations) => {
      let speeding = violations?.filter((viol) =>
        viol[2]?.toLowerCase().startsWith('speed')
      );

      console.log('speeding', speeding);
      let braking = violations?.filter((viol) =>
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

      return {
        vAcceleration: speeding?.length || '0',
        vBrake: braking?.length || '0',
        vDrivingHours: '0',
        vSpeed: '0',
        dAcceleration: DriverViolationAcceleration || '0',
        dBrake: DriverViolationBraking || '0',
        dDrivingHours: '0',
        dSpeed: '0',
      };
    };

    tableData[1].map((table, i) => {
      console.log('table', table);
      const driverData = {
        id: i,
        driverName: table.c[0],
        driverScore: table.c[5],
        distance: table.c[2],
        maxSpeed: table.c[6]?.t || '0 km/h',
        ...calculateViolations(table.c[table.c.length - 1]?.b),
      };
      setTableContains((prevArray) => [...prevArray, driverData]);
    });
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

  const uniqueArray = tableContains.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.driverName === obj.driverName)
  );
  console.log('uniqueArray', uniqueArray);
  console.log('tableContains', tableContains);

  const exportToExcel = (data, fileName) => {
    const wb = XLSX.utils.book_new();
    wb.SheetNames.push('Sheet 1');
    const ws = XLSX.utils.json_to_sheet(data);
    wb.Sheets['Sheet 1'] = ws;
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
    link.click();
  };

  return (
    <div>
      <div className=' mt-5'>
        <div className=' d-flex justify-content-end mb-2'>
          <button
            className='btn btn-info'
            id='exec_btn'
            type='button'
            onClick={() => exportToExcel(uniqueArray, 'wialonData')}>
            Export to Excel
          </button>
        </div>

        <div className=' border border-secondary'>
          <h1 className=' text-info-emphasis d-flex justify-content-center mt-0'>
            Driver Performance Report
          </h1>
          <div className=' d-flex justify-content-between px-3 pb-3'>
            <div>
              <span className='badge bg-primary text-wrap" style="width: 6rem; me-2'>
                Date / Time From:
              </span>
              {selectedFromDate.toString()}
            </div>
            <div>
              <span className='badge bg-primary text-wrap" style="width: 6rem; me-2'>
                Date / Time To:
              </span>
              {selectedToDate.toString()}
            </div>
          </div>
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
              {uniqueArray?.map((table, i) => {
                return (
                  <tr
                    key={i}
                    className={getBackgroundColorClass(table.driverScore)}>
                    <td>{table.driverName || '0'}</td>
                    <td>{table.driverScore || '0'}</td>
                    <td>{table.distance || '0'}</td>
                    <td>{table.maxSpeed || '0 km/h'}</td>
                    <td>{table.vAcceleration || '0'}</td>
                    <td>{table.vBrake || '0'}</td>
                    <td>{table.vDrivingHours || '0'}</td>
                    <td>{table.vSpeed || '0'}</td>
                    <td>{table.dAcceleration || '0'}</td>
                    <td>{table.dBrake || '0'}</td>
                    <td>{table.dDrivingHours || '0'}</td>
                    <td>{table.dSpeed || '0'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverTable;
