import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import codePush from 'react-native-code-push';
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

let toast = null;
function showToast(message) {
  Toast.hide(toast);
  toast = Toast.show(message, {
    position: -70,
  });
}

class UserOperateListComponent extends PureComponent {
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
  };

  check = () => {
    // codePush.checkForUpdate()
    //   .then((update) => {
    //     if (!update) {
    //       showToast('应用已是最新版本');
    //       return;
    //     }
    codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '\n\n更新内容：\n',
        title: '多多漫画有新内容啦',
        mandatoryUpdateMessage: '本次为强制更新',
        optionalUpdateMessage: '',
        mandatoryContinueButtonLabel: '更新',
        optionalIgnoreButtonLabel: '取消',
        optionalInstallButtonLabel: '更新',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    },
    (status) => {
      // eslint-disable-next-line default-case
      switch (status) {
        case codePush.SyncStatus.UP_TO_DATE:
          showToast('应用已是最新版本');
          break;
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          showToast('正在检查更新');
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          showToast('正在下载更新');
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          showToast('正在安装更新');
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          showToast('更新已完成');
          break;
      }
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
