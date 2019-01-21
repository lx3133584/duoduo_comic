import React, { PureComponent, Component, ComponentType } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

interface ILoadingState {
  loading: boolean;
}
export interface ILoadingProps extends ILoadingState {
  hideLoading(bool?: boolean): void;
}
// 提供loading状态的高阶组件
export function wrapWithLoading<WrappedProps extends ILoadingProps>(WrappedComponent: ComponentType<WrappedProps>) {
  type HocProps = Subtract<WrappedProps, ILoadingProps>;
  class NewComponent extends PureComponent<HocProps, ILoadingState> {
    static displayName = `wrapWithLoading(${WrappedComponent.name})`;
    static readonly WrappedComponent = WrappedComponent;

    state: ILoadingState = {
      loading: true,
    };
    constructor(props: HocProps) {
      super(props);
      this.hideLoading = this.hideLoading.bind(this);
    }

    hideLoading(bool = false) {
      this.setState({ loading: bool });
    }

    render() {
      const { loading } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          loading={loading}
          hideLoading={this.hideLoading}
        />
      );
    }
  }
  return hoistNonReactStatics(NewComponent, WrappedComponent);
}
export const wrapWithLoadingType = {
  loading: PropTypes.bool.isRequired,
  hideLoading: PropTypes.func.isRequired,
};

interface ICheckboxState {
  checkboxData: Immutable.Map<number, boolean>;
}
type ImmutableList = Immutable.List<IItem>;
export interface ICheckBoxProps extends ICheckboxState {
  totalSelected: number;
  selectedIdList: ImmutableList;
  isSelectedAll: boolean;
  initCheckBoxData(list: ImmutableList): void;
  selectAll(): void;
  changeCheckbox(id: number): void;
}
// 提供复选框选择的高阶组件
export function wrapWithCheckBoxData<P>(WrappedComponent: ComponentType<P>) {
  class NewComponent extends Component<P, ICheckboxState> {
    static displayName = `wrapWithCheckBoxData(${WrappedComponent.name})`;
    static readonly WrappedComponent = WrappedComponent;
    state: ICheckboxState = {
      checkboxData: Immutable.Map(),
    };
    dataList: ImmutableList = Immutable.List();
    constructor(props) {
      super(props);
      this.initCheckBoxData = this.initCheckBoxData.bind(this);
      this.selectAll = this.selectAll.bind(this);
      this.changeCheckbox = this.changeCheckbox.bind(this);
    }
    shouldComponentUpdate(nextProps: P, nextState: ICheckboxState) {
      const {
        checkboxData,
      } = this.state;
      return !Immutable.is(nextState.checkboxData, checkboxData);
    }

    initCheckBoxData(list: ImmutableList) {
      this.dataList = Immutable.List.isList(list) ? list : Immutable.List(list);
    }

    get totalSelected() {
      const { checkboxData } = this.state;
      return checkboxData.reduce((t, v) => {
        if (v) return t! + 1;
        return t!;
      }, 0);
    }

    get selectedIdList() {
      if (!this.dataList.size) return Immutable.List();
      const { checkboxData } = this.state;
      return this.dataList.filter((item) => checkboxData.get(item.id));
    }

    get isSelectedAll() {
      if (!this.dataList.size) return false;
      return this.dataList.size === this.totalSelected;
    }

    selectAll() {
      if (!this.dataList.size) return;
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

    changeCheckbox = (index: number) =>
      this.setState((state) => ({ checkboxData: state.checkboxData.update(index, (bool) => !bool) }))

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
  return hoistNonReactStatics(NewComponent, WrappedComponent);
}
export const wrapWithCheckBoxDataType = {
  checkboxData: ImmutablePropTypes.map.isRequired,
  initCheckBoxData: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  changeCheckbox: PropTypes.func.isRequired,
  totalSelected: PropTypes.number.isRequired,
  isSelectedAll: PropTypes.bool.isRequired,
  selectedIdList: ImmutablePropTypes.list.isRequired,
};
