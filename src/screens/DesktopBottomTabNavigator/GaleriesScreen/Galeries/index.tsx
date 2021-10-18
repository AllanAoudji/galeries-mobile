import * as React from 'react';
import {
    Keyboard,
    ListRenderItemInfo,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AnimatedFlatList } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { getGaleries, selectGaleriesNameStatus } from '#store/galeries';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
    paddingTop: number;
    scrollHandler: any;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Galeries = ({ allIds, paddingTop, scrollHandler }: Props) => {
    const dispatch = useDispatch();

    const galeriesNameStatus = useSelector(selectGaleriesNameStatus);

    const styleProps = React.useMemo(
        () => ({
            paddingTop,
        }),
        [paddingTop]
    );

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: GLOBAL_STYLE.GALERIE_MODAL_HEIGHT,
            offset: GLOBAL_STYLE.GALERIE_MODAL_HEIGHT * index,
            index,
        }),
        []
    );
    const handleEndReached = React.useCallback(() => {
        if (galeriesNameStatus === 'ERROR' || galeriesNameStatus === 'SUCCESS')
            dispatch(getGaleries());
    }, [galeriesNameStatus]);
    const handleScrollBeginDrag = React.useCallback(
        () => Keyboard.dismiss(),
        []
    );
    const keyExtractor = React.useCallback((item: string) => item, []);

    return (
        <AnimatedFlatList
            contentContainerStyle={
                style(styleProps).animatedFlatListContentContainerStyle
            }
            data={allIds}
            extraData={allIds}
            getItemLayout={getItemLayout}
            keyExtractor={keyExtractor}
            initialNumToRender={5}
            keyboardShouldPersistTaps="handled"
            maxToRenderPerBatch={4}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.2}
            onScroll={scrollHandler}
            onScrollBeginDrag={handleScrollBeginDrag}
            removeClippedSubviews={true}
            renderItem={renderItem}
            scrollEventThrottle={4}
            showsVerticalScrollIndicator={false}
            updateCellsBatchingPeriod={1}
            windowSize={41}
        />
    );
};

const style: ({ paddingTop }: { paddingTop: number }) => {
    animatedFlatListContentContainerStyle: StyleProp<ViewStyle>;
} = StyleSheet.create(({ paddingTop }) => ({
    animatedFlatListContentContainerStyle: {
        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT + 15,
        paddingTop: paddingTop + 30,
    },
}));

export default Galeries;
