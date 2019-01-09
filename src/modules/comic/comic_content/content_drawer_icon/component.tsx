import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ContainStyled = styled.view`
  height: 60px;
  width: 70px;
  justify-content: space-around;
  align-items: center;
`;

const TextStyled = styled.text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

const ICON_SIZE = 28;
const ICON_COLOR = '#fff';

const SettingIcon = () => <Feather name="settings" size={ICON_SIZE} color={ICON_COLOR} />;
const ListIcon = () => <FontAwesome name="list-ul" size={ICON_SIZE} color={ICON_COLOR} />;
const SliderIcon = () => <FontAwesome name="sliders" size={ICON_SIZE} color={ICON_COLOR} />;

const icon_map = {
  setting: SettingIcon,
  list: ListIcon,
  progress: SliderIcon,
};
export interface IContentDrawerIconProps {
  icon_type: keyof typeof icon_map;
  title: string;
  onPress(): any;
}
function ContentDrawerIconComponent({ icon_type, title, onPress }: IContentDrawerIconProps) {
  const Icon = icon_map[icon_type];
  return (
    <TouchableOpacity onPress={onPress}>
      <ContainStyled>
        <Icon />
        <TextStyled>
          {title}
        </TextStyled>
      </ContainStyled>
    </TouchableOpacity>
  );
}
ContentDrawerIconComponent.propTypes = {
  icon_type: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};
ContentDrawerIconComponent.defaultProps = {
  icon_type: 'setting',
  title: '设置',
  onPress: (f: any) => f,
};
export default ContentDrawerIconComponent;
