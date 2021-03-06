import React, { SFC } from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-vector-icons/Icon';

const ICON_SIZE = 20;

function createIcon(IconComponent: typeof Icon, name: string) {
  const IconC: SFC<{
    focused: boolean;
    activeTintColor: string;
    inactiveTintColor: string;
  }> = ({ focused, activeTintColor, inactiveTintColor }) => (
    <IconComponent name={name} size={ICON_SIZE} color={focused ? activeTintColor : inactiveTintColor} />
  );
  return IconC;
}

export const BookIcon = createIcon(Entypo, 'book');
export const DiscoveryIcon = createIcon(Entypo, 'compass');
export const UserIcon = createIcon(FontAwesome, 'user');
