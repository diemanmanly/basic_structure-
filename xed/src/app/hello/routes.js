import * as components from './components';

export default [
    {
        path: '/home',
        component: components.home,
        meta: {
          title: 'Home',
        },
      },
      {
        path: '/hello',
        component: components.helloworld,
        meta: {
          title: 'Hello World',
        },
      },
      {
        path: '/counter',
        component: components.counter,
        meta: {
          title: 'Counter',
        },
      },
      {path: '*', redirect: '/home'}
];
