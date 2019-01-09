import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { ContentDrawerIcon, IContentDrawerIconProps } from '..';

const ContainStyled = styled.view`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

class ContentDrawerMenuComponent extends PureComponent {
  static height = 80;

  static propTypes = {
    switchBottomType: PropTypes.func.isRequired,
  };

  menu_list: IContentDrawerIconProps[] = [];

  constructor(props) {
    super(props);
    const { switchBottomType } = props;
    this.menu_list = [
      {
        icon_type: 'list',
        title: '目录',
        onPress: Actions.drawerOpen,
      },
      {
        icon_type: 'progress',
        title: '进度',
        onPress: () => switchBottomType('progress'),
      },
      {
        icon_type: 'setting',
        title: '设置',
        onPress: () => switchBottomType('setting'),
      },
    ];
  }

  render() {
    return (
      <ContainStyled style={{ height: ContentDrawerMenuComponent.height }}>
        {
          this.menu_list.map(({
            icon_type,
            title,
            onPress,
          }) => <ContentDrawerIcon icon_type={icon_type} title={title} key={icon_type} onPress={onPress} />)
        }
      </ContainStyled>
    );
  }
}

export default ContentDrawerMenuComponent;
