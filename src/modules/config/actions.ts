import { createActions } from 'redux-actions';

export const {
  switchReadingMode,
  switchCuttingMode,
  switchOrientation,
  switchBrightness,
  switchSource,
} = createActions({
  SWITCH_READING_MODE: (value) => value,
  SWITCH_CUTTING_MODE: (value) => value,
  SWITCH_ORIENTATION: (value) => value,
  SWITCH_BRIGHTNESS: (value) => value,
  SWITCH_SOURCE: (value) => value,
});
