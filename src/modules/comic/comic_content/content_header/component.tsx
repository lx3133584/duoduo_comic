import React, { SFC } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'router';

const ContentHeaderComponent: SFC<{title: string}> = ({ title }) => {
  return (
    <Header
      customTitle={title}
      customBackgroundColor="transparent"
    />
  );
};
ContentHeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
};
export default ContentHeaderComponent;
