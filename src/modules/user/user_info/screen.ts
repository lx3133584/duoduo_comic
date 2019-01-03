import React from 'react';
import { ScrollView } from 'react-native';
import { UserTop, UserOperateList } from '@/user/user_info';

function UserInfoScreen() {
  return (
    <ScrollView>
      <UserTop />
      <UserOperateList />
    </ScrollView>
  );
}

export default UserInfoScreen;
