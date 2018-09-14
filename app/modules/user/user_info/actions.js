import { createActions } from 'redux-actions';
import { fetchUserInfo, logout } from 'api';

export const { getUserInfo, logoutAction } = createActions({
  GET_USER_INFO: async () => {
    const result = await fetchUserInfo();
    return result;
  },
  LOGOUT_ACTION: async () => {
    await logout();
  },
});
