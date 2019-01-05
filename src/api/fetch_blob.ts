import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import baseURL from './base_url';

export const uploadUserAvatar =
({ path, csrf, filename = '' }: { path: string; csrf: string; filename?: string }) => RNFetchBlob.fetch('PUT',
`${baseURL}/user/avatar`, {
  'Content-Type': 'multipart/form-data',
  'x-csrf-token': csrf,
}, [{
  name: 'avatar',
  filename,
  data: RNFetchBlob.wrap(Platform.OS === 'android' ? path : path.replace('file://', '')),
}]).then(res => res.json());

export const downloadImage = (url: string) => RNFetchBlob.config({
  fileCache: true,
  appendExt: 'jpg',
}).fetch('GET', url).then(res => res.path());

export const deleteImage = (path: string) => RNFetchBlob.fs.unlink(path);
