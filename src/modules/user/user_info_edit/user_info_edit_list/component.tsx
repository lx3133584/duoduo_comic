import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import Toast from 'react-native-root-toast';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
import { TouchableOpacity, Platform } from 'react-native';
import { Header } from 'router';
import { brand_primary } from 'theme';
import { Avatar, ListItem } from '@/user';
import { IContainer } from './container';

const ContainStyled = styled.View`
  background: #fff;
`;
const itemContainStyle = {
  height: 75,
};
const inputStyle = {
  color: '#666',
};
const TextStyled = styled.Text`
  color: ${brand_primary};
  font-size: 18px;
`;
const CancelTextStyled = styled.Text`
  color: #666;
  font-size: 18px;
`;
const SaveTextStyled = styled.Text`
  padding: 0 10px;
  color: #fff;
  font-size: 16px;
`;

const options = { // ImagePicker的设置选项
  cameraType: 'front',
  mediaType: 'photo',
  allowsEditing: true,
  noData: true,
  permissionDenied: {
    title: '获取权限',
    text: '是否同意本app使用你的照相和文件功能？',
    reTryTitle: '重试',
    okTitle: '我同意',
  },
};

const ActionSheetOptionsAndroid = [ // ActionSheet选项
  <TextStyled>
相机
  </TextStyled>,
  <TextStyled>
图库
  </TextStyled>,
  <CancelTextStyled>
取消
  </CancelTextStyled>,
];
const ActionSheetOptionsIOS = [
  '相机',
  '图库',
  '取消',
];
const ActionSheetOptions = Platform.OS === 'ios' ? ActionSheetOptionsIOS : ActionSheetOptionsAndroid;
const fn = ['launchCamera', 'launchImageLibrary']; // ActionSheet-index对应的ImagePicker方法

interface IState {
  name: string;
}

class UserInfoEditListComponent extends PureComponent<IContainer, IState> {
  ActionSheet: any;
  onChangeName: (value: any) => void;

  constructor(props) {
    super(props);
    const { info } = props;
    const name = info.get('name');
    this.state = {
      name: name || '',
    };
    this.onChangeName = this.changFunc('name');
  }

  showActionSheet = () => {
    this.ActionSheet && this.ActionSheet.show();
  }

  showToast = (message) => {
    Toast.show(message, {
      position: -70,
    });
  }

  beforeUpload = (index) => {
    if (!/[0-1]/.test(index)) return;
    const key = fn[index];
    ImagePicker[key](options, (res) => {
      if (res.didCancel) {
        this.showToast('取消选择');
        return;
      }
      if (res.error) {
        this.showToast(res.error || '选择图片错误');
        return;
      }
      this.uploadAvatar(res.path || res.uri, res.fileName);
    });
  }

  uploadAvatar = async (path, filename) => {
    if (!path) return;
    const { uploadUserAvatar, csrf } = this.props;
    try {
      await uploadUserAvatar({ path, csrf, filename });
    } catch (e) {
      this.showToast('上传失败');
      return;
    }
    this.showToast('上传成功');
  }

  saveUserInfo = async () => {
    const { editUserInfo } = this.props;
    await editUserInfo(this.state);
    this.showToast('修改成功');
    Actions.pop();
  }

  changFunc = (key: 'name') => value => this.setState({ [key]: value });

  renderAvatar = () => {
    const { info } = this.props;
    const avatar = info.get('avatar');
    return <Avatar src={avatar} size="medium" />;
  }

  renderSaveButton = () => (
    <TouchableOpacity onPress={this.saveUserInfo}>
      <SaveTextStyled>
保存
      </SaveTextStyled>
    </TouchableOpacity>
  )

  render() {
    const { info } = this.props;
    const { name } = this.state;
    const username = info.get('username');
    return (
      <ContainStyled>
        <Header
          customTitle="个人资料"
          rightComponent={this.renderSaveButton()}
          {...this.props}
        />
        <ListItem
          key="username"
          title="用户名"
          containerStyle={itemContainStyle}
          rightTitle={username}
        />
        <ListItem
          key="avatar"
          title="头像"
          containerStyle={itemContainStyle}
          rightAvatar={this.renderAvatar()}
          onPress={this.showActionSheet}
        />
        <ListItem
          key="name"
          title="昵称"
          containerStyle={itemContainStyle}
          input={{
            value: name,
            inputStyle,
            onChangeText: this.onChangeName,
          }}
        />
        <ListItem
          key="password"
          title="修改密码"
          chevron
          containerStyle={itemContainStyle}
          onPress={Actions.password}
        />
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title="选择上传方式"
          options={ActionSheetOptions}
          cancelButtonIndex={2}
          onPress={this.beforeUpload}
        />
      </ContainStyled>
    );
  }
}

export default UserInfoEditListComponent;
