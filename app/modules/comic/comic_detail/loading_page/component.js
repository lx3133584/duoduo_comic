import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Progress } from '@/comic/comic_detail';
import { Dimensions } from 'react-native';
import { brand_primary } from 'theme';

const { width: clientWidth, height } = Dimensions.get('window');

const ContainStyled = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  height: ${height};
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
const OffetStyled = styled.View`
  padding-bottom: 50px;
  justify-content: center;
  align-items: center;
`;
const TextStyled = styled.Text`
  font-size: 14px;
  color: ${brand_primary};
  margin-top: 10px;
`;

function ProgressComponent({ show, width }) {
  if (!show) return null;
  return (
    <ContainStyled style={{ width }}>
      <OffetStyled>
        <Progress />
        <TextStyled>
页面正在加载中...
        </TextStyled>
      </OffetStyled>
    </ContainStyled>
  );
}
ProgressComponent.propTypes = {
  show: PropTypes.bool,
  width: PropTypes.number,
};
ProgressComponent.defaultProps = {
  show: false,
  width: clientWidth,
};

export default ProgressComponent;
