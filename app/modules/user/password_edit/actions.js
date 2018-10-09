import { createActions } from 'redux-actions';
import { changePassword } from 'api';

export const { editPassword } = createActions({
  EDIT_PASSWORD: ({ oldPassword, password, rePassword }) => changePassword({ oldPassword, password, rePassword }),
});
