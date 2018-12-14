import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header } from '@/router';
import { red } from 'theme';
import { ListItem } from '@/user';

const ContainStyled = styled.View`
  background: #fff;
`;
const itemContainStyle = {
  height: 100,
};
const inputStyle = {
  color: '#666',
};
const SaveTextStyled = styled.Text`
  color: #fff;
  font-size: 16px;
  padding: 0 10px;
`;
const errorStyle = { color: red, textAlign: 'right' };

class PasswordEditComponent extends PureComponent {
  static propTypes = {
    changePassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onChangeOldPassword = this.changFunc('oldPassword');
    this.onChangePassword = this.changFunc('password');
    this.onChangeRePassword = this.changFunc('rePassword');
  }

  state = {
    oldPassword: '',
    password: '',
    rePassword: '',
  };

  showToast = (message) => {
    Toast.show(message, {
      position: -70,
    });
  };

  savePassword = async () => {
    const { changePassword } = this.props;
    const { oldPassword, password, rePassword } = this.state;
    if (
      oldPassword.length < 8
      || password.length < 8
      || rePassword.length < 8
      || password !== rePassword
    ) return;
    await changePassword(this.state);
    this.showToast('修改成功');
    Actions.pop();
  };

  changFunc = key => value => this.setState({ [key]: value });

  renderSaveButton = () => (
    <TouchableOpacity onPress={this.savePassword}>
      <SaveTextStyled>保存</SaveTextStyled>
    </TouchableOpacity>
  );

  render() {
    const { oldPassword, password, rePassword } = this.state;
    const errorMessage = {
      oldPassword: oldPassword && oldPassword.length < 8 && '密码必须大于8位',
      password: password && password.length < 8 && '密码必须大于8位',
      rePassword: rePassword && rePassword !== password && '两次输入密码不一致',
    };
    return (
      <ContainStyled>
        <Header
          customTitle="修改密码"
          rightComponent={this.renderSaveButton()}
          {...this.props}
        />
        <ListItem
          key="oldPassword"
          title="原密码"
          containerStyle={itemContainStyle}
          input={{
            value: oldPassword,
            inputStyle,
            onChangeText: this.onChangeOldPassword,
            maxLength: 32,
            secureTextEntry: true,
            errorMessage: errorMessage.oldPassword || null,
            errorStyle,
          }}
        />
        <ListItem
          key="password"
          title="新密码"
          containerStyle={itemContainStyle}
          input={{
            value: password,
            inputStyle,
            onChangeText: this.onChangePassword,
            maxLength: 32,
            secureTextEntry: true,
            errorMessage: errorMessage.password || null,
            errorStyle,
          }}
        />
        <ListItem
          key="rePassword"
          title="确认新密码"
          containerStyle={itemContainStyle}
          input={{
            value: rePassword,
            inputStyle,
            onChangeText: this.onChangeRePassword,
            maxLength: 32,
            secureTextEntry: true,
            errorMessage: errorMessage.rePassword || null,
            errorStyle,
          }}
        />
      </ContainStyled>
    );
  }
}

export default PasswordEditComponent;
