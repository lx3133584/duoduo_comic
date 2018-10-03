import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { addDownload, fetchDownloadContent, downloadComicImg } from '@/favorites/download_select/actions';

const addEpic = action$ => action$.pipe(
  ofType(addDownload),
  mergeMap(({ payload }) => of(
    ...payload.selectList.toArray().map(
      item => fetchDownloadContent({ comic_id: payload.detail.get('id'), id: item.id }),
    ),
  )),
);
const fetchContentEpic = action$ => action$.pipe(
  ofType(`${fetchDownloadContent}_FULFILLED`),
  mergeMap(({ payload }) => of(
    ...payload.result.data.map(
      item => downloadComicImg({
        comic_id: payload.comic_id, chapter_id: payload.id, index: item.index, url: item.url,
      }),
    ),
  )),
);

export default combineEpics(
  addEpic,
  fetchContentEpic,
);
