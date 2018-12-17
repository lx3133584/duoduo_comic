import React from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';
import store, { persistor } from './store';
import RootRoute from './router';
import './init';

@codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 30,
})
class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    if (__DEV__) persistor.purge(); // 开发模式下清除persist
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootRoute />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
