import { createActions } from 'redux-actions';
import { getCookies } from '../../api/cookies';

export const { getAllCookies } = createActions({
  GET_ALL_COOKIES: async () => {
    const result = await getCookies();
    return result;
  },
});
