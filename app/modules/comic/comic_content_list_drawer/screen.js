import React from 'react';
import { ComicList } from '@/comic/comic_detail';

function ComicContentListDrawerScreen(props) {
  return (
    <ComicList {...props} dark isReplace />
  );
}

export default ComicContentListDrawerScreen;
