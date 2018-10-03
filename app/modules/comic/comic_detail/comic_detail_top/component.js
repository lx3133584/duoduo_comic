import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Immutable, { is } from 'immutable';
import { Actions } from 'react-native-router-flux';
import { BlurView } from 'react-native-blur';
import {
  Image, Dimensions, findNodeHandle, NetInfo,
} from 'react-native';
import { numberFormat } from 'utils';

const { width } = Dimensions.get('window');

const ContainStyled = styled.View`
  height: 240px;
  background-color: #000;
`;
const coverImageStyled = {
  position: 'absolute',
  bottom: 10,
  right: 10,
  height: 120,
  width: 85,
  zIndex: 2,
  borderWidth: 1,
  borderColor: '#fff',
};
const blurImageStyled = {
  position: 'absolute',
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

class ComicDetailTopComponent extends Component {
  static propTypes = {
    getDetail: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    detail: ImmutablePropTypes.map.isRequired,
    updateCache: PropTypes.func.isRequired,
    useCache: PropTypes.func.isRequired,
    download_list: ImmutablePropTypes.list,
  };

  static defaultProps = {
    download_list: Immutable.List(),
  }

  constructor() {
    super();
    this.onFetch = this.onFetch.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.bgImgRef = React.createRef();
  }

  state = {
    viewRef: null,
  };

  componentDidMount() {
    this.init();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { detail } = this.props;
    const { viewRef } = this.state;
    return !is(nextProps.detail, detail)
      || nextState.viewRef !== viewRef;
  }


  onFetch(id) {
    const { getDetail } = this.props;
    return getDetail(id).then(({ value: { data } = {} }) => data).catch(() => {
      Actions.pop(); // 失败则返回上一个页面
    });
  }

  async init() {
    const { useCache, updateCache, id } = this.props;
    const cache = this.checkLocalCache(id);
    if (cache) {
      useCache(cache);
      NetInfo.isConnected.fetch().then((isConnected) => { // 如果联网则更新缓存
        if (!isConnected) return;
        this.onFetch(id).then((data) => {
          updateCache({ id, data });
        });
      });
    } else {
      await this.onFetch(id);
    }
    this.fetchCompleted = true; // 标识请求已完成
    this.hideLoading();
  }

  checkLocalCache(id) {
    const { download_list } = this.props;
    return download_list.find(i => i.get('id') === id);
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.bgImgRef.current) }, this.hideLoading);
  }

  hideLoading() {
    const { hideLoading } = this.props;
    const { viewRef } = this.state;
    if (!viewRef || !this.fetchCompleted) return; // blur组件未加载或者请求为完成时都不能隐藏loading
    hideLoading();
  }

  render() {
    const { detail } = this.props;
    const { viewRef } = this.state;
    const cover = detail.get('cover');
    const title = detail.get('title');
    const author = detail.get('author');
    const class_name = detail.get('class_name');
    const popularity_number = detail.get('popularity_number');
    return (
      <ContainStyled>
        {cover && (
          <Image
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
        <Image
          style={coverImageStyled}
          source={{ uri: cover }}
        />
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
