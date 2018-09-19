import React, { PureComponent } from 'react';
import { ClassItemList } from '@/discovery/class_item_list';

class ClassItemListScreen extends PureComponent {
  render() {
    return (
      <ClassItemList {...this.props} />
    );
  }
}

export default ClassItemListScreen;
