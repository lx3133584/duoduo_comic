import React from 'react';

import { Avatar } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
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
      ImageComponent={(prop: any) => <FastImage {...prop} />}
      {...props}
    />
  );
}

AvatarComponent.defaultProps = {
  src: '',
  onPress: null,
};
export default AvatarComponent;
