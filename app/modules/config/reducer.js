import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import {
  switchReadingMode,
  switchCuttingMode,
  switchOrientation,
  switchBrightness,
} from './actions';

const initialState = Immutable.Map({
  mode: 'scroll', // 滚动模式scroll | 翻页模式page_turning
  whether_to_cut: false, // 是否分割图片
  brightness: 0.5, // 亮度
  orientation: 'vertical', // 横屏horizon | 竖屏vertical
});

export default handleActions({
  [switchReadingMode]: (state, action) => state.set('mode', action.payload),
  [switchCuttingMode]: (state, action) => state.set('whether_to_cut', action.payload),
  [switchBrightness]: (state, action) => state.set('brightness', action.payload),
  [switchOrientation]: (state, action) => state.set('orientation', action.payload),
}, initialState);
