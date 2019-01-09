import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainStyled = styled.view`
  margin: 10px 0;
`;
const TextStyled = styled.text`
  text-align: center;
`;

function LongListTextFooterComponent({ text }) {
  return (
    <ContainStyled>
      <TextStyled>
        {text}
      </TextStyled>
    </ContainStyled>
  );
}
LongListTextFooterComponent.propTypes = {
  text: PropTypes.string,
};
LongListTextFooterComponent.defaultProps = {
  text: '下面什么都没有了哦。',
};

export default LongListTextFooterComponent;
