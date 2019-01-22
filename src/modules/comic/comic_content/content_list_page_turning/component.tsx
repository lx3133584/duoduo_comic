import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Dimensions, View } from 'react-native';
import { ContentListItem } from '..';
import styled from 'styled-components';
import { ContainerType } from './container';

const { width: screenWidth, height } = Dimensions.get('window');
const ContainStyled = styled(View)`
  width: ${screenWidth};
  height: ${height};
`;

class ContentListPageTurningComponent extends Component<ContainerType> {
  static propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
    })).isRequired,
    content_index: PropTypes.number,
    width: PropTypes.number.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    renderFooterComponent: PropTypes.func.isRequired,
    offset: PropTypes.number,
    total: PropTypes.number.isRequired,
    saveIndex: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    noMoreData: PropTypes.bool.isRequired,
    onFetch: PropTypes.func.isRequired,
    increasePage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    content_index: 0,
    offset: 0,
  };

  loading = false;

  shouldComponentUpdate(nextProps: ContainerType) {
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
