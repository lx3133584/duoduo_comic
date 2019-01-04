import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ContentDrawerBrightness, ContentDrawerOrientation, ContentDrawerReadingMode } from '..';

const ContainStyled = styled.view`
  justify-content: space-around;
  align-items: center;
`;

class ContentDrawerSettingComponent extends PureComponent {
  static height = 200;

  static propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
    orientation: PropTypes.string.isRequired,
  };

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
