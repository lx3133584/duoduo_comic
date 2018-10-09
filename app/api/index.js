import http from 'axios';

export { uploadUserAvatar, downloadImage, deleteImage } from './fetch_blob';

// 收藏
export const fetchFavoritesList = () => http.get('favorites'); // 收藏列表
export const postFavorite = id => http.post(`favorites/${id}`); // 添加收藏
export const deleteFavorite = id => http.delete(`favorites/${id}`); // 删除收藏
// 浏览记录
export const fetchHistoryList = page => http.get('history_record', { params: { page } }); // 浏览记录列表
export const postHistory = ({ chapter_id, index }) => http.post('history_record', { chapter_id, index }); // 添加记录
export const deleteHistory = id => http.delete(`history_record/${id}`); // 删除浏览记录
// 搜索
export const searchLocal = ({ keyword, page }) => http.get('searchLocal', { params: { keyword, page } });
// 发现
export const fetchClassList = () => http.get('class'); // 分类列表
export const fetchClassItemList = ({ id, page }) => http.get(`class/${id}`, { params: { page } }); // 单分类漫画列表
export const fetchRankItemList = ({ id, page }) => http.get(`rank/${id}`, { params: { page } }); // 单种排行榜
// 用户
export const fetchUserInfo = () => http.get('user'); // 用户信息
export const editUserInfo = ({ tel = '', email = '', name }) => http.put('user', { tel, email, name }); // 修改用户信息
export const changePassword = ({
  oldPassword,
  password,
  rePassword,
}) => http.put('password', { old_password: oldPassword, password, 're-password': rePassword }); // 修改密码
export const loginLocal = ({ username, password }) => http.post('passport/local', { username, password }); // 登录local
export const registerLocal = ({ username, password, rePassword }) => http.post('user', {
  username, password, 're-password': rePassword, tel: '', name: '', email: '', avatar: '',
}); // 注册local
export const logout = () => http.delete('logout'); // 注销
// 漫画
export const fetchComicDetail = id => http.get(`comic/${id}/detail`); // 漫画详情
export const fetchComicList = id => http.get(`comic/${id}/list`); // 漫画列表
export const fetchContentList = ({
  id,
  page,
  pre,
  all,
  no_size,
}) => { // 漫画内容
  const params = {};
  if (page) params.page = page;
  if (pre) params.pre = pre;
  if (all) params.all = all;
  if (no_size) params.no_size = no_size;
  return http.get(`comic/content/${id}`, { params });
};
// 评分
export const postScore = ({ id, score }) => http.post(`score/${id}`, { score }); // 评分
