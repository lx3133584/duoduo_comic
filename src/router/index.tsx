import React, { ComponentClass } from 'react';
import {
  Scene,
  Router,
  Stack,
  Tabs,
  Drawer,
  Actions,
} from 'react-native-router-flux';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { Dimensions, StatusBar } from 'react-native';
import { brand_primary } from 'theme';
import {
  FavoritesListScreen,
  SearchListScreen,
  DiscoveryListScreen,
  UserInfoScreen,
  DownloadSelectScreen,
  LoginScreen,
  RegisterScreen,
  SettingCenterScreen,
  UserInfoEditScreen,
  PasswordEditScreen,
  ComicDetailScreen,
  ComicContentScreen,
  RankItemListScreen,
  ClassItemListScreen,
  ComicContentListDrawerScreen,
  favoritesListActions,
  SearchIcon,
} from '@';

import onBackPress from './onBack';
import store from '../store';
import { Header, LeftButton, TabIcon } from './components';

export { Header, LeftButton };

function onEnterFavorites() {
  store.dispatch(favoritesListActions.getFavoritesList());
}

const { width } = Dimensions.get('window');
const MyStack: Stack & ComponentClass<IData> = Stack;
const MyTabs: Tabs & ComponentClass<IData> = Tabs;
const RootRoute = () => (
  <Router backAndroidHandler={onBackPress}>
    <MyStack
      key="root"
      navBar={Header}
      transitionConfig={() => ({
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
      })}
    >
      <MyTabs
        activeTintColor={brand_primary}
        inactiveTintColor="#7a7d81"
        activeBackgroundColor="#fff"
        inactiveBackgroundColor="#fff"
        tabBarPosition="bottom"
        animationEnabled={false}
        lazy={false}
        key="tabs"
        initial
        hideNavBar
        swipeEnabled={false}
      >
        <Scene
          key="favorites"
          icon={TabIcon.BookIcon}
          component={FavoritesListScreen}
          onEnter={onEnterFavorites}
          title="书架"
          hideNavBar
          initial
        />
        <Scene
          key="discover"
          icon={TabIcon.DiscoveryIcon}
          component={DiscoveryListScreen}
          title="发现"
          isNoBack
          rightComponent={<SearchIcon />}
          customTitle="漫画分类"
        />
        <Scene
          key="user"
          icon={TabIcon.UserIcon}
          component={UserInfoScreen}
          title="用户"
          hideNavBar
        />
      </MyTabs>
      <Scene
        key="search"
        component={SearchListScreen}
        title="搜索"
        hideNavBar
      />
      <Scene
        key="login"
        component={LoginScreen}
        title="登录"
      />
      <Scene
        key="register"
        component={RegisterScreen}
        title="注册"
      />
      <Scene
        key="settingCenter"
        component={SettingCenterScreen}
        title="设置中心"
      />
      <Scene
        key="userEdit"
        component={UserInfoEditScreen}
        title="个人资料"
        hideNavBar
      />
      <Scene
        key="password"
        component={PasswordEditScreen}
        title="修改密码"
        hideNavBar
      />
      <Scene
        key="rankItem"
        component={RankItemListScreen}
        title="排行榜"
      />
      <Scene
        key="classItem"
        component={ClassItemListScreen}
        title="分类"
      />
      <Scene
        key="comicDetail"
        component={ComicDetailScreen}
        title="漫画详情"
        hideNavBar
      />
      <Scene
        key="downloadSelect"
        component={DownloadSelectScreen}
        title="选择下载章节"
        hideNavBar
      />
      <Drawer
        key="contentListDrawer"
        contentComponent={ComicContentListDrawerScreen}
        drawerPosition="right"
        drawerWidth={width * 0.7}
        drawerBackgroundColor="#333"
        hideNavBar
        wrap={false}
      >
        <Scene
          key="comicContent"
          component={ComicContentScreen}
          title="漫画内容"
          hideNavBar
          onEnter={() => {
            StatusBar.setHidden(true, 'fade');
          }}
          onExit={() => {
            StatusBar.setHidden(false, 'fade');
            Actions.refresh();
          }}
        />
      </Drawer>
    </MyStack>
  </Router>
);

export default RootRoute;
