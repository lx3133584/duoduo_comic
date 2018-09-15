import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ComicList } from '@/comic/comic_content_list_drawer';

class ComicContentListDrawerScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      addListener: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    initialized: false, // 是否初始化完成
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.willBlurSubscription = navigation.addListener(
      'willBlur',
      () => {
        this.setState({ initialized: true });
      },
    );
  }

  componentWillUnmount() {
    this.willBlurSubscription.remove();
  }

  render() {
    const { initialized } = this.state;
    return (
      initialized && <ComicList {...this.props} dark isReplace />
    );
  }
}

export default ComicContentListDrawerScreen;
