import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from 'apsl-react-native-button';
import { createImageProgress } from 'react-native-image-progress';
import { ImgPlaceholder } from '@/comic/comic_content';
import { getImgHeight } from 'utils';

const Image = createImageProgress(FastImage);
const buttonStyle = {
  backgroundColor: '#999',
  borderColor: '#eee',
  width: 100,
  height: 40,
  alignSelf: 'center',
};
const textStyle = {
  color: '#eee',
  fontSize: 16,
};
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

  state = {
    reload_key: 0,
  }

  reloadImage = () => this.setState(prev => ({ reload_key: prev.reload_key + 1 }))

  render() {
    const {
      url, path, index, size, width,
    } = this.props;
    const { reload_key } = this.state;
    const uri = path
      ? Platform.OS === 'android'
        ? `file://${path}`
        : path
      : reload_key
        ? `${url}?reload=${reload_key}`
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
          const p = ~~(progress * 100);
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
          >
            <Button
              style={buttonStyle}
              textStyle={textStyle}
              onPress={this.reloadImage}
            >
              重新加载
            </Button>
          </ImgPlaceholder>
        )}
      />
    );
  }
}

export default ContentListItem;
