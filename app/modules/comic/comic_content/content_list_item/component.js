import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ImgPlaceholder } from '@/comic/comic_content';
import { wrapWithLoading, getImgHeight } from 'utils';

const { prefetch } = Image;

@wrapWithLoading
class ContentListItem extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    path: PropTypes.string,
    width: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    hideLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    path: '',
  }

  componentDidMount() {
    this.preFetchImage();
  }

  async preFetchImage() {
    const { url, hideLoading } = this.props;
    await prefetch(url);
    hideLoading();
  }

  render() {
    const {
      url, path, index, loading, size, width,
    } = this.props;
    const uri = path
      ? Platform.OS === 'android'
        ? `file://${path}`
        : path
      : url;
    const style = {
      width,
      height: getImgHeight(size, width),
    };
    if (loading) {
      return (
        <ImgPlaceholder style={style}>
          {index}
        </ImgPlaceholder>
      );
    }
    return (
      <FastImage
        source={{ uri }}
        style={style}
      />
    );
  }
}

export default ContentListItem;
