import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getSearchList } from '../actions';
import Component from './component';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  search(params: any) {
    return dispatch(getSearchList(params));
  },
});

interface IOwnProps {
  oKeyword?: string;
}

export type IContainer = ReturnType<typeof mapDispatchToProps> & IOwnProps;

export default connect(
  null,
  mapDispatchToProps,
)(Component);
