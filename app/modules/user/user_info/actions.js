import { createActions } from 'redux-actions';
import { fetchUserInfo, logout } from 'api';

export const { getUserInfo, logoutAction } = createActions({
  GET_USER_INFO: fetchUserInfo,
  LOGOUT_ACTION: logout,
});
