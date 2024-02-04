import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DriverTable from '../components/table';
import axios from 'axios';

export default function Home({ resource, object, template }) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://wialon-next.vercel.app'
      : 'http://localhost:3000';
  const [resourceId, setResourceId] = useState('');
  const [report, setReport] = useState([]);
  const [group, setGroup] = useState([]);
  const [templateId, setTemplateId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [interval, setInterval] = useState(86400);

  const onOptionChangeHandler = (event) => {
    setResourceId(event.target.value);
  };

  const onOptionChangeHandlerTemplate = (event) => {
    setTemplateId(event.target.value);
  };

  const onOptionChangeHandlerGroup = (event) => {
    setGroupId(event.target.value);
  };

  useEffect(() => {
    if (resourceId) {
      template.filter((item) => {
        if (item.i === parseInt(resourceId)) {
          setReport(item.d.rep);
        }
      });
    }

    if (templateId) {
      object.filter((item) => {
        if (item.i === parseInt(resourceId)) {
          setGroup(item.d.drvrsgr);
        }
      });
    }
  }, [resourceId, template, templateId, object]);

  const getUnixTimeForFirstDay = (interval) => {
    let unixTimeForFirstDay = 0;
    const currentDate = new Date();
    if (interval === '2592000') {
      currentDate.setDate(1);
      currentDate.setMonth(currentDate.getMonth() - 1);
      currentDate.setDate(1);
      currentDate.setHours(0, 0, 0, 0);
      console.log('=====Date===', currentDate);
      unixTimeForFirstDay = Math.floor(currentDate.getTime() / 1000);
    } else {
      const time = Math.floor(currentDate.getTime() / 1000);
      unixTimeForFirstDay = time - parseInt(interval, 10);
    }
    return unixTimeForFirstDay;
  };

  const getUnixTimeForLastDayOfLastMonth = (interval) => {
    let unixTimeForLastDay = 0;
    const currentDate = new Date();
    if (interval === '2592000') {
      currentDate.setDate(1);
      currentDate.setDate(0);
      currentDate.setHours(23, 59, 59, 999);
      console.log('=====Date===', currentDate);
      unixTimeForLastDay = Math.floor(currentDate.getTime() / 1000);
    } else {
      unixTimeForLastDay = Math.floor(currentDate.getTime() / 1000);
    }
    return unixTimeForLastDay;
  };

  const toggleShowTable = async () => {
    setLoading(true);

    // const convertToUnixTimestamp = (milliseconds) => {
    //   // Specify the date and time
    //   // const dateString = '2023-12-22 00:00:00';
    //   const dateObject = new Date();

    //   const unixTimestamp = Math.floor(
    //     (dateObject.getTime() - milliseconds) / 1000
    //   );
    //   return unixTimestamp;
    // };

    const params = {
      reportResourceId: parseInt(resourceId),
      reportTemplateId: parseInt(templateId),
      reportTemplate: null,
      reportObjectId: parseInt(resourceId),
      reportObjectSecId: groupId,
      interval: {
        from: getUnixTimeForFirstDay(interval),
        to: getUnixTimeForLastDayOfLastMonth(interval),
        flags: 16777216,
      },
    };

    const table = {
      tableIndex: -1,
      config: {
        type: 'range',
        data: { from: 0, to: 30, level: 0, unitInfo: 1 },
      },
    };

    const first = 'wialon_second';

    const res = await axios
      .post(`${baseUrl}/api/wialon`, {
        params,
        table,
        first,
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setTableData(res.data.response);
    console.log('======res======', res);
    setLoading(false);
  };

  const onOptionChangeHandlerInterval = (event) => {
    console.log(event.target.value);
    setInterval(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='my-5'>
          <div className='logo'>
            <Image src='/wialon.jpeg' width={64} height={64} alt='#' />
          </div>
          <h1 className='text-center p-2'>
            Wialon Playground - Execute custom report
          </h1>

          <div className='container-sm align-items-center'>
            <div className='row mb-4'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
                <div className='card custom-card'>
                  <div className='card-header'>
                    <div className='card-title'>Select resource and table</div>
                  </div>
                  <div className='card-body'>
                    <select
                      id='res'
                      className='js-example-templating js-persons form-control'
                      onChange={onOptionChangeHandler}>
                      <option>Please choose one option</option>
                      {resource.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.nm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
                <div className='card custom-card'>
                  <div className='card-header'>
                    <div className='card-title'>Templates</div>
                  </div>
                  <div className='card-body'>
                    <select
                      id='templ'
                      className='js-example-templating js-persons form-control'
                      onChange={onOptionChangeHandlerTemplate}>
                      <option>Please choose one option</option>
                      {report &&
                        Object.keys(report).map((key) => (
                          <option value={report[key].id} key={report[key].id}>
                            {report[key].n}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
                <div className='card custom-card'>
                  <div className='card-header'>
                    <div className='card-title'>Select Group</div>
                  </div>
                  <div className='card-body'>
                    <select
                      id='units'
                      className='js-example-templating js-persons form-control'
                      onChange={onOptionChangeHandlerGroup}>
                      <option>Please choose one option</option>
                      {group &&
                        Object.keys(group).map((key) => (
                          <option value={group[key].id} key={group[key].id}>
                            {group[key].n}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
                <div className='card custom-card'>
                  <div className='card-header'>
                    <div className='card-title'>Select time interval</div>
                  </div>
                  <div className='card-body'>
                    <select
                      id='interval'
                      className='js-example-templating js-persons form-control'
                      onChange={onOptionChangeHandlerInterval}>
                      <option
                        value='86400'
                        title='60 sec * 60 minutes * 24 hours = 86400 sec = 1 day'>
                        Last day
                      </option>
                      <option
                        value='604800'
                        title='86400 sec * 7 days = 604800 sec = 1 week'>
                        Last week
                      </option>
                      <option
                        value='2592000'
                        title='86400 sec * 30 days = 2592000 sec = 1 month'>
                        Last month
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='btn-list'>
                <button
                  className='btn btn-info'
                  id='exec_btn'
                  type='button'
                  onClick={toggleShowTable}>
                  {loading ? 'Loading...' : 'Execute report'}
                </button>
              </div>
            </div>
            <div id='log'></div>
            <div>
              {tableData?.length > 0 ? (
                <DriverTable tableData={tableData} />
              ) : (
                <p>No data generated</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <div className='footer fs-6'>
        <p>
          Copyright&#169; <span>Gigasec</span>
          <div>
            Designed with by ❤️ <span>Gigasec Dev Team</span> Gigasec Dev Team
            All rights reserved{' '}
          </div>
        </p>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://wialon-next.vercel.app'
        : 'http://localhost:3000';
    const first = 'wialon_first';
    const res = await axios.post(`${baseUrl}/api/wialon`, { first });
    //console.log(res);
    return {
      props: {
        resource: res.data.response[0].items,
        object: res.data.response[1],
        template: res.data.response[2],
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      props: {
        resource: [],
        object: [],
        template: [],
      },
    };
  }
}
