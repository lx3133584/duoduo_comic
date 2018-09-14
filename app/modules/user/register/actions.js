import { createActions } from 'redux-actions';
import { registerLocal } from 'api';

export const { registerForLocal } = createActions({
  REGISTER_FOR_LOCAL: async ({ username, password, rePassword }) => {
    const result = await registerLocal({ username, password, rePassword });
    return result;
  },
});
