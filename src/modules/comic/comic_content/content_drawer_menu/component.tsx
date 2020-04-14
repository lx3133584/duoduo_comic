import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import { Actions } from 'react-native-router-flux';
import ContentDrawerIcon from '../content_drawer_icon';
import { IContentDrawerIconProps } from '../content_drawer_icon';

const ContainStyled = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

class ContentDrawerMenuComponent extends PureComponent {
  static height = 80;

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
