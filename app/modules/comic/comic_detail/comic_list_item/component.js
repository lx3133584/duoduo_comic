import React from 'react';
import PropTypes from 'prop-types';
import Button from 'apsl-react-native-button';
import Entypo from 'react-native-vector-icons/Entypo';
import { CheckBox } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { brand_primary } from 'theme';

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
};

function ComicListItem({
  title, itemOnPress, active, dark, showCheckbox, checked,
}) {
  return (
    <Button
      style={[
        buttonStyle,
        active && !showCheckbox && { backgroundColor: brand_primary },
        dark && { width: width * 0.7 }]}
      textStyle={[textStyle, dark && { color: '#eee' }, active && !showCheckbox && { color: '#fff' }]}
      onPress={itemOnPress}
    >
      {active && !showCheckbox && <LocaltionIcon />}
      {showCheckbox ? (
        <CheckBox
          checked={checked}
          textStyle={textStyle}
          containerStyle={checkboxStyle}
          checkedColor={brand_primary}
          onPress={itemOnPress}
        />
      ) : null}
      {title}
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
};
ComicListItem.defaultProps = {
  active: false,
  dark: false,
  showCheckbox: false,
  checked: false,
};
export default ComicListItem;
