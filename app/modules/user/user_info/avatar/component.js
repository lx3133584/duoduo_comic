import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';
import baseURL from 'api/base_url';

import avatarImg from './avatar.jpg';

function AvatarComponent(props) {
  const { src, onPress } = props;
  return (
    <Avatar
      size="large"
      rounded
      source={src ? { uri: baseURL + src } : avatarImg}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    />
  );
}
AvatarComponent.propTypes = {
  src: PropTypes.string,
  onPress: PropTypes.func,
};
AvatarComponent.defaultProps = {
  src: '',
  onPress: null,
};
export default AvatarComponent;
