import RNFetchBlob from 'rn-fetch-blob';
import baseURL from './base_url';

export const uploadUserAvatar = ({ path, csrf, filename = '' }) => RNFetchBlob.fetch('PUT', `${baseURL}/user/avatar`, {
  'Content-Type': 'multipart/form-data',
  'x-csrf-token': csrf,
}, [{
  name: 'avatar',
  filename,
  data: RNFetchBlob.wrap(path),
}]).then(res => res.json());
