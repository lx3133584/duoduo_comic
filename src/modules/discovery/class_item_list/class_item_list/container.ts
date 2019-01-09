import { RootState } from 'store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getClassItemList } from '../actions';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  list: state.discovery.get('class_item_list'),
});

const mapDispatchToProps = (dispatch: Dispatch<ReturnType<typeof getClassItemList>>) => ({
  getList(params: any) {
    return dispatch(getClassItemList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
