import React, { Component } from 'react';

import styled from 'styled-components/native';
import { is } from 'immutable';
import { Actions } from 'react-native-router-flux';
import { BlurView } from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import {
  Dimensions, findNodeHandle,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { numberFormat } from 'utils';
import { IContainer } from './container';

const { width } = Dimensions.get('window');

const ContainStyled = styled.View`
  height: 240px;
  background-color: #000;
`;
const coverImageStyled = {
  position: 'absolute' as 'absolute',
  bottom: 10,
  right: 10,
  height: 120,
  width: 85,
  zIndex: 2,
  borderWidth: 1,
  borderColor: '#fff',
};
const blurImageStyled = {
  position: 'absolute' as 'absolute',
  top: 0,
  left: 0,
  width,
  height: 240,
  zIndex: 1,
};
const TextContainStyled = styled.View`
  position: absolute;
  top: 100px;
  left: 20px;
  bottom: 15px;
  z-index: 4;
  width: ${width - 110};
`;
const TitleStyled = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;
const BottomTextContainStyled = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
`;
const BottomTextStyled = styled.Text`
  color: #fff;
  font-size: 12px;
  opacity: 0.8;
`;

class ComicDetailTopComponent extends Component<IContainer> {

  static defaultProps = {
    comic_cache: null,
  };

  bgImgRef: any = React.createRef<FastImage>();

  fetchCompleted = false;

  state = {
    viewRef: null,
  };

  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { detail } = this.props;
    const { viewRef } = this.state;
    return !is(nextProps.detail, detail)
      || nextState.viewRef !== viewRef;
  }

  onFetch(id: number) {
    const { getDetail } = this.props;
    return (getDetail(id) as any).then(({ value: { data } = { data: null } }) => data).catch(() => {
      Actions.pop(); // 失败则返回上一个页面
    });
  }

  async init() {
    const { useCache, updateCache, id, comic_cache } = this.props;
    if (comic_cache) {
      useCache(comic_cache);
      NetInfo.fetch().then(({ isConnected }) => { // 如果联网则更新缓存
        if (!isConnected) return;
        this.onFetch(id).then((data) => {
          updateCache({ id, data });
        });
      });
    } else {
      await this.onFetch(id);
    }
    this.fetchCompleted = true; // 标识请求已完成
    console.log('featch');
    this.hideLoading();
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.bgImgRef.current) }, this.hideLoading);
  }

  hideLoading() {
    const { hideLoading } = this.props;
    const { viewRef } = this.state;
    if (!viewRef || !this.fetchCompleted) return; // blur 组件未加载或者请求为完成时都不能隐藏loading
    hideLoading();
  }

  render() {
    const { detail } = this.props;
    const { viewRef } = this.state;
    const cover: any = detail.get('cover');
    const title = detail.get('title');
    const author = detail.get('author');
    const class_name = detail.get('class_name');
    const popularity_number: any = detail.get('popularity_number', '');
    return (
      <ContainStyled>
        {cover && (
          <FastImage
            ref={this.bgImgRef}
            style={blurImageStyled}
            onLoadEnd={this.imageLoaded}
            source={{ uri: cover }}
          />
        )}
        {viewRef && (
          <BlurView
            style={blurImageStyled}
            viewRef={viewRef}
            blurType="dark"
            blurAmount={6}
          />
        )}
        {cover && (
          <FastImage
            style={coverImageStyled}
            source={{ uri: cover }}
          />
        )}
        <TextContainStyled>
          <TitleStyled>
            {title}
          </TitleStyled>
          <BottomTextStyled>
            {author || '佚名'}
          </BottomTextStyled>
          <BottomTextContainStyled>
            <BottomTextStyled>
              {class_name && (`${class_name} | `)}
              人气
              {' '}
              {numberFormat(popularity_number)}
            </BottomTextStyled>
          </BottomTextContainStyled>
        </TextContainStyled>
      </ContainStyled>
    );
  }
}

export default ComicDetailTopComponent;
