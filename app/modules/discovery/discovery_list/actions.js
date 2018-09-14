import { createActions } from 'redux-actions';
import { fetchClassList } from 'api';

export const { getClassList } = createActions({
  GET_CLASS_LIST: async () => {
    const result = await fetchClassList();
    return result;
  },
});
