import React, { SFC } from 'react';

import { Header } from 'router';

const ContentHeaderComponent: SFC<{title?: string}> = ({ title }) => {
  return (
    <Header
      customTitle={title}
      customBackgroundColor="transparent"
    />
  );
};
export default ContentHeaderComponent;
