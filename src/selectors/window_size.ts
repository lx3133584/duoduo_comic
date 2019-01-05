import { createSelector } from 'reselect';
import { Dimensions } from 'react-native';
import { RootState } from 'store';

const { width, height } = Dimensions.get('window');

const orientationSelector = (state: RootState) => state.config.get('orientation', 'vertical');

export default createSelector(orientationSelector, (value) => {
  if (value === 'horizon') {
    return { width: height, height: width };
  }
  return { width, height };
});
