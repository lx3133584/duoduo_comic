import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

export const epicMiddleware = createEpicMiddleware();

const middleware = [promiseMiddleware(), epicMiddleware];

if (__DEV__) {
  const logger = createLogger({
    stateTransformer: (state) => {
      const newState = {};
      for (const k in state) {
        const item = state[k];
        if (item.toJS) {
          newState[k] = item.toJS();
        } else {
          newState[k] = item;
        }
      }
      return newState;
    },
  });
  middleware.push(logger);
}
export default middleware;
