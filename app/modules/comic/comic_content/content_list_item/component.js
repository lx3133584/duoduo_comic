import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import { ImgPlaceholder } from '@/comic/comic_content';
import { getImgHeight } from 'utils';

const Image = createImageProgress(FastImage);

class ContentListItem extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    path: PropTypes.string,
    width: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    path: '',
  }

  render() {
    const {
      url, path, index, size, width,
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
    return (
      <Image
        source={{ uri }}
        style={style}
        renderIndicator={(progress) => {
          const p = ((progress / 100) || 0).toFixed(1);
          return (
            <ImgPlaceholder
              style={style}
              title={`${index}`}
              subTitle={`加载中...${+p ? `${p}%` : ''}`}
            />
          );
        }}
        renderError={() => (
          <ImgPlaceholder
            style={style}
            title={`${index}`}
            subTitle="加载失败"
          />
        )}
      />
    );
  }
}

export default ContentListItem;
