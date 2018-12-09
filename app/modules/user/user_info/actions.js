import { createActions } from 'redux-actions';
import { fetchUserInfo } from 'api';

export const { getUserInfo, logoutAction } = createActions({
  GET_USER_INFO: fetchUserInfo,
});
