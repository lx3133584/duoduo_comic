import { createActions } from 'redux-actions';
import { registerLocal } from 'api';

export const { registerForLocal } = createActions({
  REGISTER_FOR_LOCAL: ({ username, password, rePassword }) => registerLocal({ username, password, rePassword }),
});
