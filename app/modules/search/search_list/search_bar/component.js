import React, { PureComponent } from 'react';
import { SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Header } from 'router';
import { brand_primary } from 'theme';

const containerStyle = {
  borderTopWidth: 0,
  paddingTop: Header.statusBarHeight + 10,
  borderBottomColor: brand_primary,
  backgroundColor: brand_primary,
};

const inputStyle = {
  paddingLeft: 8,
  paddingRight: 8,
  fontSize: 14,
  backgroundColor: '#e65d53',
  color: '#fff',
};
const searchIcon = {
  type: 'material',
  color: '#f1f2f6',
  name: 'search',
};
const clearIcon = {
  type: 'material',
  color: '#f1f2f6',
  name: 'clear',
};
const cancelIcon = {
  type: 'material',
  color: '#f1f2f6',
  name: 'clear-all',
};

class SearchBarComponent extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    keyword: PropTypes.string,
  };

  static defaultProps = {
    keyword: '',
  }

  constructor(props) {
    super(props);
    const { keyword } = props;
    this.state = {
      value: keyword,
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  async onSubmit() {
    const { value } = this.state;
    if (!value) return;
    const { search } = this.props;
    this.setState({ loading: true });
    try {
      await search({ keyword: value, page: 0 });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { value, loading } = this.state;
    return (
      <SearchBar
        value={value}
        placeholder="搜索漫画信息（名称、作者、描述）"
        platform="android"
        showLoading={loading}
        containerStyle={containerStyle}
        inputStyle={inputStyle}
        placeholderTextColor="#f1f2f6"
        clearIcon={clearIcon}
        searchIcon={searchIcon}
        cancelIcon={cancelIcon}
        loadingProps={{ color: '#fff' }}
        onSubmitEditing={this.onSubmit}
        onChangeText={this.onChange}
      />
    );
  }
}

export default SearchBarComponent;
