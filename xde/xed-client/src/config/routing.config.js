export const P_USER = {
  user: "__u",
  role: "__r",
  displayName: "__d",
  thirdParty: "__third",
  avatar: "__avatar",
  logoutUrl: "__logoutUrl",
  msg_third_party: "__msg_third"
};

export const P_ROLE = {
  guest: "guest",
  user: "user",
  operator: "operator",
  admin: "admin",
  root: "root"
};

export const URL_CONST = {
  login3rdParty: 'http://oauth.zaloapp.com/v3/auth?app_id={0}&redirect_uri={1}&isRedirect=true',
  logout3rdParty: 'https://id.zalo.me/account/logout?continue='
};


export const ROUTING = {
  home: "/",
  login: "/login",
  product: "/product",
  psettings: "/psettings",
  account: "/account",
  permission: "/permission",
  accesskey: "/accesskey",
  appstore: "/appstore"
};

export const ROUTING_PERMIT = {
  home: [P_ROLE.user, P_ROLE.admin, P_ROLE.root],
  login: [P_ROLE.guest, P_ROLE.user, P_ROLE.admin, P_ROLE.root],
  product: [P_ROLE.user, P_ROLE.admin, P_ROLE.root],
  psettings: [P_ROLE.admin, P_ROLE.root],
  account: [P_ROLE.admin, P_ROLE.root],
  permission: [P_ROLE.admin, P_ROLE.root],
  accesskey: [P_ROLE.admin, P_ROLE.root],
  appstore: [P_ROLE.user, P_ROLE.admin, P_ROLE.root]
}
