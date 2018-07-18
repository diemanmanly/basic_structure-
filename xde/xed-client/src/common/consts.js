export const CATEGORIES = {
  'CREDIT_CARD': 'Credit Card',
  'CHECKING': 'Checking',
  'SAVINGS': 'Savings'
};

// export const P_USER = {
//   user: "__u",
//   role: "__r",
//   displayName: "__d",
//   thirdParty: "__third",
//   logoutUrl: "__logoutUrl",
//   msg_third_party: "__msg_third"
// };
//
// export const P_ROLE = {
//   guest: "guest",
//   user: "user",
//   operator: "operator",
//   admin: "admin"
// };

export const URL_CONST = {
  login3rdParty: 'http://oauth.zaloapp.com/v3/auth?app_id={0}&redirect_uri={1}&isRedirect=true',
  logout3rdParty: 'https://id.zalo.me/account/logout?continue='
};

export const MENUS = [
  {name: 'Product Manager', router: "product", path: "product"},
  {name: 'Product Sttings', router: "ps_group", path: "psettings"},
  // {name: 'Server Manager', router: "server"},
  {name: 'User/Role', router: "account", path: "account"},
  {name: 'Permissions', router: "permission", path: "permission"}
];

export const ERROE_CODES = {
  success: 0,
  not_login: -22,
};

export const SIZE = 30;

export const TYPE = {
  product: 0,
  server: 1
}

export const DASHBOARD_TYPE = {
  SERVER: 1,
  PROCESS: 2,
  PROFILER: 0
}


export const TIME_PRESET = {
  default: [
    {name: 'Yesterday', value: 0},
    {name: 'Last Week', value: 1},
    {name: 'Last 30 Days', value: 10},
    {name: 'This Month', value: 3},
    {name: 'Last Month', value: 4},
    {name: 'Last 2 Month', value: 5},
    {name: 'Last 3 Month', value: 6},
    {name: 'Last 6 Month', value: 7},
    {name: 'This Year', value: 8},
    {name: 'Last Year', value: 9},
    {name: 'Custom', value: -2}
  ]
}

export const INDEX_TIME_PRESET = {
  yesterday: 0,
  last_week: 1,
  last_30day: 2,
  this_month: 3,
  last_month: 4,
  last_2month: 5,
  last_3month: 6,
  last_6month: 7,
  this_year: 8,
  custom: 10
}
