import React, { SFC } from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback, TouchableNativeFeedbackProps } from 'react-native';

const TouchableNativeFeedbackComponent: SFC<TouchableNativeFeedbackProps & IData> = (props) => {
  const { children } = props;
  return (
    <TouchableNativeFeedback
      {...props}
      background={TouchableNativeFeedback.SelectableBackground()}
    >
      {children}
    </TouchableNativeFeedback>
  );
};
TouchableNativeFeedbackComponent.propTypes = {
  children: PropTypes.element.isRequired,
};
export default TouchableNativeFeedbackComponent;
