import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { addDownload, fetchDownloadContent, downloadComicImg } from '@/favorites/download_select/actions';
import {
  removeDownloadComic, removeDownloadComicFulfilled,
  removeDownloadContent, removeDownloadContentFulfilled,
  removeDownloadImg,
} from '@/favorites/favorites_list/actions';

const addEpic = action$ => action$.pipe(
  ofType(addDownload),
  mergeMap(({ payload }) => of(
    ...payload.selectList.map(
      ({ id }) => fetchDownloadContent({ comic_id: payload.detail.get('id'), id }),
    ),
  )),
);
const fetchContentEpic = action$ => action$.pipe(
  ofType(`${fetchDownloadContent}_FULFILLED`),
  mergeMap(({ payload }) => of(
    ...payload.result.data.map(
      ({ index, url }) => downloadComicImg({
        comic_id: payload.comic_id, chapter_id: payload.id, index, url,
      }),
    ),
  )),
);
const removeComicEpic = (action$, store) => action$.pipe(
  ofType(removeDownloadComic),
  mergeMap(({ payload }) => {
    const state = store.value;
    const comic = state.favorites.get('download_list').find(item => item.get('id') === payload);
    const listMap = comic.get('listMap');
    return of(
      removeDownloadComicFulfilled(payload),
      ...listMap.toList().flatMap(
        item => item.get('contentMap').toList(),
      ).map(item => removeDownloadImg(item.get('path'))),
    );
  }),
);
const removeContentEpic = (action$, store) => action$.pipe(
  ofType(removeDownloadContent),
  mergeMap(({ payload }) => {
    const state = store.value;
    const comic = state.favorites.get('download_list').find(item => item.get('id') === payload.comic_id);
    const contentMap = comic.getIn(['listMap', payload.id, 'contentMap']);
    return of(
      removeDownloadContentFulfilled(payload),
      ...contentMap.toList().map(item => removeDownloadImg(item.get('path'))),
    );
  }),
);

export default combineEpics(
  addEpic,
  fetchContentEpic,
  removeComicEpic,
  removeContentEpic,
);
