import React from 'react';

import styled from 'styled-components/native';

const TextStyled = styled.Text`
  color: #fff;
  font-size: 12px;
`;
function TitleComponent({ title }: { title: string }) {
  return (
    <TextStyled>
      {title}
    </TextStyled>
  );
}

TitleComponent.defaultProps = {
  title: '',
};

export default TitleComponent;
