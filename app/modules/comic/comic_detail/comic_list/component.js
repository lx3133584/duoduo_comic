import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  SectionList, Dimensions, NetInfo, PixelRatio,
} from 'react-native';
import Immutable, { is } from 'immutable';
import { Actions } from 'react-native-router-flux';
import { ComicListItem, ComicListCategory, Progress } from '@/comic/comic_detail';
import styled from 'styled-components';
import { wrapWithLoading } from 'utils';

const { height } = Dimensions.get('window');
const initNumber = Math.ceil(height / 50);

const px1 = 1 / PixelRatio.get();
const ItemSeparatorComponent = styled.View`
  border-bottom-color: #c0c0c0;
  border-bottom-width: ${px1};
`;

function _getItemLayout(arr, index) {
  let len = 0;
  let offset = 50;
  arr.forEach(({ data }, i) => { // 计算分类标题高度
    len += data.length;
    if (i < len) return;
    offset += 50;
  });
  return { length: 50 + px1, offset: (50 + px1) * (index - 1) + offset, index };
}

function _keyExtractor(item) {
  return item.id;
}

@wrapWithLoading
class ComicListComponent extends Component {
  static propTypes = {
    list: ImmutablePropTypes.list.isRequired,
    chapter_id: PropTypes.number,
    comic_id: PropTypes.number,
    getList: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    useCache: PropTypes.func.isRequired,
    updateCache: PropTypes.func.isRequired,
    isReplace: PropTypes.bool,
    dark: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    checkboxData: ImmutablePropTypes.map,
    download_list: ImmutablePropTypes.list,
    showCheckbox: PropTypes.bool,
    changeCheckbox: PropTypes.func,
  };

  static defaultProps = {
    chapter_id: 0,
    comic_id: 0,
    isReplace: false,
    dark: false,
    checkboxData: Immutable.Map(),
    download_list: Immutable.List(),
    showCheckbox: false,
    changeCheckbox: () => null,
  }

  comic_list_ref = React.createRef()

  listMap = Immutable.Map() // 缓存的目录列表Map

  id = 0 // 漫画id

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    const { download_list } = this.props;
    if (is(nextProps.download_list, download_list)) return;
    const cache = this.checkLocalCache(this.id, nextProps);
    if (cache) this.listMap = cache.get('listMap');
  }

  shouldComponentUpdate(nextProps) {
    const {
      list, chapter_id, loading, checkboxData, download_list,
    } = this.props;
    return !is(nextProps.list, list)
      || !is(nextProps.download_list, download_list)
      || nextProps.chapter_id !== chapter_id
      || !is(nextProps.checkboxData, checkboxData)
      || nextProps.loading !== loading;
  }

  onFetch(id) {
    const { getList } = this.props;
    return getList(id).then(({ value: { data } = {} }) => data);
  }

  async init() {
    const {
      id, hideLoading, comic_id, showCheckbox, isReplace, useCache, updateCache,
    } = this.props;
    this.id = id || comic_id;
    const cache = this.checkLocalCache(this.id);
    if (cache) this.listMap = cache.get('listMap');
    if (showCheckbox || isReplace) return hideLoading();
    let list = [];
    if (cache) {
      const l = cache.get('list');
      useCache(l);
      NetInfo.isConnected.fetch().then((isConnected) => { // 如果联网则更新缓存
        if (!isConnected) return;
        this.onFetch(this.id).then((data) => {
          updateCache({ id: this.id, data });
        });
      });
      list = l;
    } else {
      list = await this.onFetch(this.id);
    }
    const { sectionIndex, itemIndex } = this.findCurChapterIndex(list);
    setTimeout(() => this.scrollTo({ sectionIndex, itemIndex }), 0);
    return hideLoading();
  }

  scrollTo({ sectionIndex = 0, itemIndex = 0 }) {
    const ref = this.comic_list_ref.current;
    ref && ref.scrollToLocation({
      sectionIndex,
      itemIndex,
      viewPosition: 0,
      viewOffset: 150,
    });
  }

  findCurChapterIndex(list) { // 找到当前阅读章节位置(index)
    const { chapter_id } = this.props;
    let sectionIndex = 0;
    let itemIndex = 0;
    if (list) {
      list.forEach((outer, o) => {
        outer.data.forEach((inner, i) => {
          if (inner.id === chapter_id) {
            sectionIndex = o;
            itemIndex = i;
          }
        });
      });
    }
    return { sectionIndex, itemIndex };
  }

  checkLocalCache(id, props = this.props) {
    const { download_list } = props;
    return download_list.find(i => i.get('id') === id);
  }

  renderItem = ({ item }) => {
    const {
      chapter_id, isReplace, dark,
      showCheckbox, changeCheckbox, checkboxData,
    } = this.props;
    const status = this.listMap.getIn([item.id, 'status']);
    const params = { chapter_id: item.id, title: item.title, pre: false };
    let itemOnPress;
    if (showCheckbox) {
      itemOnPress = () => {
        if (status) return;
        changeCheckbox(item.id);
      };
    } else if (isReplace) {
      itemOnPress = () => {
        Actions.drawerClose();
        Actions.replace('comicContent', params);
      };
    } else {
      itemOnPress = () => Actions.comicContent(params);
    }
    return (
      <ComicListItem
        {...item}
        dark={dark}
        showCheckbox={showCheckbox}
        checked={checkboxData.get(item.id)}
        itemOnPress={itemOnPress}
        status={status}
        isDisabled={showCheckbox && !!status}
        active={item.id === chapter_id}
      />
    );
  };

  renderSectionHeader = ({ section }) => {
    const { dark } = this.props;
    return (
      <ComicListCategory dark={dark}>
        {section.name}
      </ComicListCategory>
    );
  };

  renderItemSeparator = () => {
    const { dark } = this.props;
    return <ItemSeparatorComponent style={dark && { borderBottomColor: '#fff' }} />;
  };

  render() {
    const {
      list, loading, chapter_id, checkboxData,
    } = this.props;
    if (loading) return <Progress />;
    const extraData = {
      checkboxData,
      chapter_id,
      listMap: this.listMap,
    };
    const listFormat = list.toArray();
    return (
      <SectionList
        ref={this._getRef}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ItemSeparatorComponent={this.renderItemSeparator}
        keyExtractor={_keyExtractor}
        stickySectionHeadersEnabled
        initialNumToRender={initNumber}
        sections={listFormat}
        extraData={extraData}
        getItemLayout={_getItemLayout}
      />
    );
  }
}

export default ComicListComponent;
