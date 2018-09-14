import { createActions } from 'redux-actions';
import { changePassword } from 'api';

export const { editPassword } = createActions({
  EDIT_PASSWORD:
    async ({ oldPassword, password, rePassword }) => {
      await changePassword({ oldPassword, password, rePassword });
    },
});
