import React, { SFC } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const TouchableOpacityComponent: SFC<object> = (props) => {
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
