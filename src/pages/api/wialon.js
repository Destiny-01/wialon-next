const wialon = require("wialon");

export default async function handler(req, res) {
  const opts = {
    authz: {
      token:
        "cff41ecd2f9615c24a95c8e9d906cde9DFC283DDD9407133F3B10D5E589A8419681732CF",
    },
  };

  const session = await wialon(opts).session;
  if (req.method === "GET") {
    let resource, unit, unit_group;

    const paramsResource = {
      spec: {
        itemsType: "avl_resource",
        propType: "propitemname",
        propName: "reporttemplates",
        propValueMask: "*",
        sortType: "sys_name",
      },
      force: 1,
      flags: 8193,
      from: 0,
      to: 0,
    };

    const paramsUnit = {
      spec: {
        itemsType: "avl_unit",
        propType: "propitemname",
        propName: "reporttemplates",
        propValueMask: "*",
        sortType: "sys_name",
      },
      force: 1,
      flags: 8193,
      from: 0,
      to: 0,
    };

    const paramsUnitGroup = {
      spec: {
        itemsType: "avl_unit_group",
        propType: "propitemname",
        propName: "reporttemplates",
        propValueMask: "*",
        sortType: "sys_name",
      },
      force: 1,
      flags: 8193,
      from: 0,
      to: 0,
    };

    await session
      .request("core/search_items", paramsResource)
      .then(async function (data) {
        resource = data.items;
      })
      .catch(function (err) {
        console.log(err);
        return;
      });

    await session
      .request("core/search_items", paramsUnit)
      .then(async function (data) {
        unit = data.items;
      })
      .catch(function (err) {
        console.log(err);
        return;
      });

    await session
      .request("core/search_items", paramsUnitGroup)
      .then(async function (data) {
        unit_group = data.items;
      })
      .catch(function (err) {
        console.log(err);
        return;
      });

    return res.status(200).json({
      // call,
      resource,
      unit,
      unit_group,
    });
  } else if (req.method === "POST") {
    let response;

    await session
      .request("report/exec_report", req.body.params)
      .then(function (data) {})
      .catch(function (err) {
        console.log(err);
        return;
        // log.innerHTML = JSON.stringify(err);
      });

    await session
      .request("report/get_report_status", {})
      .then(async function (data) {})
      .catch(function (err) {
        console.log(err);
        return;
      });

    await session
      .request("report/apply_report_result", {})
      .then(async function (data) {})
      .catch(function (err) {
        console.log(err);
        return;
      });

    await session
      .request("report/select_result_rows", req.body.table)
      .then(async function (data) {
        console.log(data);
        response = data;
      })
      .catch(function (err) {
        console.log(err);
        return;
      });

    return res.status(200).json({
      response,
    });
  } else {
    return res.status(200).json({ error: "Invalid route" });
  }
}
