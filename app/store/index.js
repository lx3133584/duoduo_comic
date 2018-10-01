import { createStore, applyMiddleware } from 'redux';
// persist
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import { AsyncStorage } from 'react-native';
import middleware, { epicMiddleware } from './middleware';
import rootReducer from './reducer';
import rootEpic from './epic';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [immutableTransform()],
  blacklist: ['search'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);
export default store;
