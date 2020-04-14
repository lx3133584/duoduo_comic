import React, { Component } from 'react';
import ContentListScroll from '../content_list_scroll';
import Spin from '../spin';
import ContentListFooter from '../content_list_footer';
import { LongListLoadingFooter } from '@';
import { IContainer } from './container';
import ContentListPageTurning from '../content_list_page_turning';

const page_size = 5;
interface IState {
  page: number;
  loadingPage: boolean;
  noMoreData: boolean;
}
type Ref = typeof ContentListScroll | typeof ContentListPageTurning;
class ContentListComponent extends Component<IContainer, IState> {
  static defaultProps = {
    go_to_flag: false,
    content_index: 0,
    detail_chapter_id: 0,
    chapter_id: 0,
    content_cache: null,
  };

  chapter_id = 0; // 本章节ID
  init_page = 0; // 初始化时的页码
  content_list_ref?: any = undefined;

  state: IState = {
    page: 0, // 续读页码
    loadingPage: false, // 正在加载页面, 显示Spin
    noMoreData: false, // 是否没有更多数据
  };

  componentDidMount() {
    this.init();
  }

  shouldComponentUpdate(nextProps: IContainer, nextState: IState) {
    const { mode, go_to_flag, chapter_id } = this.props;
    const { page, loadingPage, noMoreData } = this.state;
    return nextProps.mode !== mode
      || nextProps.go_to_flag !== go_to_flag
      || nextState.page !== page
      || nextState.noMoreData !== noMoreData
      || nextProps.chapter_id !== chapter_id
      || nextState.loadingPage !== loadingPage;
  }

  componentDidUpdate(prevProps: IContainer) {
    const {
      go_to_flag, chapter_id, mode, content_index,
    } = this.props;
    if (prevProps.go_to_flag !== go_to_flag || prevProps.mode !== mode) {
      this.goToIndex(content_index);
    }
    if (prevProps.chapter_id !== chapter_id) {
      this.update();
    }
  }

  onRefresh = () => {
    const { saveIndex } = this.props;
    saveIndex(0);
    this.init_page = 0;
    this.setState({ page: 0, noMoreData: false });
  }

  onFetch = (page: number, init = false) => {
    const { getContent, content_cache } = this.props;
    if (content_cache) return null;
    return (getContent({
      id: this.chapter_id, page, init, pre: false,
    }) as any).then(res => {
      const data = res.value.result ? res.value.result.data : res.value.data;
      if (res.error || !data) return;
      if (!data.length) this.setState({ noMoreData: true });
      return res;
    });
  }

  goPage = async ({ page = 0, init }: { page?: number; init?: boolean }) => {
    init && (this.init_page = page);
    this.setState({ loadingPage: true });
    try {
      await this.onFetch(page, init);
    } finally {
      this.setState({ loadingPage: false });
    }
  }

  // 调用滚动列表的滚动方法
  scrollTo = (index: number) => {
    const { mode } = this.props;
    if (mode !== 'scroll') return;
    if (!this.content_list_ref || !this.content_list_ref.scrollTo) return;
    setTimeout(() => {
      this.content_list_ref.scrollTo(index);
    }, 0);
  }

  // 根据 index 计算page
  computePage = (index: number) => ~~((index + 1) / (page_size + 0.000001));

  // 增加页码
  increasePage = (newPage?: number) => {
    if (newPage !== undefined) { // 传入参数则为设定页码
      this.setState({ page: newPage });
    } else {
      this.setState(({ page }) => ({ page: page + 1 }));
    }
  }

  // 跳页
  goToIndex = async (index: number) => {
    const { content_cache } = this.props;
    const page = this.computePage(index);
    const offset = index % page_size;
    const { page: myPage } = this.state;
    if (page !== myPage && !content_cache) {
      this.setState({ page });
      await this.goPage({ page, init: true });
    }
    this.scrollTo(content_cache ? index : offset);
  }

  useCache() {
    const { chapter_id, content_cache, useCache } = this.props;
    if (!content_cache) return;
    useCache({ id: chapter_id, content: content_cache });
    setTimeout(() => this.setState({ noMoreData: true }), 0);
  }

  _getRef = (ref: Ref) => this.content_list_ref = ref;

  async update() {
    const {
      pre,
      preContent,
      pre_content,
      chapter_id,
      content_cache,
    } = this.props;
    this.chapter_id = chapter_id;
    if (content_cache) this.useCache();
    else if (pre && pre_content.size) {
      preContent(this.chapter_id);
    } else {
      await this.goPage({ init: true });
    }
    this.onRefresh();
    this.scrollTo(0);
  }

  async init() {
    const {
      chapter_id,
      hideLoading,
      content_index,
      detail_chapter_id,
      content_cache,
    } = this.props;
    this.chapter_id = chapter_id;
    let offset = 0;
    let page = 0;
    const isSame = detail_chapter_id === chapter_id;

    if (isSame) {
      page = this.computePage(content_index);
      this.setState({ page });
      offset = content_index % page_size;
    }

    if (content_cache) this.useCache();
    else await this.goPage({ page, init: true });

    if (!isSame) this.onRefresh();
    this.scrollTo(content_cache ? content_index : offset);
    hideLoading();
  }

  renderFooterComponent = () => {
    const { noMoreData } = this.state;
    if (!noMoreData) return <LongListLoadingFooter color="#fff" background="#282828" />;
    return <ContentListFooter />;
  }

  render() {
    const { toggleDrawer, mode } = this.props;
    const { page, loadingPage, noMoreData } = this.state;
    let ContentList;
    switch (mode) {
      case 'page_turning':
        ContentList = ContentListPageTurning;
        break;
      case 'scroll':
      default:
        ContentList = ContentListScroll;
    }
    return [
      <ContentList
        key="list"
        getRef={this._getRef}
        offset={this.init_page * page_size}
        page={page + 1}
        increasePage={this.increasePage}
        onFetch={this.onFetch}
        noMoreData={noMoreData}
        renderFooterComponent={this.renderFooterComponent}
        onRefresh={this.onRefresh}
        toggleDrawer={toggleDrawer}
      />,
      <Spin key="spin" show={loadingPage} />,
    ];
  }
}

export default ContentListComponent;
