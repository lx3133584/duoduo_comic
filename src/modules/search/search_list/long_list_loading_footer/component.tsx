import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import { Dimensions } from 'react-native';
import { brand_primary } from 'theme';

const { width } = Dimensions.get('window');

const height = 50;
const LoadingContainStyled = styled.View`
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;

function LongListLoadingFooterComponent({ color, background }) {
  return (
    <LoadingContainStyled style={{ background }}>
      <Spinner
        type="ChasingDots"
        color={color}
        size={36}
      />
    </LoadingContainStyled>
  );
}

LongListLoadingFooterComponent.propTypes = {
  color: PropTypes.string,
  background: PropTypes.string,
};
LongListLoadingFooterComponent.defaultProps = {
  color: brand_primary,
  background: '#fff',
};

export default LongListLoadingFooterComponent;
