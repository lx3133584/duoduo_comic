import React, { Component } from 'react';

import { TouchableWithoutFeedback, View } from 'react-native';
import { LongList } from '@';
import ContentListItem from '../content_list_item';
import { getImgHeight } from 'utils';
import { IContainer } from './container';

class ContentListScrollComponent extends Component<IContainer> {

  static defaultProps = {
    content_index: 0,
    offset: 0,
  };
  content_ref: any;

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
