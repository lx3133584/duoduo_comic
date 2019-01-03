import React from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback } from 'react-native';

function TouchableNativeFeedbackComponent(props) {
  const { children } = props;
  return (
    <TouchableNativeFeedback
      {...props}
      background={TouchableNativeFeedback.SelectableBackground()}
    >
      {children}
    </TouchableNativeFeedback>
  );
}
TouchableNativeFeedbackComponent.propTypes = {
  children: PropTypes.element.isRequired,
};
export default TouchableNativeFeedbackComponent;
