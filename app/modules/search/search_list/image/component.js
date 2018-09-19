import React from 'react';
import PropTypes from 'prop-types';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import Progress from 'react-native-progress/CircleSnail';
import {
  green, red, purple,
} from 'theme';

const indicatorProps = {
  color: [red, green, purple],
};

const Image = createImageProgress(FastImage);

function ImageComponent({ source, imageStyle }) {
  return (
    <Image
      source={source}
      resizeMode="cover"
      indicatorProps={indicatorProps}
      indicator={Progress}
      style={imageStyle}
    />
  );
}
ImageComponent.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      uri: PropTypes.string,
    }),
  ]).isRequired,
  imageStyle: PropTypes.object,
};
ImageComponent.defaultProps = {
  imageStyle: {},
};
export default ImageComponent;
