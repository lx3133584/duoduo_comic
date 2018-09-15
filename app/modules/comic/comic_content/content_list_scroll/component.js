import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import { LongList } from '@';
import { ContentListItem, ContentListFooter } from '@/comic/comic_content';
import { getImgHeight } from 'utils';

class ContentListScrollComponent extends Component {
  static propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      index: PropTypes.number,
      size: PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number,
      }),
    })).isRequired,
    img_positon_arr: ImmutablePropTypes.list.isRequired,
    content_index: PropTypes.number,
    offset: PropTypes.number,
    width: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    saveIndex: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    increasePage: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    onFetch: PropTypes.func.isRequired,
    getRef: PropTypes.func.isRequired,
  };

  static defaultProps = {
    content_index: 0,
    offset: 0,
  }

  constructor(props) {
    super(props);
    const { getRef } = props;
    getRef(this);
  }

  shouldComponentUpdate(nextProps) {
    const { content } = this.props;
    return nextProps.content !== content;
  }

  onScroll = (e) => {
    const {
      saveIndex, content_index, img_positon_arr, offset,
    } = this.props;
    const scrollY = e.nativeEvent.contentOffset.y;
    let index = 0;
    for (let len = img_positon_arr.size, i = len - 1; i >= 0; i--) {
      if (scrollY > img_positon_arr.get(i)) {
        index = i;
        break;
      }
    }
    if (index !== content_index - offset) saveIndex(index + offset);
  };

  scrollTo = (index = 0) => {
    const { content } = this.props;
    const len = content.length - 1;
    if (index > len) index = len;
    if (index < 0) return;
    this.content_ref && this.content_ref.scrollToIndex({
      viewPosition: 0,
      index,
      animated: false,
      viewOffset: false,
    });
  };

  _getItemLayout = (data, index) => {
    const { img_positon_arr, width } = this.props;
    const item = data[index];
    const length = getImgHeight(item.size, width);
    const offset = img_positon_arr.get(index);
    return { length, offset, index };
  };

  _getRef = ref => this.content_ref = ref;

  renderItem = (props) => {
    const { toggleDrawer } = this.props;
    return (
      <TouchableWithoutFeedback onPress={toggleDrawer}>
        <View>
          <ContentListItem {...props} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      content, page, onRefresh, onFetch, increasePage,
    } = this.props;
    return (
      <LongList
        getRef={this._getRef}
        list={content}
        Item={this.renderItem}
        customkey="index"
        onFetch={onFetch}
        onScroll={this.onScroll}
        ListFooterComponent={ContentListFooter}
        getItemLayout={this._getItemLayout}
        initialNumToRender={3}
        page={page}
        increasePage={increasePage}
        callback={onRefresh}
        isLong
      />
    );
  }
}

export default ContentListScrollComponent;
