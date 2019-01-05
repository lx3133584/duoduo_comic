import { combineReducers } from 'redux';
import {
  comicReducer,
  favoritesReducer,
  userReducer,
  searchReducer,
  discoveryReducer,
  cookiesReducer,
  configReducer,
  ComicStateType,
  FavoritesStateType,
  UserStateType,
  SearchStateType,
  DiscoveryStateType,
  CookiesStateType,
  ConfigStateType,
} from '@';
export interface RootState {
  comic: ComicStateType;
  favorites: FavoritesStateType;
  user: UserStateType;
  search: SearchStateType;
  discovery: DiscoveryStateType;
  cookies: CookiesStateType;
  config: ConfigStateType;
}
export default combineReducers({
  comic: comicReducer,
  favorites: favoritesReducer,
  user: userReducer,
  search: searchReducer,
  discovery: discoveryReducer,
  cookies: cookiesReducer,
  config: configReducer,
});
