import React, { PureComponent } from 'react';
import { wrapWithLoading, wrapWithLoadingType, ILoadingProps } from 'utils';
import { Parallax, LoadingPage } from '.';

@wrapWithLoading
class ComicDetailScreen extends PureComponent<ILoadingProps> {
  static propTypes = {
    ...wrapWithLoadingType,
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
