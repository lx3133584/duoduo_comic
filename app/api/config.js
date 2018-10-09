import axios from 'axios';
import Toast from 'react-native-root-toast';
// import { Actions } from 'react-native-router-flux';
import baseURL from './base_url';
import store from 'store';
import { cookiesActions } from '@';

axios.defaults.timeout = 60000; // 响应时间
axios.defaults.responseType = 'json';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // 配置请求头
axios.defaults.baseURL = `${baseURL}/`; // 配置接口地址

function getCsrf() {
  const state = store.getState();
  return state.cookies.get('csrfToken');
}
function getCookies() {
  return store.dispatch(cookiesActions.getAllCookies());
}
getCookies();

function interceptorsRequestSuccess(config) {
  if (config.method !== 'get') {
    config.headers['x-csrf-token'] = getCsrf();
  }
  if (__DEV__) console.log(config.url, 'request:', config);
  return config;
}
function interceptorsResponseSuccess(response) {
  if (response.headers['set-cookie']) getCookies();
  if (__DEV__) console.log(response.config.url, 'response:', response);
  return response.data;
}
function interceptorsResponseError(error) {
  if (__DEV__) console.error('error:', error.response);
  if (error.request && error.request.status === 401) {
    // Actions.login();
    store.dispatch({ type: 'LOGOUT_ACTION_PENDING' });
  }
  error.response && error.response.data && Toast.show(error.response.data.message, {
    position: -70,
  });
  return Promise.reject(error.response);
}
// json请求拦截器
axios.interceptors.request.use(interceptorsRequestSuccess);
// json 响应拦截器
axios.interceptors.response.use(interceptorsResponseSuccess, interceptorsResponseError);
export default axios;
export { getCsrf };
