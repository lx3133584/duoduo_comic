import { connect } from 'react-redux';
import Component from './component';

interface IOwnProps {
  index?: number;
}
const mapStateToProps = state => ({
  info: state.user.get('info'),
});

export type IContainer = ReturnType<typeof mapStateToProps> & IOwnProps;

export default connect(
  mapStateToProps,
  null,
)(Component);
