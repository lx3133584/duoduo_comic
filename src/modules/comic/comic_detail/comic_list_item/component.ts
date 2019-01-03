import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'apsl-react-native-button';
import Entypo from 'react-native-vector-icons/Entypo';
import { CheckBox } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { brand_primary } from 'theme';
import { downloadStatus } from '@/favorites';

const ICON_SIZE = 16;
const ICON_COLOR = '#fff';

const LocaltionIcon = () => (
  <Entypo
    style={{ marginRight: 8 }}
    name="location-pin"
    size={ICON_SIZE}
    color={ICON_COLOR}
  />
);
const { width } = Dimensions.get('window');

const buttonStyle = {
  backgroundColor: 'transparent',
  borderWidth: 0,
  borderRadius: 0,
  height: 50,
  width,
  marginBottom: 0,
  paddingLeft: 30,
  paddingRight: 0,
  elevation: 0,
  justifyContent: 'flex-start',
};
const textStyle = {
  fontWeight: 'normal',
  color: '#666',
  fontSize: 14,
  textAlign: 'left',
};
const checkboxStyle = {
  backgroundColor: 'transparent',
  borderWidth: 0,
  padding: 0,
  margin: 0,
};

const DownloadTipsStyled = styled.Text`
  font-size: 10px;
  text-align: right;
  margin-left: 30px;
  margin-right: 30px;
`;

function ComicListItem({
  title, itemOnPress, active, dark, showCheckbox, checked, status, isDisabled,
}) {
  const downloadTips = downloadStatus[status];
  return (
    <Button
      style={[
        buttonStyle,
        active && { backgroundColor: brand_primary },
        dark && { width: width * 0.7 }]}
      textStyle={[textStyle, dark && { color: '#eee' }, active && { color: '#fff' }]}
      onPress={itemOnPress}
      isDisabled={isDisabled}
    >
      {active && !showCheckbox && <LocaltionIcon />}
      {showCheckbox && (
        <CheckBox
          checked={checked}
          textStyle={textStyle}
          containerStyle={checkboxStyle}
          checkedColor={active ? '#fff' : brand_primary}
          uncheckedColor={active ? '#fff' : '#bfbfbf'}
          onPress={itemOnPress}
        />
      )}
      {title}
      {status && (
        <DownloadTipsStyled
          style={[
            dark && { color: '#eee' },
            active && !showCheckbox && { color: '#fff' },
            showCheckbox && { color: '#666' },
          ]}
        >
          {downloadTips}
        </DownloadTipsStyled>
      )}
    </Button>
  );
}
ComicListItem.propTypes = {
  title: PropTypes.string.isRequired,
  itemOnPress: PropTypes.func.isRequired,
  active: PropTypes.bool,
  dark: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  checked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  status: PropTypes.string,
};
ComicListItem.defaultProps = {
  active: false,
  dark: false,
  showCheckbox: false,
  checked: false,
  isDisabled: false,
  status: '',
};
export default ComicListItem;
