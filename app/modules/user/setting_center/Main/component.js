import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Toast from 'react-native-root-toast';
import * as CacheManager from 'react-native-http-cache2';
import { Modal } from '@';
import { ListItem } from '@/user/user_info';

const ContainStyled = styled.View`
  background: #fff;
`;

class MainComponent extends PureComponent {
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
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

  render() {
    const { isVisible, cacheSize } = this.state;
    const { isLogin } = this.props;
    return (
      <ContainStyled>
        <ListItem
          key="cache"
          title="清除缓存"
          rightTitle={`${(cacheSize / 1048576).toFixed(2)}MB`}
          onPress={this.clearCache}
        />
        {isLogin && (
          <ListItem
            chevron
            key="logout"
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
      </ContainStyled>
    );
  }
}

export default MainComponent;
