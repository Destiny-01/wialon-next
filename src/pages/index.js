import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useEffect, useRef, useState } from 'react';
import DriverTable from '../components/table';
import axios from 'axios';

export default function Home({ resource, object, template }) {
  // console.log('=======resource=====', resource);
  // console.log('=======object=====', object);
  // console.log('=======template=====', template);
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
  // const [unitId, setUnitId] = useState('');

  // const [unitGroup, setUnitGroup] = useState([]);
  // const fromRef = useRef(null);
  // const toRef = useRef(null);
  // const [resourceName, setResoureName] = useState('');

  // const [report, setReport] = useState('');
  const [interval, setInterval] = useState(null);
  // const [tableData, setTableData] = useState([]);
  // let response = [];

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
          console.log('=====ObjectItem======', item);
          setGroup(item.d.drvrsgr);
        }
      });
    }
  }, [resourceId, template, templateId, object]);

  console.log('======resourceId======', resourceId, typeof resourceId);
  console.log('======groupId======', groupId, typeof groupId);
  console.log('======templateId======', parseInt(groupId), typeof templateId);
  // console.log('======report======', report);
  // console.log('======group======', group);
  // console.log('======groupId======', groupId);

  const toggleShowTable = async () => {
    setLoading(true);
    const convertToUnixTimestamp = (milliseconds) => {
      // Specify the date and time
      // const dateString = '2023-12-22 00:00:00';
      const dateObject = new Date();

      const unixTimestamp = Math.floor(
        (dateObject.getTime() - milliseconds) / 1000
      );
      return unixTimestamp;
    };

    console.log(
      '======resourceId======',
      resourceId,
      typeof resourceId,
      interval,
      convertToUnixTimestamp(interval || 86400000)
    );
    console.log('======groupId======', groupId, typeof groupId);
    console.log('======templateId======', parseInt(groupId), typeof templateId);

    const params = {
      reportResourceId: parseInt(resourceId),
      reportTemplateId: parseInt(templateId),
      reportTemplate: null,
      reportObjectId: parseInt(resourceId),
      reportObjectSecId: groupId,
      interval: {
        flags: 16777216,
        // from: 1703199600,
        // to: 1705964399,
        from: convertToUnixTimestamp(interval || 86400000),
        to: convertToUnixTimestamp(0),
      },
      remoteExec: 1,
    };

    // param2 = {};
    console.log('======from======', params.interval.from);
    console.log('======to======', params.interval.to);
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
  console.log(tableData);

  // const toggleShowTable = async () => {
  //   setLoading(true);
  //   // const reportResourceId = res.value;
  //   // const reportTemplateId = templ.value;
  //   // const reportObjectId = units.value;
  //   // const reportObjectSecId = 0;
  //   //const interval = interval.value;

  //   //console.log(unitGroup);

  //   //console.log('==========i=========', i);
  //   const params = {
  //     reportResourceId: resourceId,
  //     reportTemplateId: parseInt(templateId),
  //     reportTemplate: null,
  //     reportObjectId: parseInt(21009229),
  //     reportObjectSecId: 1,
  //     interval: { flags: 16777216, from: fromRef.current, to: toRef.current },
  //     remoteExec: 1,
  //   };

  //   const table = {
  //     tableIndex: 0,
  //     config: {
  //       type: 'range',
  //       data: { from: 0, to: 49, level: 0, unitInfo: 1 },
  //     },
  //   };

  //   const res = await axios.post(`${baseUrl}/api/wialon`, { params, table });
  //   response.push(res.data.response);

  //   //console.log(response);

  //   // const res = await axios.post(`${baseUrl}/api/wialonGroup`, {
  //   //   resourceId,
  //   //   templateId,
  //   //   unitGroup,
  //   //   from: fromRef.current,
  //   //   to: toRef.current,
  //   // });
  //   // console.log(res.data);

  //   // // call(params);
  //   setLoading(false);
  //   let data = [].concat(...response).filter(Boolean);
  //   console.log('======data======', data);
  //   //setTableData(data);
  // };

  // useEffect(() => {
  //   if (resourceId) {
  //   }
  //   resource.filter((item) => {
  //     if (item.id === resourceId) {
  //       setResoureName(item.nm);
  //     }
  //   });
  // }
  // console.log(resourceId);
  // console.log(resourceName);
  // }, [resourceId]);

  // useEffect(() => {
  //   resource.filter((item) => {
  //     if (item.nm === resourceName) {
  //       setReport(item.rep);
  //       setResourceId(item.id);
  //     }
  //   });
  //   //console.log(interval);

  //   switch (interval) {
  //     case '1-day':
  //       fromRef.current = convertToUnixTimestamp(86400000);
  //       toRef.current = convertToUnixTimestamp(0);
  //       break;
  //     case '1-week':
  //       fromRef.current = convertToUnixTimestamp(604800000);
  //       toRef.current = convertToUnixTimestamp(0);
  //       break;
  //     case '1-month':
  //       fromRef.current = convertToUnixTimestamp(2592000000);
  //       toRef.current = convertToUnixTimestamp(0);
  //       break;
  //     default:
  //       fromRef.current = convertToUnixTimestamp(86400000);
  //       toRef.current = convertToUnixTimestamp(0);
  //   }
  // }, [resource, interval, setResourceId, resourceName, fromRef, toRef]);
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
                        value='86400000'
                        title='60 sec * 60 minutes * 24 hours = 86400 sec = 1 day'>
                        Last day
                      </option>
                      <option
                        value='604800000'
                        title='86400 sec * 7 days = 604800 sec = 1 week'>
                        Last week
                      </option>
                      <option
                        value='2419200000'
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
