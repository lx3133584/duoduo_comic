import React, { Component } from 'react';
import { Dimensions, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { ListEmpty, LongListTextFooter, LongListLoadingFooter } from '..';

const { height } = Dimensions.get('window');

interface IProps {
  initPage?: number;
  page?: number;
  customKey?: string;
  Item: any;
  list: any[];
  onFetch: (page: number, init?: boolean) => Promise<any>;
  increasePage: (page?: number) => void;
  callback: (page: number, init?: boolean) => any;
  itemOnPress: any;
  itemOnLongPress: any;
  getRef: (ref: any) => any;
  itemHeight: number;
  isLong: boolean;
  horizontal: boolean;
  showFooter: boolean;
  emptyText: string;
}
class LongListComponent extends Component<IProps, { loading: boolean; refreshing: boolean }> {
  static propTypes = {
    initPage: PropTypes.number,
    page: PropTypes.number,
    customKey: PropTypes.string,
    Item: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
    list: PropTypes.array.isRequired,
    onFetch: PropTypes.func,
    increasePage: PropTypes.func,
    callback: PropTypes.func,
    itemOnPress: PropTypes.func,
    itemOnLongPress: PropTypes.func,
    getRef: PropTypes.func,
    itemHeight: PropTypes.number,
    isLong: PropTypes.bool,
    horizontal: PropTypes.bool,
    showFooter: PropTypes.bool,
    emptyText: PropTypes.string,
  };

  static defaultProps = {
    initPage: 0,
    customKey: 'id',
    page: 0,
    onFetch: null,
    callback: f => f,
    increasePage: f => f,
    itemOnPress: f => f,
    itemOnLongPress: f => f,
    getRef: f => f,
    itemHeight: 140,
    isLong: false,
    horizontal: false,
    showFooter: false,
    emptyText: '这里什么都没有呢~',
  };

  page: number;
  customKey: string;
  noMoreData: boolean = false;

  constructor(props) {
    super(props);
    const { page, customKey } = props;
    this.state = {
      loading: false,
      refreshing: false,
    };
    this.page = page || 0;
    this.customKey = customKey || 'id';
    this._onRefresh = this._onRefresh.bind(this);
    this._onFetch = this._onFetch.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._itemOnLongPress = this._itemOnLongPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { page } = this.props;
    if (nextProps.page !== page) this.page = nextProps.page;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { list, showFooter, emptyText } = this.props;
    const { loading, refreshing } = this.state;
    return nextProps.list !== list
      || nextProps.showFooter !== showFooter
      || nextProps.emptyText !== emptyText
      || nextState.refreshing !== refreshing
      || nextState.loading !== loading;
  }

  _getItemLayout = (data, index: number) => {
    const { itemHeight } = this.props;
    return { length: itemHeight, offset: itemHeight * index, index };
  }

  _keyExtractor = item => `${item[this.customKey]}`;

  _renderFooterComponent = () => {
    const { loading } = this.state;
    if (loading) return <LongListLoadingFooter />;
    return <LongListTextFooter />;
  }

  _onFetch({ init }: { init?: boolean }) {
    const { onFetch, callback, increasePage } = this.props;
    if (!onFetch) return;
    const { loading } = this.state;
    if (loading || this.noMoreData) return;
    this.setState({ loading: true });
    const resPromise = onFetch(this.page, init);
    if (!resPromise) return this.setState({ loading: false });
    return resPromise.then((res) => {
      const data = res.value.result ? res.value.result.data : res.value.data;
      if (!res.error && data.length) {
        callback(this.page, init);
        this.page++;
        return increasePage();
      }
      if (!res.error) this.noMoreData = true;
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  _itemOnLongPress(...params) {
    const { itemOnLongPress } = this.props;
    itemOnLongPress(...params);
  }

  _renderItem({ item }) {
    const { Item, itemOnPress = f => f } = this.props;
    const _item = item.toObject ? item.toObject() : item; // 支持immutable格式的item数据
    return <Item {..._item} itemOnPress={itemOnPress} itemOnLongPress={this._itemOnLongPress} />;
  }

  async _onRefresh() {
    const { increasePage } = this.props;
    this.page = 0;
    this.noMoreData = false;
    increasePage(0);
    this.setState({ refreshing: true });
    try {
      await this._onFetch({ init: true });
    } finally {
      this.setState({ refreshing: false });
    }
  }

  render() {
    const {
      list, getRef, isLong, showFooter, emptyText, itemHeight = 140,
    } = this.props;
    const { refreshing } = this.state;
    return (
      <FlatList
        ref={getRef}
        data={list}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onEndReached={isLong && this._onFetch}
        onEndReachedThreshold={1.6}
        onRefresh={this._onRefresh}
        refreshing={refreshing}
        getItemLayout={this._getItemLayout}
        initialNumToRender={Math.ceil(height / itemHeight)}
        ListEmptyComponent={() => <ListEmpty text={emptyText} />}
        ListFooterComponent={showFooter && !!list.length && this._renderFooterComponent}
        {...this.props}
      />
    );
  }
}

export default LongListComponent;
