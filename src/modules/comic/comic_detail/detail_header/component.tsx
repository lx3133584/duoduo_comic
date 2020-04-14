import React from 'react';

import { Header } from 'router';

function DetailHeaderComponent({ title }) {
  return (
    <Header
      customTitle={title}
      isNoBack
    />
  );
}

DetailHeaderComponent.defaultProps = {
  title: '漫画详情',
};
export default DetailHeaderComponent;
