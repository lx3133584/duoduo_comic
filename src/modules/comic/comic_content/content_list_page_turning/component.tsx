import React, { Component } from 'react';

import ImageViewer from 'react-native-image-zoom-viewer';
import { Dimensions } from 'react-native';
import ContentListItem from '../content_list_item';
import styled from 'styled-components/native';
import { IContainer } from './container';

const { width: screenWidth, height } = Dimensions.get('window');
const ContainStyled = styled.View`
  width: ${screenWidth};
  height: ${height};
`;
interface IProps extends IContainer {
  toggleDrawer(): void;
}
class ContentListPageTurningComponent extends Component<IProps> {

  static defaultProps = {
    content_index: 0,
    offset: 0,
  };

  loading = false;

  shouldComponentUpdate(nextProps: IContainer) {
    const { content, content_index, page, noMoreData } = this.props;
    return nextProps.content !== content ||
      nextProps.page !== page ||
      nextProps.noMoreData !== noMoreData ||
      nextProps.content_index !== content_index;
  }

  onChange = (index: number) => {
    const {
      saveIndex, content, content_index, offset,
    } = this.props;
    const len = content.length;
    if (index > len - 3) {
      if (!this.loading) this._onFetch();
    }
    if (index !== content_index - offset) saveIndex(index + offset);
  }

  _onFetch() {
    const { onFetch, increasePage, page } = this.props;
    if (!onFetch) return;
    this.loading = true;
    const promise = onFetch(page);
    if (!promise) return;
    promise.then((res) => {
      this.loading = false;
      if (!res.error && res.value.result.data.length) {
        increasePage();
      }
    }).catch(() => {
      this.loading = false;
    });
  }

  renderFooter = (index: number) => {
    const { content, renderFooterComponent } = this.props;
    const len = content.length;
    if (len - 1 !== index) return null;
    return renderFooterComponent();
  }

  render() {
    const {
      content, content_index, offset, width, toggleDrawer,
    } = this.props;
    if (!content.length) return null;
    return (
      <ContainStyled>
        <ImageViewer
          index={content_index - offset}
          imageUrls={content}
          onChange={this.onChange}
          renderFooter={this.renderFooter}
          onClick={toggleDrawer}
          renderImage={props => <ContentListItem {...props} />}
          flipThreshold={60}
          maxOverflow={width}
          enablePreload
          renderIndicator={() => null}
        />
      </ContainStyled>
    );
  }
}

export default ContentListPageTurningComponent;
