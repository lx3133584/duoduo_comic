import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { FavoritesList, HistoryList } from '@/favorites/favorites_list';
import { Dimensions } from 'react-native';
import { Header } from 'router';
import {
  TabView, PagerPan, TabBar,
} from 'react-native-tab-view';
import { LoginNowButton } from '@';
import { brand_primary } from 'theme';

const { width, height } = Dimensions.get('window');

const ContainStyled = styled.View`
  height: ${height * 0.7};
  justify-content: center;
`;
const initialLayout = {
  height: 0,
  width,
};
const tabBarStyle = {
  paddingTop: Header.statusBarHeight,
  backgroundColor: brand_primary,
};
const tabStyle = {
  width: width / 5,
};
const labelStyle = {
  color: '#fff',
};
const tabBarUnderlineStyle = {
  backgroundColor: '#fff',
  height: 4,
  borderRadius: 10,
};
function switchPage(key) {
  switch (key) {
    case 'favorite':
      return <FavoritesList />;
    case 'history':
      return <HistoryList />;
    default:
      return null;
  }
}

class FavoritesTabsComponent extends PureComponent {
  static propTypes = {
    info: ImmutablePropTypes.map.isRequired,
    index: PropTypes.number,
  };

  static defaultProps = {
    index: 0,
  }

  constructor(props) {
    super(props);
    const { index } = props;
    this.state = {
      index,
      routes: [
        { title: '收藏', key: 'favorite' },
        { title: '历史', key: 'history' },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { index } = this.state;
    if (nextProps.index !== index) {
      this.setState({ index: nextProps.index || 0 });
    }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => (
    <TabBar
      style={tabBarStyle}
      labelStyle={labelStyle}
      tabStyle={tabStyle}
      indicatorStyle={tabBarUnderlineStyle}
      {...props}
    />
  );

  _renderPager = props => (
    <PagerPan
      swipeEnabled
      {...props}
    />
  );

  _renderScene = ({ route }) => {
    const { info } = this.props;
    if (!info.size) {
      return (
        <ContainStyled>
          <LoginNowButton large />
        </ContainStyled>
      );
    }
    return switchPage(route.key);
  }

  render() {
    const { index, routes } = this.state;
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        renderPager={this._renderPager}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
        useNativeDriver
      />
    );
  }
}


export default FavoritesTabsComponent;
