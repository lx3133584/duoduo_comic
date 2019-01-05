import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import {
  switchReadingMode,
  switchCuttingMode,
  switchOrientation,
  switchBrightness,
} from './actions';

const initialState = Immutable.Record({
  mode: 'scroll', // 滚动模式scroll | 翻页模式page_turning
  whether_to_cut: false, // 是否分割图片
  brightness: 0.5, // 亮度
  orientation: 'vertical', // 横屏horizon | 竖屏vertical
})();
export type StateType = typeof initialState;
export default handleActions({
  [switchReadingMode as any]: (state, action: any) => state.set('mode', action.payload),
  [switchCuttingMode as any]: (state, action: any) => state.set('whether_to_cut', action.payload),
  [switchBrightness as any]: (state, action: any) => state.set('brightness', action.payload),
  [switchOrientation as any]: (state, action: any) => state.set('orientation', action.payload),
}, initialState);