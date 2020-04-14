import React from 'react';
import styled from 'styled-components/native';

const ContainStyled = styled.View`
  margin: 10px 0;
`;
const TextStyled = styled.Text`
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

LongListTextFooterComponent.defaultProps = {
  text: '下面什么都没有了哦。',
};

export default LongListTextFooterComponent;
