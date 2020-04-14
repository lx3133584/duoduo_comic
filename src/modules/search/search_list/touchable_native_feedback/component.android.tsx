import React, { SFC } from 'react';

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

export default TouchableNativeFeedbackComponent;
