import { createActions } from 'redux-actions';
import { loginLocal } from 'api';

export const { loginForLocal } = createActions({
  LOGIN_FOR_LOCAL: async ({ username, password }) => {
    const result = await loginLocal({ username, password });
    return result;
  },
});
