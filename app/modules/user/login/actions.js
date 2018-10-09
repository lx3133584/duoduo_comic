import { createActions } from 'redux-actions';
import { loginLocal } from 'api';

export const { loginForLocal } = createActions({
  LOGIN_FOR_LOCAL: ({ username, password }) => loginLocal({ username, password }),
});
