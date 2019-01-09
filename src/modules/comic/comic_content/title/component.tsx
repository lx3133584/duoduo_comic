import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextStyled = styled.Text`
  color: #fff;
  font-size: 12px;
`;
function TitleComponent({ title }) {
  return (
    <TextStyled>
      {title}
    </TextStyled>
  );
}
TitleComponent.propTypes = {
  title: PropTypes.string,
};
TitleComponent.defaultProps = {
  title: '',
};

export default TitleComponent;
