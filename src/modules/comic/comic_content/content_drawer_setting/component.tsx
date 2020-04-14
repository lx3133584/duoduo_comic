import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import ContentDrawerBrightness from '../content_drawer_brightness';
import ContentDrawerOrientation from '../content_drawer_orientation';
import ContentDrawerReadingMode from '../content_drawer_reading_mode';
import { IContainer } from './container';

const ContainStyled = styled.View`
  justify-content: space-around;
  align-items: center;
`;
interface IProps extends IContainer {
  toggleDrawer(): void;
}
class ContentDrawerSettingComponent extends PureComponent<IProps> {
  static height = 200;
  render() {
    const { toggleDrawer, orientation } = this.props;
    return (
      <ContainStyled style={{ height: ContentDrawerSettingComponent.height }}>
        <ContentDrawerBrightness />
        <ContentDrawerOrientation toggleDrawer={toggleDrawer} />
        {orientation === 'horizon' || <ContentDrawerReadingMode />}
      </ContainStyled>
    );
  }
}

export default ContentDrawerSettingComponent;
