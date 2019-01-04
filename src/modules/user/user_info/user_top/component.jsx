import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
import { brand_primary } from 'theme';
import { Avatar, LoginNowButton } from '@/user/user_info';

const ContainStyled = styled.view`
  height: 260px;
  background-color: #fff;
`;
const PrimaryBackground = styled.view`
  height: 100px;
  background-color: ${brand_primary};
`;
const TransparentContainStyled = styled.view`
  height: 200px;
  background-color: transparent;
`;
const AvatarContainStyled = styled.view`
  flex: 1;
  justify-content: center;
  flex-direction: row;
`;
const AvatarStyled = styled.view`
  border: 5px solid #fff;
  border-radius: 100px;
  background-color: #fff;
  transform: translateY(-35px);
`;
const ContentContainStyled = styled.view`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const NameContainStyled = styled.view`
  transform: translateY(-35px);
`;
const NameStyled = styled.text`
  color: #000;
  font-size: 16px;
`;

class UserTopComponent extends PureComponent {
  static propTypes = {
    info: ImmutablePropTypes.map.isRequired,
    getUser: PropTypes.func.isRequired,
  };

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
