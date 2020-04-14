import { createStore, applyMiddleware } from 'redux';
// persist
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import AsyncStorage from '@react-native-community/async-storage';
import { composeWithDevTools, EnhancerOptions } from 'redux-devtools-extension/logOnlyInProduction';
import Immutable from 'immutable';
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

const composeEnhancers = composeWithDevTools({
  serialize: {
    immutable: Immutable,
  },
} as EnhancerOptions);

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)));

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);
export default store;
export type { RootState } from './reducer';
