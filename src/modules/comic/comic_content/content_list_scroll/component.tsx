import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import { LongList } from '@';
import { ContentListItem } from '..';
import { getImgHeight } from 'utils';
import { ContainerType } from './container';

class ContentListScrollComponent extends Component<ContainerType> {
  static propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      index: PropTypes.number,
      size: PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number,
      }),
    })).isRequired,
    img_position_arr: ImmutablePropTypes.list.isRequired,
    content_index: PropTypes.number,
    offset: PropTypes.number,
    width: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    renderFooterComponent: PropTypes.func.isRequired,
    saveIndex: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    increasePage: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    onFetch: PropTypes.func.isRequired,
    noMoreData: PropTypes.bool.isRequired,
    getRef: PropTypes.func.isRequired,
  };

  static defaultProps = {
    content_index: 0,
    offset: 0,
  };

  constructor(props) {
    super(props);
    const { getRef } = props;
    getRef(this);
  }

  shouldComponentUpdate(nextProps) {
    const { content, page, noMoreData } = this.props;
    return nextProps.content !== content ||
      nextProps.noMoreData !== noMoreData ||
      nextProps.page !== page;
  }

  onScroll = (e) => {
    const {
      saveIndex, content_index, img_position_arr, offset,
    } = this.props;
    const scrollY = e.nativeEvent.contentOffset.y;
    let index = 0;
    for (let len = img_position_arr.size, i = len - 1; i >= 0; i--) {
      if (scrollY > img_position_arr.get(i)) {
        index = i;
        break;
      }
    }
    if (index !== content_index - offset) saveIndex(index + offset);
  }

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
  }

  _getItemLayout = (data, index) => {
    const { img_position_arr, width } = this.props;
    const item = data[index];
    const length = getImgHeight(item.size, width);
    const offset = img_position_arr.get(index);
    return { length, offset, index };
  }

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
  }

  render() {
    const { content, renderFooterComponent } = this.props;
    return (
      <LongList
        {...this.props}
        getRef={this._getRef}
        list={content}
        Item={this.renderItem}
        customKey="url"
        onScroll={this.onScroll}
        ListFooterComponent={renderFooterComponent}
        getItemLayout={this._getItemLayout}
        initialNumToRender={3}
        isLong
      />
    );
  }
}

export default ContentListScrollComponent;
