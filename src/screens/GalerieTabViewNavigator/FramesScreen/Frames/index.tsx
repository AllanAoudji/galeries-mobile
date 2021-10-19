import * as React from 'react';
import { useDispatch } from 'react-redux';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { AnimatedFlatList } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { getGalerieFrames } from '#store/frames';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
    galerie?: Store.Models.Galerie;
    paddingTop: number;
    scrollHandler: any;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Frames = ({ allIds, galerie, paddingTop, scrollHandler }: Props) => {
    const dispatch = useDispatch();

    const flatListRef = React.useRef<FlatList | null>(null);

    const keyExtractor = React.useCallback((item: string) => item, []);
    const handleEndReach = React.useCallback(() => {
        if (galerie) dispatch(getGalerieFrames(galerie.id));
    }, [galerie]);

    return (
        <AnimatedFlatList
            contentContainerStyle={{
                paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                paddingTop,
            }}
            data={allIds}
            extraData={allIds}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={4}
            onEndReached={handleEndReach}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            ref={flatListRef}
            removeClippedSubviews={true}
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default Frames;
