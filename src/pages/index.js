import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import DriverTable from "./table";
import axios from "axios";

export default function Home({ resource, unit, unit_group }) {
  const [resourceId, setResourceId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [loading, setLoading] = useState(false);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const [resourceName, setResoureName] = useState("");

  const [report, setReport] = useState("");
  const [interval, setInterval] = useState("");
  const [tableData, setTableData] = useState([]);

  const onOptionChangeHandlerInterval = (event) => {
    setInterval(event.target.value);
  };

  const toggleShowTable = async () => {
    setLoading(true);
    console.log("kk");
    // const reportResourceId = res.value;
    // const reportTemplateId = templ.value;
    // const reportObjectId = units.value;
    // const reportObjectSecId = 0;
    //const interval = interval.value;
    console.log(fromRef.current);

    const params = {
      reportResourceId: resourceId,
      reportTemplateId: parseInt(templateId),
      reportTemplate: null,
      reportObjectId: parseInt(unitId),
      reportObjectSecId: 0,
      interval: { flags: 16777216, from: fromRef.current, to: toRef.current },
      remoteExec: 1,
    };
    const table = {
      tableIndex: 0,
      config: {
        type: "range",
        data: { from: 0, to: 49, level: 0, unitInfo: 1 },
      },
    };
    const res = await axios.post("http://localhost:3000/api/wialon", {
      params,
      table,
    });
    console.log(res.data);

    // call(params);
    setLoading(false);
    setTableData(res.data.response);
  };

  const convertToUnixTimestamp = (milliseconds) => {
    // Specify the date and time
    // const dateString = '2023-12-22 00:00:00';
    const dateObject = new Date();

    const unixTimestamp = Math.floor(
      (dateObject.getTime() - milliseconds) / 1000
    );
    return unixTimestamp;
  };

  const onOptionChangeHandler = (event) => {
    setResoureName(event.target.value);
  };

  const onOptionChangeHandlerTemplate = (event) => {
    setTemplateId(event.target.value);
  };

  const onOptionChangeHandlerUnit = (event) => {
    setUnitId(event.target.value);
  };

  useEffect(() => {
    resource.filter((item) => {
      if (item.nm === resourceName) {
        setReport(item.rep);
        setResourceId(item.id);
      }
    });
    console.log(interval);

    switch (interval) {
      case "1-day":
        fromRef.current = convertToUnixTimestamp(86400000);
        toRef.current = convertToUnixTimestamp(0);
        break;
      case "1-week":
        fromRef.current = convertToUnixTimestamp(604800000);
        toRef.current = convertToUnixTimestamp(0);
        break;
      case "1-month":
        fromRef.current = convertToUnixTimestamp(2592000000);
        toRef.current = convertToUnixTimestamp(0);
        break;
      default:
        fromRef.current = convertToUnixTimestamp(86400000);
        toRef.current = convertToUnixTimestamp(0);
    }
  }, [resource, interval, setResourceId, resourceName, fromRef, toRef]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="my-5">
          <h1 className="text-center p-2">
            Wialon Playground - Execute custom report
          </h1>

          <div className="container-sm align-items-center">
            <div className="row mb-4">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xxl-3">
                <div className="card custom-card">
                  <div className="card-header">
                    <div className="card-title">Select resource and table</div>
                  </div>
                  <div className="card-body">
                    <select
                      id="res"
                      className="js-example-templating js-persons form-control"
                      onChange={onOptionChangeHandler}
                    >
                      <option>Please choose one option</option>
                      {resource.map((item) => (
                        <option value={item.nm} key={item.id}>
                          {item.nm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xxl-3">
                <div className="card custom-card">
                  <div className="card-header">
                    <div className="card-title">Templates</div>
                  </div>
                  <div className="card-body">
                    <select
                      id="templ"
                      className="js-example-templating js-persons form-control"
                      onChange={onOptionChangeHandlerTemplate}
                    >
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
              <div className="col-lg-6 col-md-6 col-sm-12 col-xxl-3">
                <div className="card custom-card">
                  <div className="card-header">
                    <div className="card-title">Select unit</div>
                  </div>
                  <div className="card-body">
                    <select
                      id="units"
                      className="js-example-templating js-persons form-control"
                      onChange={onOptionChangeHandlerUnit}
                    >
                      <option>Please choose one option</option>
                      {unit.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.nm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xxl-3">
                <div className="card custom-card">
                  <div className="card-header">
                    <div className="card-title">Select time interval</div>
                  </div>
                  <div className="card-body">
                    <select
                      id="interval"
                      className="js-example-templating js-persons form-control"
                      onChange={onOptionChangeHandlerInterval}
                    >
                      <option
                        value="1-day"
                        title="60 sec * 60 minutes * 24 hours = 86400 sec = 1 day"
                      >
                        Last day
                      </option>
                      <option
                        value="1-week"
                        title="86400 sec * 7 days = 604800 sec = 1 week"
                      >
                        Last week
                      </option>
                      <option
                        value="1-month"
                        title="86400 sec * 30 days = 2592000 sec = 1 month"
                      >
                        Last month
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="btn-list">
                <button
                  className="btn btn-info"
                  id="exec_btn"
                  type="button"
                  onClick={toggleShowTable}
                >
                  {loading ? "Loading..." : "Execute report"}
                </button>
              </div>
            </div>
            <div id="log"></div>
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
    const res = await axios.get("http://localhost:3000/api/wialon");
    console.log(res);
    return {
      props: {
        resource: res.data.resource,
        unit: res.data.unit,
        unit_group: res.data.unit_group,
      },
    };
  } catch (err) {
    console.log(err.message);
    return {
      props: {
        resource: [],
        unit: [],
        unit_group: "",
      },
    };
  }
}
