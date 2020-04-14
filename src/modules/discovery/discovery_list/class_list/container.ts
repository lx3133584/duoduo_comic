import { RootState } from 'store';
import { connect } from 'react-redux';
import { getClassList } from '../actions';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  list: state.discovery.get('class_list'),
});

const mapDispatchToProps = dispatch => ({
  getList(params?: any) {
    return dispatch(getClassList(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
