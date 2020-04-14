import React, { PureComponent } from 'react';
import { SearchBar } from 'react-native-elements';

import { Header } from 'router';
import { brand_primary } from 'theme';
import { LeftButton } from 'router';
import { IContainer } from './container';

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
const clearIcon = {
  type: 'material',
  color: '#f1f2f6',
  name: 'clear',
};
const BackButton = () => <LeftButton containStyle={{ paddingLeft: 0, paddingRight: 0 }} />;
interface IState {
  value: string;
  loading: boolean;
}
class SearchBarComponent extends PureComponent<IContainer, IState> {

  searchBarRef = React.createRef<SearchBar>();

  constructor(props: IContainer) {
    super(props);
    const { oKeyword } = props;
    this.state = {
      value: oKeyword || '',
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { oKeyword } = this.props;
    if (oKeyword) this.onSubmit();
    else this.searchBarRef.current && this.searchBarRef.current.focus();
  }

  onChange(value: string) {
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
        ref={this.searchBarRef}
        value={value}
        placeholder="搜索漫画信息（名称、作者、描述）"
        platform="android"
        showLoading={loading}
        containerStyle={containerStyle}
        inputStyle={inputStyle}
        placeholderTextColor="#f1f2f6"
        clearIcon={clearIcon}
        searchIcon={BackButton}
        cancelIcon={BackButton}
        loadingProps={{ color: '#fff' }}
        onSubmitEditing={this.onSubmit}
        onChangeText={this.onChange}
      />
    );
  }
}

export default SearchBarComponent;
