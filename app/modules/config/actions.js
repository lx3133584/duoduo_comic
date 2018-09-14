import { createActions } from 'redux-actions';

export const {
  switchReadingMode,
  switchCuttingMode,
  switchOrientation,
  switchBrightness,
  changeWidth,
} = createActions({
  SWITCH_READING_MODE: value => value,
  SWITCH_CUTTING_MODE: value => value,
  SWITCH_ORIENTATION: value => value,
  SWITCH_BRIGHTNESS: value => value,
  CHANGE_WIDTH: value => value,
});
