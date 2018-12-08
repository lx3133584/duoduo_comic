/* eslint-disable */
import React, { PureComponent } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

// 提供loading状态的高阶组件
export const wrapWithLoading = function (WrappedComponent) {
  class NewComponent extends PureComponent {
    constructor() {
      super();
      this.state = {
        loading: true,
      };
      this.hideLoading = this.hideLoading.bind(this);
    }

    hideLoading(bool = false) {
      this.setState({ loading: bool });
    }

    render() {
      const { loading } = this.state;
      return <WrappedComponent {...this.props} loading={loading} hideLoading={this.hideLoading} />;
    }
  }
  hoistNonReactStatics(NewComponent, WrappedComponent);
  return NewComponent;
};

