import * as components from './components';

export default [
  {
    path: '/readnews',
    component: components.readnews,
    name: 'readnews',
    props: true,
    meta: {root: true, admin: true, user: true}
  }
];
