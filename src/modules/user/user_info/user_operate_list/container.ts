import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => ({
  isLogin: !!state.user.get('info').size,
});

export type IContainer = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
)(Component);
