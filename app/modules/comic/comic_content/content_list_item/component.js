import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { ImgPlaceholder } from '@/comic/comic_content';
import { wrapWithLoading, getImgHeight } from 'utils';

const { prefetch } = Image;

@wrapWithLoading
class ContentListItem extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    hideLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  };

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
      url, index, loading, size, width,
    } = this.props;
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
      <Image
        source={{ uri: url }}
        style={style}
      />
    );
  }
}

export default ContentListItem;
