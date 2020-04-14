import React, { PureComponent } from 'react';
import { wrapWithLoading, ILoadingProps } from 'utils';
import Parallax from './parallax';
import LoadingPage from './loading_page';

@wrapWithLoading
class ComicDetailScreen extends PureComponent<ILoadingProps> {

  render() {
    const { loading } = this.props;
    return ([
      <LoadingPage show={loading} key="loading" />,
      <Parallax {...this.props} key="main" />,
    ]);
  }
}

export default ComicDetailScreen;
