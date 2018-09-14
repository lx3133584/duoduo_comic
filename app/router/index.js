import React from 'react';
import {
  Scene,
  Router,
  Stack,
  Tabs,
  Drawer,
  Lightbox,
} from 'react-native-router-flux';
// import { StatusBar } from 'react-native';
import { brand_primary } from 'theme';
import {
  FavoritesListScreen,
  SearchListScreen,
  DiscoveryListScreen,
  UserInfoScreen,
  LoginScreen,
  RegisterScreen,
  UserInfoEditScreen,
  PasswordEditScreen,
  ComicDetailScreen,
  ComicContentScreen,
  RankItemListScreen,
  ClassItemListScreen,
  ComicContentListDrawerScreen,
} from '@';

import onBackPress from './onBack';
import { Header, TabIcon } from './components';

export { Header };

// const styleType = {
//   dark: 'dark-content',
//   light: 'light-content',
// };
// const toggleBarStyle = type => () => {
//   const barStyle = styleType[type];
//   if (!barStyle) return;
//   StatusBar.setBarStyle(barStyle, true);
// };

const RootRoute = () => (
  <Router backAndroidHandler={onBackPress}>
    <Lightbox>
      <Stack
        key="root"
        navBar={Header}
      >
        <Tabs
          hideNavBar
          activeTintColor={brand_primary}
          activeBackgroundColor="#fff"
          inactiveBackgroundColor="#fff"
          tabBarPosition="bottom"
          animationEnabled={false}
          lazy={false}
          key="tabs"
          initial
          swipeEnabled={false}
        >
          <Scene
            key="favorites"
            icon={TabIcon.BookIcon}
            component={FavoritesListScreen}
            title="书架"
            hideNavBar
            initial
          />
          <Scene
            key="search"
            icon={TabIcon.SearchIcon}
            component={SearchListScreen}
            title="搜索"
            hideNavBar
          />
          <Scene
            key="discover"
            icon={TabIcon.DiscoveryIcon}
            component={DiscoveryListScreen}
            title="发现"
            hideNavBar
          />
          <Scene
            key="user"
            icon={TabIcon.UserIcon}
            component={UserInfoScreen}
            title="用户"
            hideNavBar
          />
        </Tabs>
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
          key="userEdit"
          component={UserInfoEditScreen}
          title="个人资料"
        />
        <Scene
          key="password"
          component={PasswordEditScreen}
          title="修改密码"
        />
        <Scene
          key="comicDetail"
          component={ComicDetailScreen}
          title="漫画详情"
        />
        <Scene
          key="comicContent"
          component={ComicContentScreen}
          title="漫画内容"
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
        <Drawer
          key="contentListDrawer"
          component={ComicContentListDrawerScreen}
          title="目录"
        />
      </Stack>
    </Lightbox>
  </Router>
);

export default RootRoute;
