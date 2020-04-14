import React, { PureComponent } from 'react';

import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import { brand_primary } from 'theme';
import { Avatar, LoginNowButton } from '@/user/user_info';
import { IContainer } from './container';

const ContainStyled = styled.View`
  height: 260px;
  background-color: #fff;
`;
const PrimaryBackground = styled.View`
  height: 100px;
  background-color: ${brand_primary};
`;
const TransparentContainStyled = styled.View`
  height: 200px;
  background-color: transparent;
`;
const AvatarContainStyled = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
`;
const AvatarStyled = styled.View`
  border: 5px solid #fff;
  border-radius: 100px;
  background-color: #fff;
  transform: translateY(-35px);
`;
const ContentContainStyled = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const NameContainStyled = styled.View`
  transform: translateY(-35px);
`;
const NameStyled = styled.Text`
  color: #000;
  font-size: 16px;
`;

class UserTopComponent extends PureComponent<IContainer> {

  componentDidMount() {
    const { getUser } = this.props;
    getUser();
  }

  render() {
    const { info } = this.props;
    return (
      <ContainStyled>
        <TransparentContainStyled>
          <PrimaryBackground />
          <AvatarContainStyled>
            <AvatarStyled>
              <Avatar
                src={info.get('avatar')}
                onPress={info.size ? Actions.userEdit : null}
              />
            </AvatarStyled>
          </AvatarContainStyled>
        </TransparentContainStyled>
        <ContentContainStyled>
          <NameContainStyled>
            {info.size ? (
              <NameStyled>
                {info.get('name') || info.get('username')}
              </NameStyled>
            )
              : <LoginNowButton />}
          </NameContainStyled>
        </ContentContainStyled>
      </ContainStyled>
    );
  }
}

export default UserTopComponent;
