/* eslint-disable */
import React, { PureComponent, Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
export const wrapWithLoadingType = {
  loading: PropTypes.bool.isRequired,
  hideLoading: PropTypes.func.isRequired,
}

// 提供复选框选择的高阶组件
export const wrapWithCheckBoxData = function (WrappedComponent) {
  class NewComponent extends Component {
    constructor() {
      super();
      this.initCheckBoxData = this.initCheckBoxData.bind(this);
      this.selectAll = this.selectAll.bind(this);
      this.changeCheckbox = this.changeCheckbox.bind(this);
    }

    state = {
      checkboxData: Immutable.Map(),
    };

    shouldComponentUpdate(nextProps, nextState) {
      const {
        checkboxData,
      } = this.state;
      return !Immutable.is(nextState.checkboxData, checkboxData);
    }

    initCheckBoxData(list) {
      this.dataList = Immutable.List.isList() ? list : Immutable.List(list);
      this.isInitialized = true;
    }

    get totalSelected() {
      const { checkboxData } = this.state;
      return checkboxData.reduce((t, v) => {
        if (v) return t + 1;
        return t;
      }, 0);
    }

    get selectedIdList() {
      if (!this.isInitialized) return Immutable.List();
      const { checkboxData } = this.state;
      return this.dataList.filter(item => checkboxData.get(item.id));
    }

    get isSelectedAll() {
      if (!this.isInitialized) return false;
      return this.dataList.size === this.totalSelected
    }

    selectAll() {
      if (!this.isInitialized) return;
      const { checkboxData } = this.state;
      this.setState({
        checkboxData: checkboxData.withMutations((map) => {
          let isSelectedAll = true; // 是否已经全部选中
          this.dataList.forEach((item) => {
            if (!checkboxData.get(item.id)) isSelectedAll = false;
            map.set(item.id, true);
          });
          if (isSelectedAll) { // 如果已经全选则全部取消选择
            this.dataList.forEach((item) => {
              map.set(item.id, false);
            });
          }
        }),
      });
    }

    changeCheckbox = index => this.setState(state => ({ checkboxData: state.checkboxData.update(index, bool => !bool) }))

    render() {
      const { checkboxData } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          checkboxData={checkboxData}
          initCheckBoxData={this.initCheckBoxData}
          selectAll={this.selectAll}
          changeCheckbox={this.changeCheckbox}
          totalSelected={this.totalSelected}
          selectedIdList={this.selectedIdList}
          isSelectedAll={this.isSelectedAll}
        />
      );
    }
  }
  hoistNonReactStatics(NewComponent, WrappedComponent);
  return NewComponent;
};
export const wrapWithCheckBoxDataType = {
  checkboxData: ImmutablePropTypes.map.isRequired,
  initCheckBoxData: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  changeCheckbox: PropTypes.func.isRequired,
  totalSelected: PropTypes.number.isRequired,
  isSelectedAll: PropTypes.bool.isRequired,
  selectedIdList: ImmutablePropTypes.list.isRequired,
}
