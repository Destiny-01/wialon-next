const wialon = require("wialon");

export default async function handler(req, res) {
  try {
    const opts = {
      authz: {
        token:
          "cff41ecd2f9615c24a95c8e9d906cde9DFC283DDD9407133F3B10D5E589A8419681732CF",
      },
    };

    const session = await wialon(opts).session;

    if (req.method === "POST" && req.body.first === "wialon_first") {
      let response;

      const params = {
        params: [
          {
            svc: "core/search_items",
            params: {
              spec: {
                itemsType: "avl_resource",
                propName: "*",
                propValueMask: "*",
                sortType: "",
              },
              force: 1,
              flags: 1,
              from: 0,
              to: 4294967295,
            },
          },
          {
            svc: "core/update_data_flags",
            params: {
              spec: [
                { type: "type", data: "avl_resource", flags: 33281, mode: 1 },
              ],
            },
          },
          {
            svc: "core/update_data_flags",
            params: {
              spec: [
                { type: "type", data: "avl_resource", flags: 8197, mode: 1 },
              ],
            },
          },
        ],
        flags: 0,
      };

      await session
        .request("core/batch", params)
        .then(async function (data) {
          response = data;
          ///console.log(data);
        })
        .catch(function (err) {
          console.log(err);
          return;
        });

      return res.status(200).json({
        response,
      });
    } else if (req.method === "POST" && req.body.first === "wialon_second") {
      let response;
      console.log("starting the request", req.body.params);

      await session
        .request("report/exec_report", req.body.params)
        .then(function (data) {
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
          return;
          // log.innerHTML = JSON.stringify(err);
        });

      await session
        .request("report/get_report_status", {})

        .then(async function (data) {
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
          return;
        });

      await session
        .request("events/check_updates", { detalization: 3 })
        .then(async function (data) {
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
          return;
        });

      await session
        .request("report/get_report_status", {})
        .then(async function (data) {
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
          return;
        });

      await session
        .request("report/apply_report_result", {})
        .then(async function (data) {
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
          return;
        });

      const table = (id) => ({
        tableIndex: id,
        config: {
          type: "range",
          data: { from: 0, to: 30, level: 0, unitInfo: 1 },
        },
      });

      const tables = await Promise.allSettled([
        makeRequest(session, table(-1)),
        makeRequest(session, table(0)),
        makeRequest(session, table(1)),
        makeRequest(session, table(2)),
        makeRequest(session, table(3)),
        makeRequest(session, table(4)),
        makeRequest(session, table(5)),
        makeRequest(session, table(6)),
      ]);

      function makeRequest(session, table) {
        return new Promise(async (resolve) => {
          try {
            const result = await session.request(
              "report/select_result_rows",
              table
            );
            resolve({ status: "fulfilled", value: result });
          } catch (error) {
            resolve({ status: "rejected", reason: error.message });
          }
        });
      }

      const output = tables.map(
        (table) => table.status === "fulfilled" && table.value.value
      );

      console.log(output);
      // let output1 = {};

      async function processTable(table, i) {
        if (table.c[6] < 10) {
          const requestTable = {
            tableIndex: 5,
            config: {
              type: "row",
              data: { rows: [i], level: 0, unitInfo: 1 },
            },
          };

          const result = await session.request(
            "report/select_result_rows",
            requestTable
          );

          result.forEach((r) => {
            output[1] = output[1].map((o) => {
              o.c.push({ b: [] });
              console.log(o.c[5] < 10, o.c[0], r.c[3]);
              parseFloat(o.c[5]) < 10 &&
                o.c[0].trim() === r.c[3].trim() &&
                o.c[o.c.length - 1].b.push(r.c);
              return o;
            });
          });
        }
      }

      // Use Promise.all to await all asynchronous operations
      await Promise.all(output[6]?.map(processTable));

      console.log(output[1][8]?.c, "nnn");

      // await session
      //   .request('report/select_result_rows', req.body.table)
      //   .then(async function (data) {
      //     console.log(data);
      //     response = data;
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //     return;
      //   });

      return res.status(200).json({
        // response,
        response: output,
      });
      // } else if (req.method === "PUT") {
      //   const { tableIndex, row } = req.body;
      //   const table = {
      //     tableIndex,
      //     config: { type: "row", data: { rows: [row], level: 0, unitInfo: 1 } },
      //   };

      //   const result = await session.request("report/select_result_rows", table);

      //   return res.status(200).json({ result });
    } else {
      return res.status(400).json({ error: "Invalid route" });
    }
  } catch (err) {
    console.log("Error", err);
  }
}
