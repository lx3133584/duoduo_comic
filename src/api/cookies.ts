import CookieManager from 'react-native-cookies';
import baseURL from './base_url';

export const getCookies = () => CookieManager.get(baseURL);
