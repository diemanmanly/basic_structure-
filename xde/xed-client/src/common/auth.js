import {P_USER, URL_CONST, P_ROLE} from '../config/routing.config'
import * as utils from './utils';
import {$http} from './http-utils';
import router from "../router/index";

export const nativeLogin = (uiUser) => {
  console.log("chung ta goi ham login len server ne");
  var urlLogin = "http://server.zminer.zaloapp.com/" + 'user/login';
  return $http.post(urlLogin, {
    username: uiUser.username,
    password: uiUser.password
  })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(e => {
      console.log(e)
      return null;
    });
}


export const setLoginCookie = (data) => {
  if (!data)
    return;
  if (data.userName) {
    $cookies.set(P_USER.user, JSON.stringify(data.userName) || '');
  }
  if (data.roles) {
    $cookies.set(P_USER.role, JSON.stringify(data.roles) || '');
  }
  data.displayName = data.displayName || data.userName;
  if (data.displayName) {
    $cookies.set(P_USER.displayName, JSON.stringify(data.displayName) || '');
  }
  $cookies.set(P_USER.thirdParty, data.isThirdParty || true);
  if (data.avatar) {
    $cookies.set(P_USER.avatar, data.avatar || '');
  }
  if (data.logoutUrl) {
    $cookies.set(P_USER.logoutUrl, data.logoutUrl || '');
  }
}

export const clearCookies = () => {
  if ($cookies.isKey(P_USER.user))
    $cookies.remove(P_USER.user);
  if ($cookies.isKey(P_USER.role))
    $cookies.remove(P_USER.role);
  if ($cookies.isKey(P_USER.thirdParty))
    $cookies.remove(P_USER.thirdParty);
  if ($cookies.isKey(P_USER.logoutUrl))
    $cookies.remove(P_USER.logoutUrl);
  if ($cookies.isKey(P_USER.displayName))
    $cookies.remove(P_USER.displayName);
  if ($cookies.isKey(P_USER.avatar))
    $cookies.remove(P_USER.avatar);
}

export const checkLogined = () => {
  var user = $cookies.get(P_USER.user);
  var role = $cookies.get(P_USER.role);
  return typeof user !== 'undefined' && user != null
    && typeof role !== 'undefined' && role != null;
}

export const checkRole = (role) => {
  var hasRole = false;
  var roleStr = $cookies.get(P_USER.role);
  if (roleStr != null) {
    var roles = JSON.parse(roleStr);
    roles.forEach(function (value) {
      if (value === role) {
        hasRole = true;
        return false;
      }
    });
  }
  return hasRole;
}

export const getRole = function () {
  var res = P_ROLE.guest;
  if (checkLogined()) {
    res = $cookies.get(P_USER.role);
  }
  return res;
};

export const checkAuth = function (mustRoles, roles) {
  var res = false;
  try {
    for (var mr = 0; mr < mustRoles.length; mr++) {
      for (var r = 0; r < roles.length; r++) {
        if (mustRoles[mr] === roles[r]) {
          res = true;
          break;
        }
      }
      if (res)
        break;
    }
  } catch (e) {
  }
  return res;
};

export const checkCookies = () => {
  var urlCheckCookies = utils.getBaseUrl() + 'user?cmd=checkCookie';
  return $http.post(urlCheckCookies)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return null;
    });
}

export const logout = () => {
  var urlLogout = utils.getBaseUrl() + 'user?cmd=logout';
  return $http.get(urlLogout)
    .then(response => {
      if ($cookies.get(P_USER.thirdParty)) {
        var logoutUrl = URL_CONST.logout3rdParty;
        if (typeof (logoutUrl) !== 'undefined' && logoutUrl !== '') {
          console.log(logoutUrl + encodeURIComponent(window.location.origin + '/#login'));
          var url = logoutUrl + encodeURIComponent(window.location.origin + '/#login');
          window.location.href = logoutUrl + encodeURIComponent(window.location.origin + '/#login');
        }
      }
      return response.data;
    })
    .catch(e => {
      return null;
    });
}

export const loginZalo = function () {
  console.log(URL_CONST.login3rdParty.replace("{0}", utils.getAppId()).replace("{1}", encodeURIComponent(window.location.origin)));
  window.location = URL_CONST.login3rdParty.replace("{0}", utils.getAppId()).replace("{1}", encodeURIComponent(window.location.origin));
};

export const checkCookiesOk = (callback) => {
  var maxCount = 1000;
  var count = 0;
  var iid = setInterval(() => {
    if (checkLogined()) {
      clearInterval(iid);
      if (callback) {
        callback(true);
      }
    } else if (count > maxCount) {
      clearInterval(iid);
      if (callback) {
        callback(false);
      }
    }
    count++;
  }, 500);
};
