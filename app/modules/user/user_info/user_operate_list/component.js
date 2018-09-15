import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { Modal } from '@';
import { ListItem } from '@/user/user_info';

const ContainStyled = styled.View`
  padding-bottom: 20px;
`;

const ItemContainStyled = styled.View`
  margin-top: 10px;
  background: #fff;
`;

const list = [
  {
    name: '我的收藏',
    onPress: () => Actions.favorites({ index: 0 }),
  },
  {
    name: '浏览记录',
    onPress: () => Actions.favorites({ index: 1 }),
  },
  // {
  //   name: '我的下载',
  //   onPress: () => Actions.favorites({ index: 2 }),
  // },
];

class UserOperateListComponent extends PureComponent {
  static propTypes = {
    info: ImmutablePropTypes.map.isRequired,
    logout: PropTypes.func.isRequired,
    checkUpdate: PropTypes.func.isRequired,
  };

  state = {
    isVisible: false,
  };

  logout = () => {
    this.setState({ isVisible: true });
  };

  check = () => {
    const { checkUpdate } = this.props;
    checkUpdate().then((res) => {
      if (!res) {
        Toast.show('应用已是最新版本', {
          position: -70,
        });
      }
    });
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
    const { isVisible } = this.state;
    const { info } = this.props;
    return (
      <ContainStyled>
        <ItemContainStyled>
          {!!info.size && (
          <ListItem
            chevron
            key="user_info_edit"
            title="个人中心"
            onPress={Actions.userEdit}
          />
          )}
          {
            list.map(({ name, onPress }) => (
              <ListItem
                chevron
                key={name}
                title={name}
                onPress={onPress}
              />
            ))
          }
        </ItemContainStyled>
        <ItemContainStyled>
          <ListItem
            chevron
            key="check"
            title="检查更新"
            onPress={this.check}
          />
          {!!info.size && (
          <ListItem
            chevron
            key="logout"
            title="退出登录"
            onPress={this.logout}
          />
          )}
        </ItemContainStyled>
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
export default UserOperateListComponent;
