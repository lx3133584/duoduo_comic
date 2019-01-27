import React, { Component } from 'react';
import { Dimensions, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { ListEmpty, LongListTextFooter, LongListLoadingFooter } from '..';
import { brand_primary } from 'theme';

const { height } = Dimensions.get('window');

interface IProps extends FlatList<any> {
  initPage?: number;
  page?: number;
  customKey?: string;
  Item: any;
  list: any[];
  onFetch: (page: number, init?: boolean) => Promise<any>;
  increasePage: (page?: number) => void;
  onRefresh: () => void;
  itemOnPress?: any;
  itemOnLongPress?: any;
  getRef?: (ref: any) => any;
  onScroll?: (e: any) => void;
  itemHeight: number;
  isLong?: boolean;
  horizontal?: boolean;
  showFooter?: boolean;
  noMoreData?: boolean;
  emptyText?: string;
  ListFooterComponent?: any;
}
interface IState {
  loading: boolean;
  refreshing: boolean;
  noMoreData: boolean;
}
class LongListComponent extends Component<IProps, IState> {
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
    onRefresh: PropTypes.func,
    noMoreData: PropTypes.bool,
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
    onFetch: null,
    onRefresh: f => f,
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

  constructor(props: IProps) {
    super(props);
    const { page, customKey, isLong } = props;
    this.state = {
      loading: false,
      refreshing: false,
      noMoreData: !isLong,
    };
    this.page = page || 0;
    this.customKey = customKey || 'id';
    this._onRefresh = this._onRefresh.bind(this);
    this._onFetch = this._onFetch.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._itemOnLongPress = this._itemOnLongPress.bind(this);
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { noMoreData } = this.props;
    if (nextProps.page !== undefined) {
      this.page = nextProps.page;
    }
    if (nextProps.noMoreData !== undefined && nextProps.noMoreData !== noMoreData) {
      this.setState({ noMoreData: nextProps.noMoreData });
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    const { list, showFooter, emptyText } = this.props;
    const { loading, refreshing, noMoreData } = this.state;
    return nextProps.list !== list
      || nextProps.showFooter !== showFooter
      || nextProps.emptyText !== emptyText
      || nextState.refreshing !== refreshing
      || nextState.noMoreData !== noMoreData
      || nextState.loading !== loading;
  }

  _getItemLayout = (data: any, index: number) => {
    const { itemHeight } = this.props;
    return { length: itemHeight, offset: itemHeight * index, index };
  }

  _keyExtractor = (item: IData) => `${item[this.customKey]}`;

  _renderFooterComponent = () => {
    const { noMoreData } = this.state;
    if (!noMoreData) return <LongListLoadingFooter />;
    return <LongListTextFooter />;
  }

  _onFetch({ init }: { init?: boolean; distanceFromEnd?: number }) {
    const { onFetch, increasePage } = this.props;
    if (!onFetch) return;
    const { loading, noMoreData } = this.state;
    if (!init && (loading || noMoreData)) return;
    this.setState({ loading: true });
    const resPromise = onFetch(this.page, init);
    if (!resPromise) return this.setState({ loading: false });
    return resPromise.then((res) => {
      const data = res.value.result ? res.value.result.data : res.value.data;
      if (res.error || !data) return;
      this.page++;
      increasePage();
      if (!data.length) {
        this.setState({ noMoreData: true });
      }
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
    const _item = item.toObject ? item.toObject() : item; // 支持 immutable 格式的item数据
    return <Item {..._item} itemOnPress={itemOnPress} itemOnLongPress={this._itemOnLongPress} />;
  }

  async _onRefresh() {
    const { increasePage, onRefresh } = this.props;
    this.page = 0;
    increasePage(0);
    onRefresh();
    this.setState({ refreshing: true, noMoreData: false });
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
        onEndReached={isLong ? this._onFetch : null}
        onEndReachedThreshold={1.6}
        refreshing={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh}
            colors={[brand_primary]}
          />
        }
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
