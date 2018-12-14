import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'router';

function DetailHeaderComponent({ title }) {
  return (
    <Header
      customTitle={title}
      isNoBack
    />
  );
}
DetailHeaderComponent.propTypes = {
  title: PropTypes.string,
};
DetailHeaderComponent.defaultProps = {
  title: '漫画详情',
};
export default DetailHeaderComponent;
