import * as React from 'react';

import { ListRenderItemInfo } from 'react-native';
import {
    AnimatedFlatList,
    BottomLoader,
    DefaultHeader,
    EmptyMessage,
    FrameCard,
    FullScreenLoader,
} from '#components';
import { useFetchFrames } from '#hooks';

import { Container } from './styles';

const renderItem = ({
    item,
}: ListRenderItemInfo<Store.Models.FramePopulated>) => (
    <FrameCard
        onPressComments={() => {}}
        onPressLikes={() => {}}
        frame={item}
    />
);

const HomeScreen = () => {
    const { fetching, fetchNextFrames, frames } = useFetchFrames();

    const keyExtractor = React.useCallback(
        (data: Store.Models.Frame) => data.id,
        []
    );

    return (
        <Container>
            <DefaultHeader />
            {frames && (
                <>
                    {frames.length > 0 ? (
                        <AnimatedFlatList
                            data={frames}
                            keyExtractor={keyExtractor}
                            maxToRenderPerBatch={10}
                            onEndReached={fetchNextFrames}
                            onEndReachedThreshold={0.2}
                            renderItem={renderItem}
                            scrollEventThrottle={4}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <EmptyMessage text="no frames" />
                    )}
                </>
            )}
            <FullScreenLoader show={!frames} />
            <BottomLoader show={fetching} bottom="huge" />
        </Container>
    );
};

export default HomeScreen;
