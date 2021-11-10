import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';

import CurrentIndex from './CurrentIndex';
import RenderBackgroundItem from './RenderBackgroundItem';
import RenderItem from './RenderItem';

import { Container } from './styles';

type Props = {
    allIds: string[];
    frame: Store.Models.Frame;
    currentIndex: number;
    onPress: () => void;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const keyExtractor: ((item: string, index: number) => string) | undefined = (
    item
) => item;

const Carousel = ({
    allIds,
    frame,
    currentIndex,
    onPress,
    setCurrentIndex,
}: Props) => {
    const dimension = useWindowDimensions();

    const ref = React.useRef<FlatList | null>(null);

    const current = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            const index = Math.round(e.contentOffset.x / dimension.width);
            if (index !== currentIndex) runOnJS(setCurrentIndex)(index);
            current.value = e.contentOffset.x;
        },
    });

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: dimension.width,
            offset: dimension.width * index,
            index,
        }),
        []
    );
    const renderItem: ListRenderItem<string> | null | undefined =
        React.useCallback(
            ({ item }) => {
                return (
                    <RenderItem frame={frame} item={item} onPress={onPress} />
                );
            },
            [frame]
        );

    useFocusEffect(
        React.useCallback(
            () => () => {
                current.value = 0;
                if (ref.current) ref.current.scrollToIndex({ index: 0 });
            },
            []
        )
    );

    return (
        <Container>
            <CurrentIndex current={currentIndex} numOfImages={allIds.length} />
            <View style={StyleSheet.absoluteFillObject}>
                {allIds.map((item, index) => (
                    <RenderBackgroundItem
                        index={index}
                        current={current}
                        item={item}
                        key={item}
                    />
                ))}
            </View>
            <AnimatedFlatList
                data={allIds}
                decelerationRate="fast"
                disableIntervalMomentum
                extraData={allIds}
                getItemLayout={getItemLayout}
                horizontal
                initialNumToRender={1}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={1}
                onScroll={handleScroll}
                overScrollMode="never"
                pagingEnabled
                ref={ref}
                removeClippedSubviews
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                snapToInterval={dimension.width}
                windowSize={3}
            />
        </Container>
    );
};

export default React.memo(Carousel);
