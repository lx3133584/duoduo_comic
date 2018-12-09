import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
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
    onPress: () => Actions._favorites({ index: 0 }),
  },
  {
    name: '浏览记录',
    onPress: () => Actions._favorites({ index: 1 }),
  },
  {
    name: '我的下载',
    onPress: () => Actions._favorites({ index: 2 }),
  },
];

class UserOperateListComponent extends PureComponent {
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
  };

  check = () => {
    Toast.show('应用已是最新版本', {
      position: -70,
    });
  };

  render() {
    const { isLogin } = this.props;
    return (
      <ContainStyled>
        <ItemContainStyled>
          {isLogin && (
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
          <ListItem
            chevron
            key="setting"
            title="设置中心"
            onPress={Actions.settingCenter}
          />
        </ItemContainStyled>
      </ContainStyled>
    );
  }
}
export default UserOperateListComponent;
