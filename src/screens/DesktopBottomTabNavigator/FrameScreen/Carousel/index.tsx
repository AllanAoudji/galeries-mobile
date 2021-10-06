import * as React from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';

import { AnimatedFlatList } from '#components';

import RenderItem from './RenderItem';
import RenderBackgroundItem from './RenderBackgroundItem';
import { Container } from './styles';

type Props = {
    allIds: string[];
};

const keyExtractor: ((item: string, index: number) => string) | undefined = (
    item
) => item;
const renderItem: ListRenderItem<string> | null | undefined = ({ item }) => {
    return <RenderItem item={item} />;
};

const Carousel = ({ allIds }: Props) => {
    const current = useSharedValue(0);

    const handleScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            current.value = e.contentOffset.x;
        },
    });

    return (
        <Container>
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
                extraData={allIds}
                horizontal
                keyExtractor={keyExtractor}
                onScroll={handleScroll}
                pagingEnabled
                renderItem={renderItem}
            />
        </Container>
    );
};

export default Carousel;
