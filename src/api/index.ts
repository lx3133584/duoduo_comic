import http from 'axios';
import store, { RootState } from 'store';

export { uploadUserAvatar, downloadImage, deleteImage } from './fetch_blob';

function getSource() {
  const state: RootState = (store as any).getState();
  return state.config.get('source', 3);
}
// 收藏
export const fetchFavoritesList = () => http.get<IResponse<Comic[]>>('favorites', { no_error_tips: true }); // 收藏列表
export const postFavorite = (id: number) => http.post<IResponse>(`favorites/${id}`); // 添加收藏
export const deleteFavorite = (id: number) => http.delete(`favorites/${id}`); // 删除收藏
// 浏览记录
export const fetchHistoryList = (page: number) => http.get<IResponse<Comic[]>>('history_record', {
  params: { page } }); // 浏览记录列表
export const postHistory = ({ chapter_id, index }: {
  chapter_id: number; index?: number;
}) => http.post<IResponse>('history_record', { chapter_id, index }); // 添加记录
export const deleteHistory = (id: number) => http.delete(`history_record/${id}`); // 删除浏览记录
// 搜索
export const searchLocal = ({ keyword, page }: {
  keyword: string; page: number;
}) => http.get<IResponse<Comic[]>>('searchLocal', { params: { keyword, page } });
// 发现
export const fetchClassList = () => http.get<IResponse<Comic.ClassItem[]>>('class'); // 分类列表
export const fetchClassItemList = ({ id, page }: {
  id: number; page: number;
}) => http.get<IResponse<Comic[]>>(`class/${id}`, { params: { page } }); // 单分类漫画列表
export const fetchRankItemList = ({ id, page }: {
  id: number; page: number;
}) => http.get<IResponse<Comic[]>>(`rank/${id}`, { params: { page } }); // 单种排行榜
// 用户
export const fetchUserInfo = () => http.get<IResponse<User>>('user', { no_error_tips: true }); // 用户信息
export const editUserInfo = ({
  tel = '',
  email = '',
  name,
}: {
  tel?: string;
  email?: string;
  name?: string;
  }) => http.put<IResponse<User>>('user', { tel, email, name }); // 修改用户信息
export const changePassword = ({
  oldPassword,
  password,
  rePassword,
}: {
  oldPassword: string;
  password: string;
  rePassword: string;
  }) => http.put<IResponse>('password', { 'old_password': oldPassword, password, 're-password': rePassword }); // 修改密码
export const loginLocal = ({ username, password }: {
  username: string;
  password: string;
}) => http.post<IResponse<User>>('passport/local', { username, password }); // 登录local
export const registerLocal = ({ username, password, rePassword }: {
  username: string;
  password: string;
  rePassword: string;
}) => http.post<IResponse<User>>('user', {
  username, password, 're-password': rePassword, 'tel': '', 'name': '', 'email': '', 'avatar': '',
}); // 注册local
export const logout = () => http.delete('logout'); // 注销
// 漫画
export const fetchComicDetail = (id: number) => http.get<IResponse<Comic>>(`comic/${id}/detail`); // 漫画详情
export const fetchComicList = (id: number) => http.get<IResponse<Comic.CategoryItem[]>>(`comic/${id}/list`); // 漫画列表
interface IFetchContentList {
  id: number;
  page?: string;
  all?: boolean | number;
  source: number;
}
export const fetchContentList = ({
  id,
  page,
  all,
}: IFetchContentList) => { // 漫画内容
  const params = {} as IFetchContentList;
  if (page) params.page = page;
  if (all) params.all = 1;
  params.source = getSource();
  return http.get<IResponse<Comic.ContentItem[]>>(`comic/content/${id}`, { params });
};
// 评分
export const postScore = ({
  id, score,
}: {
  id: number; score: number;
}) => http.post<IResponse>(`score/${id}`, { score }); // 评分
