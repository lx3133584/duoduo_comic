import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ICON_SIZE = 20;

export const BookIcon = () => <Entypo name="book" size={ICON_SIZE} />;
export const SearchIcon = () => <FontAwesome name="search" size={ICON_SIZE} />;
export const DiscoveryIcon = () => <Entypo name="compass" size={ICON_SIZE} />;
export const UserIcon = () => <FontAwesome name="user" size={ICON_SIZE} />;
