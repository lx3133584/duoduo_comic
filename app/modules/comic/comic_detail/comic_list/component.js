import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { SectionList, Dimensions } from 'react-native';
import Immutable, { is } from 'immutable';
import { Actions } from 'react-native-router-flux';
import { ComicListItem, ComicListCategory, Progress } from '@/comic/comic_detail';
import styled from 'styled-components';
import { wrapWithLoading } from 'utils';

const { height } = Dimensions.get('window');
const initNumber = Math.ceil(height / 50);

const ItemSeparatorComponent = styled.View`
  border-bottom-color: #c0c0c0;
  border-bottom-width: 1px;
`;

function _getItemLayout(arr, index) {
  let len = 0;
  let offset = 50;
  arr.forEach(({ data }, i) => { // 计算分类标题高度
    len += data.length;
    if (i < len) return;
    offset += 50;
  });
  return { length: 51, offset: 51 * (index - 1) + offset, index };
}

function _keyExtractor(item) {
  return item.id;
}

@wrapWithLoading
class ComicListComponent extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    chapter_id: PropTypes.number,
    comic_id: PropTypes.number,
    getList: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    isReplace: PropTypes.bool,
    dark: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    checkboxData: ImmutablePropTypes.map,
    showCheckbox: PropTypes.bool,
    changeCheckbox: PropTypes.func,
  };

  static defaultProps = {
    chapter_id: 0,
    comic_id: 0,
    isReplace: false,
    dark: false,
    checkboxData: Immutable.Map(),
    showCheckbox: false,
    changeCheckbox: () => null,
  }

  componentDidMount() {
    this.onFetch();
  }

  shouldComponentUpdate(nextProps) {
    const {
      list, chapter_id, loading, checkboxData,
    } = this.props;
    return nextProps.list !== list
      || nextProps.chapter_id !== chapter_id
      || !is(nextProps.checkboxData, checkboxData)
      || nextProps.loading !== loading;
  }

  async onFetch() {
    const {
      id, getList, hideLoading, comic_id, chapter_id, showCheckbox,
    } = this.props;
    if (showCheckbox) return hideLoading();
    let res = {};
    try {
      res = await getList(id || comic_id);
    } catch (e) {
      return hideLoading();
    }
    let sectionIndex = 0;
    let itemIndex = 0;
    res.value && res.value.data.forEach((outer, o) => {
      outer.data.forEach((inner, i) => {
        if (inner.id === chapter_id) {
          sectionIndex = o;
          itemIndex = i;
        }
      });
    });
    setTimeout(() => this.scrollTo({ sectionIndex, itemIndex }), 0);
    return hideLoading();
  }

  scrollTo = ({ sectionIndex = 0, itemIndex = 0 }) => {
    this.comic_list_ref && this.comic_list_ref.scrollToLocation({
      sectionIndex,
      itemIndex,
      viewPosition: 0,
      viewOffset: 150,
    });
  };

  _getRef = ref => this.comic_list_ref = ref;

  renderItem = ({ item }) => {
    const {
      chapter_id, isReplace, dark, showCheckbox, changeCheckbox, checkboxData,
    } = this.props;
    const params = { chapter_id: item.id, title: item.title, pre: false };
    let itemOnPress;
    if (showCheckbox) itemOnPress = () => changeCheckbox(item.id);
    else if (isReplace) {
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
    };
    return (
      <SectionList
        ref={this._getRef}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ItemSeparatorComponent={this.renderItemSeparator}
        keyExtractor={_keyExtractor}
        stickySectionHeadersEnabled
        initialNumToRender={initNumber}
        sections={list}
        extraData={extraData}
        getItemLayout={_getItemLayout}
      />
    );
  }
}

export default ComicListComponent;
