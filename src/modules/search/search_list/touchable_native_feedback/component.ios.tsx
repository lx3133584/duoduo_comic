import React, { SFC } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const TouchableOpacityComponent: SFC<TouchableOpacityProps & IData> = (props) => {
  const { children } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
TouchableOpacityComponent.propTypes = {
  children: PropTypes.element.isRequired,
};
export default TouchableOpacityComponent;
