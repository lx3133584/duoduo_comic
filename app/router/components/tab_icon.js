import React from 'react';
import PropTypes from 'prop-types';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ICON_SIZE = 20;

function createIcon(IconComponent, name) {
  const Icon = ({ focused, activeTintColor }) => (
    <IconComponent name={name} size={ICON_SIZE} color={focused ? activeTintColor : null} />
  );
  Icon.propTypes = {
    focused: PropTypes.bool.isRequired,
    activeTintColor: PropTypes.string.isRequired,
  };
  return Icon;
}

export const BookIcon = createIcon(Entypo, 'book');
export const SearchIcon = createIcon(FontAwesome, 'search');
export const DiscoveryIcon = createIcon(Entypo, 'compass');
export const UserIcon = createIcon(FontAwesome, 'user');
