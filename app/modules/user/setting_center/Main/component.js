import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import Toast from 'react-native-root-toast';
import * as CacheManager from 'react-native-http-cache2';
import { Modal } from '@';
import { ListItem } from '@/user/user_info';

const ContainStyled = styled.View`
  background: #fff;
`;

const orientationData = [
  {
    text: '竖屏',
    value: 'vertical',
  },
  {
    text: '横屏',
    value: 'horizon',
  },
];
const modeData = [
  {
    text: '滚动模式',
    value: 'scroll',
  },
  {
    text: '翻页模式',
    value: 'page_turning',
  },
];

const orientationTextMap = orientationData.reduce((map, item) => ({ ...map, [item.value]: item.text }), {});
const modeTextMap = modeData.reduce((map, item) => ({ ...map, [item.value]: item.text }), {});

const orientationOptions = orientationData.map(item => item.text);
orientationOptions.push('取消');
const modeOptions = modeData.map(item => item.text);
modeOptions.push('取消');

class MainComponent extends PureComponent {
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    orientation: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    switchOrientation: PropTypes.func.isRequired,
    switchReadingMode: PropTypes.func.isRequired,
  };

  state = {
    isVisible: false,
    cacheSize: 0,
  };

  componentDidMount() {
    this.getCacheSize();
  }

  getCacheSize = () => {
    CacheManager.getCacheSize().then((cacheSize) => {
      this.setState({ cacheSize });
    });
  }

  clearCache = () => {
    CacheManager.clearCache().then(() => {
      // this.getCacheSize();
      this.setState({ cacheSize: 0 });
      Toast.show('清除缓存成功', {
        position: -70,
      });
    });
  }

  logout = () => {
    this.setState({ isVisible: true });
  };

  confirm = () => {
    const { logout } = this.props;
    this.setState({ isVisible: false });
    logout();
    Toast.show('注销成功', {
      position: -70,
    });
    // navigation.navigate('Login');
  };

  cancel = () => {
    this.setState({ isVisible: false });
  };

  switchOrientation = (index) => {
    if (index >= 2) return;
    const { switchOrientation, switchReadingMode } = this.props;
    const { value } = orientationData[index] || {};
    if (!value) return;
    if (value === 'horizon') {
      switchReadingMode('scroll');
    }
    switchOrientation(value);
  }

  switchMode = (index) => {
    if (index >= 2) return;
    const { switchReadingMode } = this.props;
    const { value } = modeData[index] || {};
    if (!value) return;
    switchReadingMode(value);
  }

  render() {
    const { isVisible, cacheSize } = this.state;
    const { isLogin, orientation, mode } = this.props;
    return (
      <ContainStyled>
        <ListItem
          title="屏幕方向"
          rightTitle={orientationTextMap[orientation]}
          onPress={this.orientationActionSheet && (() => this.orientationActionSheet.show())}
        />
        {
          orientation === 'vertical' && (
            <ListItem
              title="阅读模式"
              rightTitle={modeTextMap[mode]}
              onPress={this.modeActionSheet && (() => this.modeActionSheet.show())}
            />
          )
        }
        <ListItem
          title="清除缓存"
          rightTitle={`${(cacheSize / 1048576).toFixed(2)}MB`}
          onPress={this.clearCache}
        />
        {isLogin && (
          <ListItem
            chevron
            title="退出登录"
            onPress={this.logout}
          />
        )}
        <Modal
          confirm={this.confirm}
          cancel={this.cancel}
          isVisible={isVisible}
        >

          是否确认退出登录？
        </Modal>
        <ActionSheet
          ref={o => this.orientationActionSheet = o}
          title="选择上传方式"
          options={orientationOptions}
          cancelButtonIndex={2}
          onPress={this.switchOrientation}
        />
        <ActionSheet
          ref={o => this.modeActionSheet = o}
          title="选择上传方式"
          options={modeOptions}
          cancelButtonIndex={2}
          onPress={this.switchMode}
        />
      </ContainStyled>
    );
  }
}

export default MainComponent;
