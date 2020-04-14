import React from 'react';
import { View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { brand_primary } from 'theme';
import ComicDetailTop from '../comic_detail_top';
import ComicDetailBtns from '../comic_detail_btns';
import ComicDetailTabs from '../comic_detail_tabs';
import DetailHeader from '../detail_header';
import DetailBackButton from '../detail_back_button';
import DetailRightButton from '../detail_right_button';

export default function ParallaxComponent(props) {
  return (
    <ParallaxScrollView
      backgroundColor={brand_primary}
      contentBackgroundColor="#f1f2f6"
      parallaxHeaderHeight={240}
      renderStickyHeader={() => <DetailHeader />}
      renderFixedHeader={() => [<DetailBackButton key="left" />, <DetailRightButton key="right" />]}
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
