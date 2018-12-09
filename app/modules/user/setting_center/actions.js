import { createActions } from 'redux-actions';
import { logout } from 'api';

export const { logoutAction } = createActions({
  LOGOUT_ACTION: logout,
});
