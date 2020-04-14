import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import ComicList from '../comic_list';
import ComicDetail from '../comic_detail';
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

const routes = [
  { title: '详情', key: 'detail' },
  { title: '目录', key: 'list' },
];

interface IProps {
  index?: number;
}
interface IState {
  index: number;
}

class ComicDetailTabsComponent extends PureComponent<IProps, IState> {

  static defaultProps = {
    index: 0,
  };

  constructor(props) {
    super(props);
    const { index = 0 } = props;
    this.state = {
      index,
    };
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => (
    <TabBar
      {...props}
      style={tabBarStyle}
      labelStyle={labelStyle}
      indicatorStyle={tabBarUnderlineStyle}
    />
  )

  _renderPager = props => (
    <PagerPan
      {...props}
    />
  )

  _renderScene = ({ route }) => this.switchPage(route.key);
  // }
  // return null;

  switchPage = (key: string) => {
    switch (key) {
      case 'detail':
        return <ComicDetail {...this.props} />;
      case 'list':
        return (
          <ListStyled>
            <ComicList {...this.props as any} />
          </ListStyled>
        );
      default:
        return null;
    }
  }

  render() {
    const { index } = this.state;
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
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
