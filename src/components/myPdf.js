import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { useRef } from 'react';

// Import any fonts you need
Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2',
});

// Create Document Component
export const MyDocument = ({ data, fileName }) => {
  let backgroundcolor = useRef('');
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      margin: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    tableHeader: {
      backgroundColor: '#e6e6e6',
      width: '100%',
      fontSize: 8,
      fontWeight: 'bold',
      flexDirection: 'row',
    },
    tableCell: {
      padding: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      width: '8%',
      alignItems: 'center',
    },
    tableDriverName: {
      padding: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      width: '12%',
      fontWeight: 'bold',
      alignItems: 'center',
    },
    dataCell: {
      padding: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      width: '8%',
      alignItems: 'center',
    },
    dataDriverName: {
      padding: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#bfbfbf',
      width: '12%',
      alignItems: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      fontSize: 8,
    },
    violation: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    violationCount: {
      width: '32%',
    },
    violationDriverScore: {
      width: '32%',
    },
    lowScore: {
      backgroundColor: '#ff9999',
      flexDirection: 'row',
      fontSize: 8,
    },
    highScore: {
      backgroundColor: '#99ff99',
      flexDirection: 'row',
      fontSize: 8,
    },
    mediumScore: {
      backgroundColor: '#ffff99',
      flexDirection: 'row',
      fontSize: 8,
    },
  });

  const getBackGroundColor = (driverScore) => {
    const score = parseInt(driverScore, 10);

    if (score < 5) {
      backgroundcolor.current = 'lowScore';
    } else if (score < 7.5) {
      backgroundcolor.current = 'mediumScore';
    } else {
      backgroundcolor.current = 'highScore';
    }
  };

  return (
    <Document>
      <Page size='A4' style={styles.page} orientation='landscape'>
        {/* <View>
        <View style={styles.violation}>
          <Text style={styles.violationCount}>Violation Count</Text>
          <Text style={styles.violationDriverScore}>
            Driver Score Component
          </Text>
        </View>
      </View> */}
        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableDriverName}>Driver Name</Text>
            <Text style={styles.tableCell}>Driver Score</Text>
            <Text style={styles.tableCell}>Distance</Text>
            <Text style={styles.tableCell}>Max Speed</Text>
            <Text style={styles.tableCell}>Accelaration</Text>
            <Text style={styles.tableCell}>Brake</Text>
            <Text style={styles.tableCell}>Driving Hours</Text>
            <Text style={styles.tableCell}>Speed</Text>
            <Text style={styles.tableCell}>Accelaration</Text>
            <Text style={styles.tableCell}>Brake</Text>
            <Text style={styles.tableCell}>Driving Hours</Text>
            <Text style={styles.tableCell}>Speed</Text>
          </View>
          {data.map((row, index) => {
            getBackGroundColor(row.driverScore);

            console.log('Background', backgroundcolor);
            return (
              <View
                key={index}
                style={
                  backgroundcolor.current == 'highScore'
                    ? styles.highScore
                    : backgroundcolor.current == 'lowScore'
                    ? styles.lowScore
                    : styles.mediumScore
                }>
                <Text style={styles.dataDriverName}>
                  {row.driverName || '---'}
                </Text>
                <Text style={styles.dataCell}>{row.driverScore || '0'}</Text>
                <Text style={styles.dataCell}>{row.distance || '0'}</Text>
                <Text style={styles.dataCell}>{row.maxSpeed || '0 km/h'}</Text>
                <Text style={styles.dataCell}>{row.vAcceleration || '0'}</Text>
                <Text style={styles.dataCell}>{row.vBrake || '0'}</Text>
                <Text style={styles.dataCell}>{row.vDrivingHours || '0'}</Text>
                <Text style={styles.dataCell}>{row.vSpeed || '0'}</Text>
                <Text style={styles.dataCell}>{row.dAcceleration || '0'}</Text>
                <Text style={styles.dataCell}>{row.dBrake || '0'}</Text>
                <Text style={styles.dataCell}>{row.dDrivingHours || '0'}</Text>
                <Text style={styles.dataCell}>{row.dSpeed || '0'}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};
