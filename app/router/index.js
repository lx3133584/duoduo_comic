import React from 'react';
import {
  Scene,
  Router,
  Stack,
  Tabs,
  Drawer,
  Actions,
} from 'react-native-router-flux';
import StackViewStyleInterpolator from
  'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { Dimensions, StatusBar } from 'react-native';
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
import { Header, LeftButton, TabIcon } from './components';

export { Header, LeftButton };

// const styleType = {
//   dark: 'dark-content',
//   light: 'light-content',
// };
// const toggleBarStyle = type => () => {
//   const barStyle = styleType[type];
//   if (!barStyle) return;
//   StatusBar.setBarStyle(barStyle, true);
// };

const { width } = Dimensions.get('window');


const RootRoute = () => (
  <Router backAndroidHandler={onBackPress}>
    <Stack
      key="root"
      navBar={Header}
      transitionConfig={() => ({
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
      })}
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
          isNoBack
          customTitle="漫画分类"
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
            StatusBar.setHidden(true, true);
          }}
          onExit={() => {
            StatusBar.setHidden(false, true);
            Actions.refresh();
          }}
        />
      </Drawer>
    </Stack>
  </Router>
);

export default RootRoute;
