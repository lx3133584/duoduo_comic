import React from 'react';
import { View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { brand_primary } from 'theme';
import {
  ComicDetailTop, ComicDetailBtns, ComicDetailTabs, DetailHeader, DetailBackButton,
} from '@/comic/comic_detail';

export default function ParallaxComponent(props) {
  return (
    <ParallaxScrollView
      backgroundColor={brand_primary}
      contentBackgroundColor="#f1f2f6"
      parallaxHeaderHeight={240}
      renderStickyHeader={() => <DetailHeader />}
      renderFixedHeader={() => <DetailBackButton />}
      stickyHeaderHeight={70}
      useNativeDriver
      renderForeground={() => (
        <ComicDetailTop {...props} />
      )}
    >
      <View>
        <ComicDetailBtns />
        <ComicDetailTabs {...props} />
      </View>
    </ParallaxScrollView>
  );
}
