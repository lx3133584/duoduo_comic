import {
  of, from, interval, Observable, GroupedObservable,
} from 'rxjs';
import {
  mergeMap, delayWhen, map, filter,
  groupBy, combineLatest, sampleTime, scan,
  zip,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { InteractionManager } from 'react-native';
import Immutable from 'immutable';
import NetInfo from '@react-native-community/netinfo';
import { addDownload, fetchDownloadContent, downloadComicImg } from '@/favorites/download_select/actions';
import {
  removeDownloadComic, removeDownloadComicFulfilled,
  removeDownloadContent, removeDownloadContentFulfilled,
  removeDownloadImg,
} from '@/favorites/favorites_list/actions';
import { saveContentIndex, saveHistory } from '@/comic/comic_content/actions';
import { RootState } from './reducer';

const netObservable$ = Observable.create((observer) => {
  NetInfo.fetch().then((v) => observer.next(v.isConnected));
  NetInfo.addEventListener((v) => observer.next(v.isConnected));
});
const timeObservable$ = interval(1000);

const addDownloadEpic = (action$) => action$.pipe(
  ofType(addDownload),
  mergeMap(({ payload }) => of(
    ...payload.selectedList.map(
      ({ id }) => fetchDownloadContent({ comic_id: payload.detail.get('id'), id }),
    ),
  )),
  zip(timeObservable$),
  map((payload) => payload[0]),
);
const fetchContentEpic = (action$) => action$.pipe(
  ofType(`${fetchDownloadContent}_FULFILLED`),
  delayWhen(() => from(InteractionManager.runAfterInteractions() as any)),
  mergeMap(({ payload }) => of(
    ...payload.result.data.map(
      ({ index, url }) => downloadComicImg({
        comic_id: payload.comic_id, chapter_id: payload.id, index, url,
      }),
    ),
  )),
  zip(timeObservable$),
  map((payload) => payload[0]),
);
const removeComicEpic = (action$, store: { value: RootState }) => action$.pipe(
  ofType(removeDownloadComic),
  mergeMap(({ payload }) => {
    const state = store.value;
    const comic = state.favorites.get('download_list').find((item) => item.get('id') === payload);
    const listMap = (comic.get('listMap') as any) as Immutable.Map<any, any>;
    return of(
      removeDownloadComicFulfilled(payload),
      ...listMap.toList().flatMap<any>(
        (item) => item.get('contentMap').toList(),
      ).map((item) => removeDownloadImg(item.get('path'))),
    ).pipe(
      delayWhen(() => from(InteractionManager.runAfterInteractions() as any),
    ));
  }),
);
const removeContentEpic = (action$, store: { value: RootState }) => action$.pipe(
  ofType(removeDownloadContent),
  mergeMap(({ payload }) => {
    const state = store.value;
    const comic = state.favorites.get('download_list').find((item) => item.get('id') === payload.comic_id);
    const contentMap = comic.getIn(['listMap', payload.id, 'contentMap']);
    return of(
      removeDownloadContentFulfilled(payload),
      ...contentMap.toList().map((item) => removeDownloadImg(item.get('path'))),
    ).pipe(
      delayWhen(() => from(InteractionManager.runAfterInteractions() as any),
    ));
  }),
);
interface IDS {
  index: number;
  comic_id: number;
  chapter_id: number;
}
const postHistoryEpic = (action$, store: { value: RootState }) => action$.pipe(
  ofType(saveContentIndex),
  map<any, IDS>(({ payload }) => {
    const state = store.value;
    const comic_id = state.comic.getIn(['detail', 'id']);
    const chapter_id = state.comic.getIn(['detail', 'chapter_id']);
    return {
      index: payload,
      comic_id,
      chapter_id,
    };
  }),
  delayWhen(() => from(InteractionManager.runAfterInteractions() as any)),
  groupBy<IDS, any>((data) => data.comic_id),
  mergeMap<GroupedObservable<any, any>, any>((group$) => group$.pipe(
    sampleTime(5000),
  )),
  combineLatest(netObservable$),
  scan(([queue], [data, isConnected]) => {
    let newQueue;
    const index = queue!.findIndex((item) => item.comic_id === data.comic_id);
    if (!~index) newQueue = queue!.push(data);
    else newQueue = queue!.set(index, data);
    if (!isConnected) return [newQueue];
    return [newQueue.clear(), newQueue];
  }, [Immutable.List<IDS>(), null]), // 第一个为任务队列(pending)，第二个参数为准备处理的任务(doing)
  map((payload) => payload[1]),
  filter((payload) => !!payload),
  mergeMap<Immutable.List<any>, any>((tasks) => tasks.map((task) => saveHistory(task))),
);

export default combineEpics<any>(
  addDownloadEpic,
  fetchContentEpic,
  removeComicEpic,
  removeContentEpic,
  postHistoryEpic,
);
