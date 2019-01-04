import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { LoginInput, LoginButton } from '@/user/login';

const InputContainStyled = styled.view`
  margin-bottom: 30px;
`;

class LoginLocalComponent extends PureComponent {
  static propTypes = {
    loginLocal: PropTypes.func.isRequired,
    getFavorites: PropTypes.func.isRequired,
    getHistory: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onChangeUsername = this.changFunc('username');
    this.onChangePassword = this.changFunc('password');
  }

  state = {
    username: '',
    password: '',
    loading: false,
  };

  onSubmit = () => {
    const {
      loginLocal, getFavorites, getHistory,
    } = this.props;
    const { username, password } = this.state;
    if (username.length < 8 || password.length < 8) return;
    this.setState({ loading: true });
    loginLocal({ username, password }).then((res) => {
      this.setState({ loading: false });
      if (res.error) return;
      getFavorites();
      getHistory();
      Toast.show('登陆成功', {
        position: -70,
      });
      Actions.pop();
    }).catch(() => {
      this.setState({ loading: false });
    });
  };

  changFunc = key => value => this.setState({ [key]: value });

  render() {
    const { username, password, loading } = this.state;
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
        </InputContainStyled>
        <LoginButton
          text="登  录"
          loading={loading}
          onPress={this.onSubmit}
        />
        <LoginButton
          outline
          text="立即注册"
          onPress={Actions.register}
        />
      </View>
    );
  }
}

export default LoginLocalComponent;
