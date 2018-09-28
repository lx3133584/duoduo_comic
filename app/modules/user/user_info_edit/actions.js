import { createActions } from 'redux-actions';
import { uploadUserAvatar, editUserInfo } from 'api';

export const { uploadAvatar, changeUserInfo } = createActions({
  UPLOAD_AVATAR: async ({ path, csrf, filename }) => {
    const result = await uploadUserAvatar({ path, csrf, filename });
    return result;
  },
  CHANGE_USER_INFO: ({ tel, email, name }) => {
    const promise = editUserInfo({ tel, email, name });
    return { promise, data: { tel, email, name } };
  },
});
