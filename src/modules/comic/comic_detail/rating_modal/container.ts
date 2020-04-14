import { connect } from 'react-redux';
import Component from './component';
import { addScore } from '../actions';

interface IOwnProps {
  isVisible?: boolean;
  cancel?(): void;
}
const mapStateToProps = state => ({
  id: state.comic.getIn(['detail', 'id']),
  my_score: state.comic.getIn(['detail', 'my_score']),
});

const mapDispatchToProps = dispatch => ({
  add(params) {
    return dispatch(addScore(params));
  },
});

export type IContainer = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IOwnProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
