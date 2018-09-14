import { combineReducers } from 'redux';
import {
  comicReducer,
  favoritesReducer,
  userReducer,
  searchReducer,
  discoveryReducer,
  cookiesReducer,
  configReducer,
} from '@';

export default combineReducers({
  comic: comicReducer,
  favorites: favoritesReducer,
  user: userReducer,
  search: searchReducer,
  discovery: discoveryReducer,
  cookies: cookiesReducer,
  config: configReducer,
});
