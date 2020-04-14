import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import ActionSheet from 'react-native-actionsheet';
import Toast from 'react-native-root-toast';
import { Modal } from '@';
import { ListItem } from '@/user/user_info';
import { IContainer } from './container';

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
const sourceData = [
  {
    text: '源服务器一',
    value: 0,
  },
  {
    text: '源服务器二',
    value: 1,
  },
  {
    text: '源服务器三',
    value: 2,
  },
  {
    text: '源服务器四',
    value: 3,
  },
];

const orientationTextMap = orientationData.reduce((map, item) => ({ ...map, [item.value]: item.text }), {});
const modeTextMap = modeData.reduce((map, item) => ({ ...map, [item.value]: item.text }), {});
const sourceTextMap = sourceData.reduce((map, item) => ({ ...map, [item.value]: item.text }), {});

const orientationOptions = orientationData.map(item => item.text);
orientationOptions.push('取消');
const modeOptions = modeData.map(item => item.text);
modeOptions.push('取消');
const sourceOptions = sourceData.map(item => item.text);
sourceOptions.push('取消');
class MainComponent extends PureComponent<IContainer> {
  orientationActionSheet = React.createRef<ActionSheet>();
  modeActionSheet = React.createRef<ActionSheet>();
  sourceActionSheet = React.createRef<ActionSheet>();

  state = {
    isVisible: false,
    cacheSize: 0,
  };

  componentDidMount() {
    this.getCacheSize();
  }

  getCacheSize = () => {
    // CacheManager.getCacheSize().then((cacheSize) => {
    //   this.setState({ cacheSize });
    // });
    this.setState({ cacheSize: 0 });
  }

  clearCache = () => {
    // CacheManager.clearCache().then(() => {
    //   this.getCacheSize();
    //   this.setState({ cacheSize: 0 });
    // });
    Toast.show('清除缓存成功', {
      position: -70,
    });
  }

  logout = () => {
    this.setState({ isVisible: true });
  }

  confirm = () => {
    const { logout } = this.props;
    this.setState({ isVisible: false });
    logout();
    Toast.show('注销成功', {
      position: -70,
    });
    // navigation.navigate('Login');
  }

  cancel = () => {
    this.setState({ isVisible: false });
  }

  switchOrientation = (index: number) => {
    if (index >= 2) return;
    const { switchOrientation, switchReadingMode } = this.props;
    const { value } = orientationData[index] || {};
    if (!value) return;
    if (value === 'horizon') {
      switchReadingMode('scroll');
    }
    switchOrientation(value);
  }

  switchMode = (index: number) => {
    if (index >= 2) return;
    const { switchReadingMode } = this.props;
    const { value } = modeData[index] || {};
    if (!value) return;
    switchReadingMode(value);
  }
  switchSource = (index: number) => {
    if (index >= 4) return;
    const { switchSource } = this.props;
    const { value = 3 } = sourceData[index] || {};
    switchSource(value);
  }

  render() {
    const { isVisible, cacheSize } = this.state;
    const { isLogin, orientation, mode, source } = this.props;
    return (
      <ContainStyled>
        <ListItem
          title="屏幕方向"
          rightTitle={orientationTextMap[orientation]}
          onPress={this.orientationActionSheet.current && (() => this.orientationActionSheet.current.show())}
        />
        {
          orientation === 'vertical' && (
            <ListItem
              title="阅读模式"
              rightTitle={modeTextMap[mode]}
              onPress={this.modeActionSheet.current && (() => this.modeActionSheet.current.show())}
            />
          )
        }
        <ListItem
          title="切换图片源"
          rightTitle={sourceTextMap[source]}
          onPress={this.sourceActionSheet.current && (() => this.sourceActionSheet.current.show())}
        />
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
          ref={this.orientationActionSheet}
          title="屏幕方向"
          options={orientationOptions}
          cancelButtonIndex={2}
          onPress={this.switchOrientation}
        />
        <ActionSheet
          ref={this.modeActionSheet}
          title="阅读模式"
          options={modeOptions}
          cancelButtonIndex={2}
          onPress={this.switchMode}
        />
        <ActionSheet
          ref={this.sourceActionSheet}
          title="图片源"
          options={sourceOptions}
          cancelButtonIndex={4}
          onPress={this.switchSource}
        />
      </ContainStyled>
    );
  }
}

export default MainComponent;
