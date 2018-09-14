import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import { Dimensions } from 'react-native';
import {
  switchReadingMode,
  switchCuttingMode,
  switchOrientation,
  switchBrightness,
  changeWidth,
} from './actions';

const { width } = Dimensions.get('window');
const initialState = Immutable.Map({
  mode: 'scroll', // 滚动模式scroll | 翻页模式page_turning
  whether_to_cut: false, // 是否分割图片
  brightness: 0.5, // 亮度
  width,
  orientation: 'vertical', // 横屏horizon | 竖屏vertical
});

export default handleActions({
  [switchReadingMode]: (state, action) => state.set('mode', action.payload),
  [switchCuttingMode]: (state, action) => state.set('whether_to_cut', action.payload),
  [switchBrightness]: (state, action) => state.set('brightness', action.payload),
  [switchOrientation]: (state, action) => state.set('orientation', action.payload),
  [changeWidth]: (state, action) => state.set('width', action.payload),
}, initialState);
