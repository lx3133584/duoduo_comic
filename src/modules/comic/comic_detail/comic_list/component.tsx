import React, { Component } from 'react';

import {
  SectionList, Dimensions, PixelRatio,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Immutable, { is } from 'immutable';
import { Actions } from 'react-native-router-flux';
import ComicListItem from '../comic_list_item';
import ComicListCategory from '../comic_list_category';
import Progress from '../progress';
import styled from 'styled-components/native';
import { wrapWithLoading } from 'utils';
import { IContainer } from './container';

const { height } = Dimensions.get('window');
const initNumber = Math.ceil(height / 50);

const px1 = 1 / PixelRatio.get();
const ItemSeparatorComponent = styled.View`
  border-bottom-color: #c0c0c0;
  border-bottom-width: ${px1};
`;

function _getItemLayout(
  arr: Array<{
  data: IData[];
}> | null,
  index: number,
) {
  if (!arr) return { length: 50, offset: 50 * index, index };
  let len = 0;
  let offset = 50;
  arr.forEach(({ data }, i) => { // 计算分类标题高度
    len += data.length;
    if (i < len) return;
    offset += 50;
  });
  return { length: 50 + px1, offset: (50 + px1) * (index - 1) + offset, index };
}

function _keyExtractor(item: IItem) {
  return `${item.id}`;
}
@wrapWithLoading
class ComicListComponent extends Component<IContainer> {

  static defaultProps = {
    chapter_id: 0,
    comic_id: 0,
    isReplace: false,
    dark: false,
    checkboxData: Immutable.Map(),
    comic_list_map_cache: null,
    comic_list_cache: null,
    showCheckbox: false,
    changeCheckbox: () => null,
  };

  comic_list_ref = React.createRef<SectionList<Comic.ChapterItem>>();

  componentDidMount() {
    this.init();
  }

  shouldComponentUpdate(nextProps) {
    const {
      list, chapter_id, loading, checkboxData, comic_list_map_cache,
    } = this.props;
    return !is(nextProps.list, list)
      || !is(nextProps.comic_list_map_cache, comic_list_map_cache)
      || nextProps.chapter_id !== chapter_id
      || !is(nextProps.checkboxData, checkboxData)
      || nextProps.loading !== loading;
  }

  onFetch(id: number) {
    const { getList } = this.props;
    return (getList(id) as any).then(({ value: { data } = { data: null } } = {}) => data);
  }

  async init() {
    const {
      hideLoading, comic_id, showCheckbox, isReplace, useCache, updateCache, comic_list_cache,
    } = this.props;
    if (showCheckbox || isReplace) return hideLoading();
    if (comic_list_cache) {
      useCache(comic_list_cache);
      NetInfo.fetch().then(({ isConnected }) => { // 如果联网则更新缓存
        if (!isConnected) return;
        this.onFetch(comic_id).then((data) => {
          updateCache({ id: comic_id, data });
        });
      });
    } else {
      await this.onFetch(comic_id);
    }
    // const { sectionIndex, itemIndex } = this.findCurChapterIndex(list);
    // setTimeout(() => this.scrollTo({ sectionIndex, itemIndex }), 0);
    return hideLoading();
  }

  scrollTo({ sectionIndex = 0, itemIndex = 0 }) {
    const ref = this.comic_list_ref.current;
    if (!ref) return;
    ref.scrollToLocation!({
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

  renderItem = ({ item }: any) => {
    const {
      chapter_id, isReplace, dark,
      showCheckbox, changeCheckbox, checkboxData,
      comic_list_map_cache,
    } = this.props;
    const status = comic_list_map_cache && comic_list_map_cache.getIn([item.id, 'status']);
    const params = { chapter_id: item.id, title: item.title, pre: false };
    let itemOnPress;
    if (showCheckbox) {
      itemOnPress = () => {
        if (status) return;
        if (!changeCheckbox) return console.error('缺少参数 `changeCheckbox`');
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
  }

  renderSectionHeader = ({ section }: any) => {
    const { dark } = this.props;
    return (
      <ComicListCategory dark={dark}>
        {section.name}
      </ComicListCategory>
    );
  }

  renderItemSeparator = () => {
    const { dark } = this.props;
    return <ItemSeparatorComponent style={dark && { borderBottomColor: '#fff' }} />;
  }

  render() {
    const {
      list, loading, chapter_id, checkboxData, comic_list_map_cache,
    } = this.props;
    if (loading) return <Progress />;
    const extraData = {
      checkboxData,
      chapter_id,
      comic_list_map_cache,
    };
    const listFormat = list.toArray();
    return (
      <SectionList
        ref={this.comic_list_ref}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ItemSeparatorComponent={this.renderItemSeparator}
        refreshing={false}
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
