import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { brand_primary } from 'theme';
import { Header } from 'router';

const ContainStyled = styled.View`
  padding-top: 20px;
  background: ${brand_primary};
`;
function DetailHeaderComponent({ title }) {
  return (
    <ContainStyled>
      <Header
        customTitle={title}
        isNoBack
      />
    </ContainStyled>
  );
}
DetailHeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
};
export default DetailHeaderComponent;
