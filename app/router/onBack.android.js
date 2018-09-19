import { Actions } from 'react-native-router-flux';
import { BackHandler } from 'react-native';
import Toast from 'react-native-root-toast';

let canExit = false;
export default () => {
  if (canExit) BackHandler.exitApp();
  if (Actions.currentScene === '_favorites') {
    Toast.show('再按一次退出应用', {
      position: -70,
      duration: 1500,
    });
    canExit = true;
    setTimeout(() => canExit = false, 2000);
    // return false;
  }
  Actions.pop();
  return true;
};
