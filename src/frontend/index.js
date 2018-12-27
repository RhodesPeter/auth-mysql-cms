import basicExample from './basicExample';

const { pathname } = window.location;

if (pathname === '/') {
  basicExample();
}
