import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Toast from 'react-native-root-toast';
import { Image } from 'react-native';
import { ContentListScroll, ContentListPageTurning } from '@/comic/comic_content';

const { prefetch } = Image;
const page_size = 5;
const pre_num = 3;
class ContentListComponent extends Component {
  static propTypes = {
    pre_content: ImmutablePropTypes.list.isRequired,
    content_index: PropTypes.number,
    mode: PropTypes.string.isRequired,
    getContent: PropTypes.func.isRequired,
    preContent: PropTypes.func.isRequired,
    postHistory: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    saveIndex: PropTypes.func.isRequired,
    saveTitle: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    go_to_flag: PropTypes.bool,
    comic_id: PropTypes.number.isRequired,
    detail_chapter_id: PropTypes.number,
  };

  static defaultProps = {
    go_to_flag: false,
    content_index: 0,
    detail_chapter_id: 0,
  }

  constructor() {
    super();
    this.chapter_id = 0; // 本章节ID
    this.init_page = 0; // 初始化时的页码
  }

  state = {
    page: 0, // 续读页码
  };

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    const { go_to_flag } = this.props;
    if (nextProps.go_to_flag !== go_to_flag) {
      this.goToIndex(nextProps.content_index);
    }
  }

  componentWillUnmount() {
    this.saveHistory();
  }

  onRefresh = (page, init) => {
    const { saveIndex } = this.props;
    if (!init) return;
    saveIndex(0);
    this.init_page = 0;
    this.setState({ page: 0 });
  };

  onFetch = async (page, init = false) => {
    const { getContent } = this.props;
    await getContent({
      id: this.chapter_id, page, init, pre: false,
    });
  };

  // 从目录中取第一个章节
  getChapterFromList = async () => {
    const { getList, comic_id } = this.props;
    const res = await getList(comic_id);
    return res.value.data[0].data[0];
  };

  goPage = async ({ page, offset, init }) => {
    init && (this.init_page = page);
    const { value } = await this.onFetch(page, init);
    const data = value.result.data.slice(offset, offset + pre_num);
    const tasks = data.map(item => prefetch(item.url));
    try {
      await Promise.all(tasks); // 前三张图片都显示出来才结束loading
    } catch (e) {
      Toast.show('图片加载失败', {
        position: -70,
      });
    }
  };

  // 调用滚动列表的滚动方法
  scrollTo = (index) => {
    const { mode } = this.props;
    if (mode !== 'scroll') return;
    if (!this.content_list_ref || !this.content_list_ref.scrollTo) return;
    setTimeout(() => {
      this.content_list_ref.scrollTo(index);
    }, 0);
  };

  // 根据index计算page
  computePage = index => ~~((index + 1) / (page_size + 0.000001));

  // 增加页码
  increasePage = (newPage) => {
    if (newPage !== undefined) { // 传入参数则为设定页码
      this.setState({ page: newPage });
    } else {
      this.setState(({ page }) => ({ page: page + 1 }));
    }
  };

  // 跳页
  goToIndex = async (index) => {
    const page = this.computePage(index);
    const offset = index % page_size;
    const { page: myPage } = this.state;
    if (page !== myPage) {
      this.setState({ page });
      await this.goPage({ page, offset, init: true });
    }
    this.scrollTo(offset);
  };

    init = async () => {
      const {
        chapter_id: id,
        title,
        pre,
        preContent,
        hideLoading,
        saveTitle,
        pre_content,
        content_index,
        detail_chapter_id,
      } = this.props;
      this.chapter_id = id;
      let cur_chapter = title;
      if (!+id) { // 如果chapter_id为null则从list中取
        const { id: _id, title: _title } = await this.getChapterFromList();
        this.chapter_id = _id;
        cur_chapter = _title;
      }
      saveTitle(cur_chapter);
      if (pre && pre_content.size) {
        preContent(this.chapter_id);
      } else {
        let offset = 0;
        let page = 0;
        if (detail_chapter_id === this.chapter_id) {
          page = this.computePage(content_index);
          this.setState({ page });
          offset = content_index % page_size;
        } else {
          this.onRefresh(0, true);
        }
        await this.goPage({ page, offset, init: true });
        this.scrollTo(offset);
        // if (offset > page_size - pre_num) {
        //   this.setState(({ page }) => { page: page + 1 });
        //   await this.goPage({ page: page + 1, offset: 0, init: false }); // 如果后面不足3张图片则加载下一页
        // }
      }
      this.saveHistory();
      hideLoading();
    };

    // 保存阅读进度
    saveHistory = () => {
      const { content_index, postHistory } = this.props;
      postHistory({ chapter_id: this.chapter_id, index: content_index });
    };

  _getRef = ref => this.content_list_ref = ref;

  render() {
    const { toggleDrawer, mode } = this.props;
    const { page } = this.state;
    let ContentList;
    switch (mode) {
      case 'page_turning':
        ContentList = ContentListPageTurning;
        break;
      case 'scroll':
        ContentList = ContentListScroll;
        break;
      default:
        ContentList = ContentListScroll;
    }
    return (
      <ContentList
        getRef={this._getRef}
        offset={this.init_page * page_size}
        page={page + 1}
        increasePage={this.increasePage}
        onFetch={this.onFetch}
        onRefresh={this.onRefresh}
        toggleDrawer={toggleDrawer}
      />
    );
  }
}

export default ContentListComponent;
