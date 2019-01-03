import { createSelector } from 'reselect';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const orientationSelector = state => state.config.get('orientation', 'vertical');

export default createSelector(orientationSelector, (value) => {
  if (value === 'horizon') {
    return { width: height, height: width };
  }
  return { width, height };
});
