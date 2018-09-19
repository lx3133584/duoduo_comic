import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'router';

function ContentHeaderComponent({ title }) {
  return (
    <Header
      customTitle={title}
      customBackgroundColor="transparent"
    />
  );
}
ContentHeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
};
export default ContentHeaderComponent;
