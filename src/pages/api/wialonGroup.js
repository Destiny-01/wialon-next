const wialon = require('wialon');

export default async function handler(req, res) {
  const opts = {
    authz: {
      token:
        'cff41ecd2f9615c24a95c8e9d906cde9DFC283DDD9407133F3B10D5E589A8419681732CF',
    },
  };

  const session = await wialon(opts).session;
  if (req.method === 'POST') {
    let response = [];

    const { resourceId, templateId, from, to, unitGroup } = req.body;

    console.log(req.body);

    const table = {
      tableIndex: 0,
      config: {
        type: 'range',
        data: { from: 0, to: 49, level: 0, unitInfo: 1 },
      },
    };

    // const params = {
    //   reportResourceId: resourceId,
    //   reportTemplateId: parseInt(templateId),
    //   reportTemplate: null,
    //   reportObjectId: parseInt(unitGroup[i]),
    //   reportObjectSecId: 0,
    //   interval: { flags: 16777216, from, to },
    //   remoteExec: 1,
    // };

    // await session
    //   .request('report/exec_report', params)
    //   .then(function (data) {})
    //   .catch(function (err) {
    //     console.log(err);
    //     return;
    //     // log.innerHTML = JSON.stringify(err);
    //   });

    // await session
    //   .request('report/get_report_status', {})
    //   .then(async function (data) {})
    //   .catch(function (err) {
    //     console.log(err);
    //     return;
    //   });

    // await session
    //   .request('report/apply_report_result', {})
    //   .then(async function (data) {})
    //   .catch(function (err) {
    //     console.log(err);
    //     return;
    //   });

    // await session
    //   .request('report/select_result_rows', table)
    //   .then(async function (data) {
    //     console.log(data);
    //     response = data;
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //     return;
    //   });

    for (let i = 0; i < unitGroup.length; i++) {
      console.log('==========i=========', i);
      const params = {
        reportResourceId: resourceId,
        reportTemplateId: parseInt(templateId),
        reportTemplate: null,
        reportObjectId: parseInt(unitGroup[i]),
        reportObjectSecId: 0,
        interval: { flags: 16777216, from, to },
        remoteExec: 1,
      };

      await session
        .request('report/exec_report', params)
        .then(function (data) {})
        .catch(function (err) {
          console.log(err);
          return;
          // log.innerHTML = JSON.stringify(err);
        });

      await session
        .request('report/get_report_status', {})
        .then(async function (data) {})
        .catch(function (err) {
          console.log(err);
          return;
        });

      await session
        .request('report/apply_report_result', {})
        .then(async function (data) {})
        .catch(function (err) {
          console.log(err);
          return;
        });

      await session
        .request('report/select_result_rows', table)
        .then(async function (data) {
          console.log(data);
          response.push(data);
        })
        .catch(function (err) {
          console.log(err);
          return;
        });
    }

    //let res = [].concat(...response);

    return res.status(200).json({
      response,
    });
  } else {
    return res.status(200).json({ error: 'Invalid route' });
  }
}
