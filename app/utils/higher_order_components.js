/* eslint-disable */
import React, { PureComponent } from 'react';
import {
  Platform,
  Linking,
} from 'react-native';
import {
  isFirstTime,
  markSuccess,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
} from 'react-native-update';
import hoistNonReactStatics from 'hoist-non-react-statics';
import _updateConfig from '../../update.json';
import { Modal } from '@';

// 提供loading状态的高阶组件
export const wrapWithLoading = function (WrappedComponent) {
  class NewComponent extends PureComponent {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
      this.hideLoading = this.hideLoading.bind(this);
    }

    hideLoading(bool = false) {
      this.setState({ loading: bool });
    }

    render() {
      const { loading } = this.state;
      return <WrappedComponent {...this.props} loading={loading} hideLoading={this.hideLoading} />;
    }
  }
  hoistNonReactStatics(NewComponent, WrappedComponent);
  return NewComponent;
};

const { appKey } = _updateConfig[Platform.OS];

// 提供热更新功能的高阶组件
export const wrapWithUpdate = function (WrappedComponent) {
  class NewComponent extends PureComponent {

    componentWillMount() {
      if (isFirstTime) markSuccess(); // 确认更新成功, 有报错则回滚版本
    }

    state = {
      tips: '您的应用版本已更新，请前往应用商店下载新的版本',
      isVisible: false,
      type: 'download', // 当前状态类型
      info: null, // 更新信息
      hash: null, // 安装包hash值
    };

    checkUpdate = () => {
      if (__DEV__) return Promise.resolve(false);
      checkUpdate(appKey).then((info) => {
        if (info.expired) {
          this.setState({
            isVisible: true,
            tips: '您的应用版本已更新，请前往应用商店下载新的版本',
            type: 'download',
            info,
          });
          return true;
        } if (info.upToDate) {
          return false;
        }
        this.setState({
          isVisible: true,
          tips: `检查到新的版本${info.name}，是否下载更新？\n${info.description}`,
          type: 'doUpdate',
          info,
        });
        return true;
      })
    };

    doUpdate = (info) => {
      downloadUpdate(info).then((hash) => {
        this.setState({
          isVisible: true,
          tips: '下载更新完成，是否重启应用？',
          type: 'switchVersion',
          hash,
        });
      });
    };

    download = (info) => {
      info.downloadUrl && Linking.openURL(info.downloadUrl);
    };

    confirm = () => {
      const { type, info, hash } = this.state;
      this.setState({ isVisible: false });
      if (type === 'doUpdate') this.doUpdate(info);
      if (type === 'download') this.download(info);
      if (type === 'switchVersion') switchVersion(hash);
    };

    cancel = () => {
      const { type, hash } = this.state;
      this.setState({ isVisible: false });
      if (type === 'switchVersion') switchVersionLater(hash);
    };

    render() {
      const { tips, isVisible } = this.state;
      return ([
        <WrappedComponent key="wrapped" {...this.props} checkUpdate={this.checkUpdate} />,
        <Modal
          key="modal"
          confirm={this.confirm}
          cancel={this.cancel}
          isVisible={isVisible}
        >
          {tips}
        </Modal>,
      ]);
    }
  }

  hoistNonReactStatics(NewComponent, WrappedComponent);
  return NewComponent;
};
