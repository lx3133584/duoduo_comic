import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { wrapWithLoading } from 'utils';
import { Parallax, LoadingPage } from '@/comic/comic_detail';

@wrapWithLoading
class ComicDetailScreen extends PureComponent {
  static propTypes = {
    hideLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { loading } = this.props;
    return ([
      <LoadingPage show={loading} key="loading" />,
      <Parallax {...this.props} key="main" />,
    ]);
  }
}

export default ComicDetailScreen;
