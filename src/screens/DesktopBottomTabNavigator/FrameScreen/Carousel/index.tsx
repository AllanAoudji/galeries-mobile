import * as React from 'react';
import {
    ListRenderItem,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import {
    runOnJS,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';

import { AnimatedFlatList } from '#components';

import CurrentIndex from './CurrentIndex';
import RenderItem from './RenderItem';
import RenderBackgroundItem from './RenderBackgroundItem';
import { Container } from './styles';

type Props = {
    allIds: string[];
    onPress: () => void;
};

const keyExtractor: ((item: string, index: number) => string) | undefined = (
    item
) => item;

const Carousel = ({ allIds, onPress }: Props) => {
    const dimension = useWindowDimensions();
    const current = useSharedValue(0);

    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    const handleScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            const index = Math.round(e.contentOffset.x / dimension.width);
            if (index !== currentIndex) runOnJS(setCurrentIndex)(index);
            current.value = e.contentOffset.x;
        },
    });

    const renderItem: ListRenderItem<string> | null | undefined =
        React.useCallback(({ item }) => {
            return <RenderItem item={item} onPress={onPress} />;
        }, []);

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
