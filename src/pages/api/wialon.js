const wialon = require('wialon');

export default async function handler(req, res) {
  const opts = {
    authz: {
      token:
        'cff41ecd2f9615c24a95c8e9d906cde9DFC283DDD9407133F3B10D5E589A8419681732CF',
    },
  };

  const session = await wialon(opts).session;

  if (req.method === 'POST' && req.body.first === 'wialon_first') {
    let response;
    const params = {
      params: [
        {
          svc: 'core/search_items',
          params: {
            spec: {
              itemsType: 'avl_resource',
              propName: '*',
              propValueMask: '*',
              sortType: '',
            },
            force: 1,
            flags: 1,
            from: 0,
            to: 4294967295,
          },
        },
        {
          svc: 'core/update_data_flags',
          params: {
            spec: [
              { type: 'type', data: 'avl_resource', flags: 33281, mode: 1 },
            ],
          },
        },
        {
          svc: 'core/update_data_flags',
          params: {
            spec: [
              { type: 'type', data: 'avl_resource', flags: 8197, mode: 1 },
            ],
          },
        },
      ],
      flags: 0,
    };

    await session
      .request('core/batch', params)
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
  } else if (req.method === 'POST' && req.body.first === 'wialon_second') {
    let response;
    console.log('starting the request');

    await session
      .request('report/exec_report', req.body.params)
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
      .request('events/check_updates', { detalization: 3 })
      .then(async function (data) {})
      .catch(function (err) {
        console.log(err);
        return;
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
      .request('report/select_result_rows', req.body.table)
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
    return res.status(200).json({ error: 'Invalid route' });
  }
}
