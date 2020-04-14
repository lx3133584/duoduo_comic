import React from 'react';
import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TouchableNativeFeedback from '../touchable_native_feedback/component';

const style = {
  marginRight: 4,
};

export default function SearchIcon() {
  return (
    <TouchableNativeFeedback onPress={Actions.search}>
      <FontAwesome name="search" size={18} color="#fff" style={style} />
    </TouchableNativeFeedback>
  );
}
