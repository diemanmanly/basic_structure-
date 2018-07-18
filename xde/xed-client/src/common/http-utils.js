import axios from 'axios';
import {ERROE_CODES} from "../common/consts"
import * as auth from '../common/auth';
import router from '../router'

export const $http = axios.create({
  withCredentials: true
});

export const get = (url, callback) => {
  return $http.get(url)
    .then(result => {
      var res = result.data;
      if (res.code >= 0) {
        var data = res.data || true;
        callback(data);
      } else {
        if (res.code == ERROE_CODES.not_login) {
          auth.clearCookies();
          router.push({name: "login"});
        }
        callback(null);
      }
    }).catch(e => {
      callback(null);
    });
}

export const post = (url, params, callback) => {
  $http.post(url + "&" + jQuery.param(params)).then(result => {
    var res = result.data;
    if (res.code >= 0) {
      var data = res.data || true;
      callback(data);
    } else {
      if (res.code == ERROE_CODES.not_login) {
        auth.clearCookies();
        router.push({name: "login"});
      }
      callback(null);
    }
  }).catch(e => {
    callback(null);
  });
}
