import React from 'react';

import styled from 'styled-components/native';

const TextStyled = styled.Text`
  color: #fff;
  font-size: 12px;
`;
function ReadingProgressComponent({ index, total }: { index?: number; total?: number }) {
  return (
    <TextStyled>
      {index}
/
      {total}
    </TextStyled>
  );
}

ReadingProgressComponent.defaultProps = {
  index: 1,
  total: 1,
};
export default ReadingProgressComponent;
