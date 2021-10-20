import * as React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    useWindowDimensions,
} from 'react-native';
import { useAnimatedScrollHandler } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

import { AnimatedFlatList } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { getGalerieUsers } from '#store/users';

import RenderItem from './RenderItem';

type Props = {
    allIds: string[];
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    maxScroll: number;
    paddingTop: number;
};

const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <RenderItem item={item} />
);

const Users = ({
    allIds,
    current,
    editScrollY,
    galerie,
    maxScroll,
    paddingTop,
}: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();

    const flatListRef = React.useRef<FlatList | null>(null);

    const handleEndReach = React.useCallback(() => {
        if (galerie) dispatch(getGalerieUsers(galerie.id));
    }, [galerie]);

    const keyExtractor = React.useCallback((item: string) => item, []);

    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: (e) => {
                if (current) editScrollY(e.contentOffset.y);
            },
        },
        [editScrollY, current]
    );

    return (
        <AnimatedFlatList
            contentContainerStyle={{
                minHeight: dimension.height + maxScroll,
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

export default React.memo(Users);
