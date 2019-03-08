import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    Id: `${10000+i}`,
    Name: `mock${i}`,
    Gender: Math.random()>0.5?`男`:`女`,
    Born: "1949-10-01",
    Education: "",
    MaritalStatus: "",
    DwellingStatus: "",
    Hobby: "",
    Phone: "",
    IDCard: `${Math.random()*1000+51000012120000}`,
    Address: "",
    RecordUserId: "3c5e636a-c182-4ad7-a7b1-9205bbe534f5",
    CreatedAt: ""
  });
}

let diseaseDataSource = [];
for (let i = 0; i < 46; i += 1) {
  diseaseDataSource.push({
    Id: `${10000+i}`,
    Name: `mock${i}`,
    PinYin:`m${i}`,
    CreatedAt: ""
  });
}


function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  if (params.searchKey) {
    dataSource = dataSource.filter(data =>
      data.Name.indexOf(params.searchKey) > -1 ||
      data.IDCard.indexOf(params.searchKey) > -1
    );
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, Id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      let Source = tableListDataSource.slice();
      body.rows.map( row => {
        Source = Source.filter(item => item.Id !== row.Id);
        return undefined
      });
      tableListDataSource = Source;
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        Id: `${10000+i}`,
        Name: body.Name,
        Gender: body.Gender>0.5?`男`:`女`,
        Born: body.Born,
        Education: body.Education,
        MaritalStatus: body.MaritalStatus,
        DwellingStatus: body.DwellingStatus,
        Hobby: body.Hobby,
        Phone: body.Phone,
        IDCard: body.IDCard,
        Address: body.Address,
        RecordUserId: "3c5e636a-c182-4ad7-a7b1-9205bbe534f5",
        CreatedAt: ""
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.Id === Id) {
          body.Gender = body.Gender > 0.5? '男':'女';
          Object.assign(item, { ...body});
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getRule(req, res, u);
}

function getDisease(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = diseaseDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  if (params.searchKey) {
    dataSource = dataSource.filter(data =>
      data.Name.indexOf(params.searchKey) > -1 ||
      data.PinYin.indexOf(params.searchKey) > -1
    );
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postDisease(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, Id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      let Source = diseaseDataSource.slice();
      body.rows.map( row => {
        Source = Source.filter(item => item.Id !== row.Id);
        return undefined
      });
      diseaseDataSource = Source;
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      diseaseDataSource.unshift({
        Id: `${10000+i}`,
        Name: body.Name,
        PinYin:body.PinYin,
        CreatedAt: ""
      });
      break;
    case 'update':
      diseaseDataSource = diseaseDataSource.map(item => {
        if (item.Id === Id) {
          Object.assign(item, { ...body});
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getDisease(req, res, u);
}

export default {
  'GET /api/rule': getRule,
  'GET /api/disease': getDisease,
  'POST /api/rule': postRule,
  'POST /api/disease': postDisease,
};
