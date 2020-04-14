import React from 'react';
import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

const ContainStyled = styled.View`
  background-color: #999;
  justify-content: center;
  align-items: center;
`;
const ContentStyled = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
const TitleStyled = styled.Text`
  font-size: 32px;
  color: #eee;
`;
const SubTitleStyled = styled.Text`
  font-size: 18px;
  color: #eee;
`;
interface IProps extends ViewProps {
  title?: string;
  subTitle?: string;
  children?: any;
}
function ImagePlaceholder({
  title, subTitle, children, ...rest
}: IProps) {
  return (
    <ContainStyled {...rest}>
      <TitleStyled>
        {title}
      </TitleStyled>
      <SubTitleStyled>
        {subTitle}
      </SubTitleStyled>
      <ContentStyled>
        {children}
      </ContentStyled>
    </ContainStyled>
  );
}
ImagePlaceholder.defaultProps = {
  title: '',
  subTitle: '',
  children: null,
};
export default ImagePlaceholder;
