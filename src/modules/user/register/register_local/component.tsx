import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import { View } from 'react-native';
import Toast from 'react-native-root-toast';
import { Actions } from 'react-native-router-flux';
import { LoginInput, LoginButton } from '@/user';

const InputContainStyled = styled.View`
  margin-bottom: 30px;
`;

class RegisterLocalComponent extends PureComponent {
  constructor() {
    super();
    this.onChangeUsername = this.changFunc('username');
    this.onChangePassword = this.changFunc('password');
    this.onChangeRePassword = this.changFunc('rePassword');
  }

  state = {
    username: '',
    password: '',
    rePassword: '',
    loading: false,
  };

  onSubmit = () => {
    const {
      registerLocal, getFavorites, getHistory,
    } = this.props;
    const { username, password, rePassword } = this.state;
    if (
      username.length < 8
      || password.length < 8
      || rePassword.length < 8
      || password !== rePassword
    ) return;
    this.setState({ loading: true });
    registerLocal({ username, password, rePassword }).then((res) => {
      this.setState({ loading: false });
      if (res.error) return;
      getFavorites();
      getHistory();
      Toast.show('注册成功', {
        position: -70,
      });
      Actions.pop();
      Actions.pop();
    }).catch(() => {
      this.setState({ loading: false });
    });
  };

  changFunc = key => value => this.setState({ [key]: value });

  render() {
    const {
      username, password, rePassword, loading,
    } = this.state;
    return (
      <View>
        <InputContainStyled>
          <LoginInput
            placeholder="用户名"
            iconName="user"
            onChange={this.onChangeUsername}
            onSubmit={this.onSubmit}
            errorMessage={username && username.length < 8 && '用户名必须大于8位'}
          />
          <LoginInput
            placeholder="密码"
            onChange={this.onChangePassword}
            iconName="lock"
            onSubmit={this.onSubmit}
            password
            errorMessage={password && password.length < 8 && '密码必须大于8位'}
          />
          <LoginInput
            placeholder="确认密码"
            onChange={this.onChangeRePassword}
            iconName="lock"
            onSubmit={this.onSubmit}
            password
            errorMessage={rePassword && rePassword !== password && '两次输入密码不一致'}
          />
        </InputContainStyled>
        <LoginButton
          text="注  册"
          loading={loading}
          onPress={this.onSubmit}
        />
        <LoginButton
          outline
          text="返回登录"
          onPress={() => Actions.pop()}
        />
      </View>
    );
  }
}

export default RegisterLocalComponent;
