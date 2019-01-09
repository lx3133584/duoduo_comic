import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextStyled = styled.text`
  color: #fff;
  font-size: 12px;
`;
function ReadingProgressComponent({ index, total }) {
  return (
    <TextStyled>
      {index}
/
      {total}
    </TextStyled>
  );
}
ReadingProgressComponent.propTypes = {
  index: PropTypes.number,
  total: PropTypes.number,
};
ReadingProgressComponent.defaultProps = {
  index: 1,
  total: 1,
};
export default ReadingProgressComponent;
