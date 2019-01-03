import {
  of, from, interval, Observable,
} from 'rxjs';
import {
  mergeMap, delayWhen, map, filter,
  groupBy, combineLatest, sampleTime, scan,
  zip,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { InteractionManager, NetInfo } from 'react-native';
import Immutable from 'immutable';
import { addDownload, fetchDownloadContent, downloadComicImg } from '@/favorites/download_select/actions';
import {
  removeDownloadComic, removeDownloadComicFulfilled,
  removeDownloadContent, removeDownloadContentFulfilled,
  removeDownloadImg,
} from '@/favorites/favorites_list/actions';
import { saveContentIndex, saveHistory } from '@/comic/comic_content/actions';

const netObservable$ = Observable.create((observer) => {
  NetInfo.isConnected.fetch().then(v => observer.next(v));
  NetInfo.isConnected.addEventListener('connectionChange', v => observer.next(v));
});
const timeObservable$ = interval(1000);

const addDownloadEpic = action$ => action$.pipe(
  ofType(addDownload),
  mergeMap(({ payload }) => of(
    ...payload.selectedList.map(
      ({ id }) => fetchDownloadContent({ comic_id: payload.detail.get('id'), id }),
    ),
  )),
  zip(timeObservable$),
  map(payload => payload[0]),
);
const fetchContentEpic = action$ => action$.pipe(
  ofType(`${fetchDownloadContent}_FULFILLED`),
  delayWhen(() => from(InteractionManager.runAfterInteractions())),
  mergeMap(({ payload }) => of(
    ...payload.result.data.map(
      ({ index, url }) => downloadComicImg({
        comic_id: payload.comic_id, chapter_id: payload.id, index, url,
      }),
    ),
  )),
  zip(timeObservable$),
  map(payload => payload[0]),
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
    ).pipe(
      delayWhen(() => from(InteractionManager.runAfterInteractions())),
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
    ).pipe(
      delayWhen(() => from(InteractionManager.runAfterInteractions())),
    );
  }),
);
const postHistoryEpic = (action$, store) => action$.pipe(
  ofType(saveContentIndex),
  map(({ payload }) => {
    const state = store.value;
    const comic_id = state.comic.getIn(['detail', 'id']);
    const chapter_id = state.comic.getIn(['detail', 'chapter_id']);
    return {
      index: payload,
      comic_id,
      chapter_id,
    };
  }),
  delayWhen(() => from(InteractionManager.runAfterInteractions())),
  groupBy(data => data.comic_id),
  mergeMap(group$ => group$.pipe(
    sampleTime(2000),
  )),
  combineLatest(netObservable$),
  scan(([queue], [data, isConnected]) => {
    let newQueue;
    const index = queue.findIndex(item => item.comic_id === data.comic_id);
    if (!~index) newQueue = queue.push(data);
    else newQueue = queue.set(index, data);
    if (!isConnected) return [newQueue];
    return [newQueue.clear(), newQueue];
  }, [Immutable.List(), null]), // 第一个为任务队列(pending)，第二个参数为准备处理的任务(doing)
  map(payload => payload[1]),
  filter(payload => !!payload),
  mergeMap(tasks => tasks.map(task => saveHistory(task))),
);


export default combineEpics(
  addDownloadEpic,
  fetchContentEpic,
  removeComicEpic,
  removeContentEpic,
  postHistoryEpic,
);
