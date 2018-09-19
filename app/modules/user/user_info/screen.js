import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { wrapWithUpdate } from 'utils';
import { UserTop, UserOperateList } from '@/user/user_info';

@wrapWithUpdate
class UserInfoScreen extends PureComponent {
  static propTypes = {
    checkUpdate: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { checkUpdate } = this.props;
    checkUpdate();
  }

  render() {
    const { checkUpdate } = this.props;
    return (
      <ScrollView>
        <UserTop />
        <UserOperateList checkUpdate={checkUpdate} />
      </ScrollView>
    );
  }
}

export default UserInfoScreen;
