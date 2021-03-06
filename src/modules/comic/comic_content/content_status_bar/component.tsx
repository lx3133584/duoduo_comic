import React from 'react';
import styled from 'styled-components/native';
import Battery from '../battery';
import NetStatus from '../net_status';
import Time from '../time';
import Title from '../title';
import ReadingProgress from '../reading_progress';

const ContainStyled = styled.View`
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 2px 2px 10px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-right-radius: 4px;
  z-index: 1;
`;
const ItemStyled = styled.View`
  justify-content: center;
  margin-right: 8px;
`;

export default function ContentStatusBarComponent(props) {
  return (
    <ContainStyled>
      <ItemStyled>
        <NetStatus />
      </ItemStyled>
      <ItemStyled>
        <Battery />
      </ItemStyled>
      <ItemStyled>
        <Time />
      </ItemStyled>
      <ItemStyled>
        <Title {...props} />
      </ItemStyled>
      <ItemStyled>
        <ReadingProgress />
      </ItemStyled>
    </ContainStyled>
  );
}
