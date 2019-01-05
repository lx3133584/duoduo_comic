import { RootState } from 'store';
import { connect } from 'react-redux';
import { getClassList } from '../actions';
import Component from './component';

const mapStateToProps = (state: RootState) => ({
  list: state.discovery.get('class_list'),
});

const mapDispatchToProps = dispatch => ({
  getList(params) {
    return dispatch(getClassList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
