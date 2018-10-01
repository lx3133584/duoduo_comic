import { createActions } from 'redux-actions';
import { fetchContentList, downloadImage } from 'api';

export const { addDownload, fetchDownloadContent, downloadComicImg } = createActions({
  ADD_DOWNLOAD: ({ detail, list }) => ({ detail, list }),
  FETCH_DOWNLOAD_CONTENT: ({ comic_id, id }) => {
    const promise = fetchContentList({ id, all: true, no_size: true }).then(result => ({ result, comic_id, id }));
    return { promise, data: { comic_id, id } };
  },
  DOWNLOAD_COMIC_IMG: ({
    comic_id, chapter_id, index, url,
  }) => {
    const promise = downloadImage(url).then(result => ({
      result, comic_id, chapter_id, index,
    }));
    return { promise, data: { comic_id, chapter_id, index } };
  },
});
