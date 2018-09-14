import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Dimensions } from 'react-native';
import { ImgPlaceholder, ContentListFooter } from '..';
import styled from 'styled-components';

import failImg from './fail.jpg';

const { width: screenWidth, height } = Dimensions.get('window');
const ContainStyled = styled.View`
  width: ${screenWidth};
  height: ${height};
`;

class ContentListPageTurningComponent extends Component {
  static propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
    })).isRequired,
    content_index: PropTypes.number,
    width: PropTypes.number.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    offset: PropTypes.number,
    total: PropTypes.number.isRequired,
    saveIndex: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    onFetch: PropTypes.func.isRequired,
    increasePage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    content_index: 0,
    offset: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      showFooter: false,
    };
    this.loading = false;
  }

  shouldComponentUpdate(nextProps) {
    const { content, content_index } = this.props;
    return (nextProps.content !== content) || (nextProps.content_index !== content_index);
  }

  onChange = (index) => {
    const {
      saveIndex, content, content_index, total, offset,
    } = this.props;
    const len = content.length;
    if (index > len - 3) {
      if (!this.loading) this._onFetch();
    }
    this.setState({ showFooter: total - 1 === index + offset });
    if (index !== content_index - offset) saveIndex(index + offset);
  };

  _onFetch() {
    const { onFetch, increasePage, page } = this.props;
    if (!onFetch) return;
    this.loading = true;
    onFetch(page).then((res) => {
      this.loading = false;
      if (!res.error && res.value.result.data.length) {
        increasePage();
      }
    }).catch(() => {
      this.loading = false;
    });
  }

  renderLoading = () => (
    <ImgPlaceholder style={{ width: screenWidth, height }}>
loading
    </ImgPlaceholder>
  );

  renderFooter = () => {
    const { showFooter } = this.state;
    if (!showFooter) return null;
    return <ContentListFooter />;
  };

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
          failImageSource={failImg}
          loadingRender={this.renderLoading}
          renderFooter={this.renderFooter}
          onClick={toggleDrawer}
          flipThreshold={60}
          maxOverflow={width}
          renderIndicator={() => null}
        />
      </ContainStyled>
    );
  }
}

export default ContentListPageTurningComponent;
