// import {API_INFO} from '../config/api.config'
// import * as API_INFO from '../../static/config/api.config';

export const guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

export const processAPIData = function (data) {
  /*
  Converts the data formatted for IndexedDB / API into the format
  our application uses.
   */
  // let res = {};
  // if (data.code >= 0) {
  //   debugger;
  //   data.data.forEach((entity) => {
  //     res[entity.projectId] = entity;
  //   });
  // }
  let res = {};
  Object.keys(data).forEach((key) => {
    res[data[key].id] = data[key];
  });
  return res;
};

export const getBaseUrl = function () {
  return process.env.baseUrl;
}

export const getAppId = function () {
  return process.env.appid;
}


export const decodeTimePresent = function (timePreset, preDay) {
  var from = new Date();
  var to = new Date();
  switch (timePreset) {
    case 0:
      from.setDate(from.getDate() - 1);
      break;
    case 1:
      from.setDate(from.getDate() - 7);
      break;
    case 2:
      from.setDate(from.getDate() - 14);
      break;
    case 3:
      from.setDate(1);
      break;
    case 4:
      from.setDate(1);
      from.setMonth(from.getMonth() - 1);
      break;
    case 5:
      from.setDate(1);
      from.setMonth(from.getMonth() - 2);
      break;
    case 6:
      from.setDate(1);
      from.setMonth(from.getMonth() - 3);
      break;
    case 7:
      from.setDate(1);
      from.setMonth(from.getMonth() - 6);
      break;
    case 8:
      from.setDate(1);
      from.setMonth(0);
      break;
    case 9:
      from.setDate(1);
      from.setMonth(0);
      from.setFullYear(from.getFullYear() - 1);
      break;
    case 10:
      from.setDate(from.getDate() - 30);
      break;
    case -1:
      if (typeof preDay !== 'undefined' && preDay > 0) {
        from.setDate(from.getDate() - preDay);
      }
      break;
  }

  from.setHours(0);
  from.setMinutes(0);
  from.setSeconds(0);
  from.setMilliseconds(0);
  return {from: from, to: to};
}

export const getRealTime = function (date) {
  if (typeof date !== 'string')
    return 0;
  var d = date.split("/");
  return new Date(d[2], d[1] - 1, d[0]).getTime();
};

export const findObject = function (array, name, value) {
  for (var i = 0; i < array.length; i++) {
    if (name) {
      if (array[i][name] == value) {
        return i;
      }
    } else {
      if (array[i] == value) {
        return i;
      }
    }
  }
  return -1;
}
