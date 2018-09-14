import React, { PureComponent } from 'react';
import { SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { brand_primary } from 'theme';

const containerStyle = {
  borderTopWidth: 0,
  borderBottomColor: brand_primary,
  backgroundColor: brand_primary,
};

const inputStyle = {
  backgroundColor: '#e65d53',
  color: '#fff',
};
const icon = {
  type: 'material',
  color: '#f1f2f6',
  name: 'search',
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
    await search({ keyword: value, page: 0 });
    this.setState({ loading: false });
  }

  render() {
    const { value, loading } = this.state;
    return (
      <SearchBar
        value={value}
        placeholder="搜索漫画信息（名称、作者、描述）"
        lightTheme
        round
        showLoading={loading}
        containerStyle={containerStyle}
        inputStyle={inputStyle}
        placeholderTextColor="#f1f2f6"
        icon={icon}
        onSubmitEditing={this.onSubmit}
        onChangeText={this.onChange}
      />
    );
  }
}

export default SearchBarComponent;
