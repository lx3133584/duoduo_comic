import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ComicList, ComicDetail } from '@/comic/comic_detail';
import { Dimensions } from 'react-native';
import {
  TabView, PagerPan, TabBar,
} from 'react-native-tab-view';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};
const ListStyled = styled.View`
  background-color: #fff;
  margin-top: 10px;
`;
const tabBarStyle = {
  backgroundColor: '#fff',
};
const labelStyle = {
  color: '#333',
};
const tabBarUnderlineStyle = {
  backgroundColor: '#333',
  height: 4,
  borderRadius: 10,
};

function switchPage(key) {
  switch (key) {
    case 'detail':
      return <ComicDetail />;
    case 'list':
      return (
        <ListStyled>
          <ComicList />
        </ListStyled>
      );
    default:
      return null;
  }
}

class ComicDetailTabsComponent extends PureComponent {
  static propTypes = {
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
        { title: '详情', key: 'detail' },
        { title: '目录', key: 'list' },
      ],
    };
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => (
    <TabBar
      {...props}
      style={tabBarStyle}
      labelStyle={labelStyle}
      indicatorStyle={tabBarUnderlineStyle}
    />
  );

  _renderPager = props => (
    <PagerPan
      {...props}
    />
  );

  _renderScene = ({ route }) => switchPage(route.key)
  // }
  // return null;

  render() {
    const { index, routes } = this.state;
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        renderPager={this._renderPager}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
        useNativeDriver
        swipeEnabled
      />
    );
  }
}


export default ComicDetailTabsComponent;
