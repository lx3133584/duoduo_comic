import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Header } from 'router';

const ContainStyled = styled.View`
  padding-top: 10px;
`;

function ContentHeaderComponent({ title }) {
  return (
    <ContainStyled>
      <Header
        customTitle={title}
        customBackgroundColor="transparent"
      />
    </ContainStyled>
  );
}
ContentHeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
};
export default ContentHeaderComponent;
