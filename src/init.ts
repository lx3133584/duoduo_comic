import { StatusBar } from 'react-native';
import Orientation from 'react-native-orientation';
import './api/config';

// 设置状态栏
StatusBar.setTranslucent(true);
StatusBar.setBarStyle('light-content', true);

// 锁定竖屏
Orientation.lockToPortrait();

// 隐藏警告
if (__DEV__) console.disableYellowBox = true;
