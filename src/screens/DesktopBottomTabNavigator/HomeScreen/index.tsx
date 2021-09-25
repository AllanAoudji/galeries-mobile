import * as React from 'react';

import { ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    AnimatedFlatList,
    BottomLoader,
    DefaultHeader,
    EmptyMessage,
    FrameCard,
    FullScreenLoader,
} from '#components';

import { Container } from './styles';
import { getFrames, selectFrames, selectFramesStatus } from '#store/frames';

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
    const dispatch = useDispatch();
    const frames = useSelector(selectFrames);
    const framesStatus = useSelector(selectFramesStatus);

    const handleEndReach = React.useCallback(() => {
        if (framesStatus === 'ERROR' || framesStatus === 'SUCCESS')
            dispatch(getFrames());
    }, [framesStatus]);
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
                            onEndReached={handleEndReach}
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
            <FullScreenLoader
                show={
                    framesStatus === 'PENDING' ||
                    framesStatus === 'INITIAL_LOADING'
                }
            />
            <BottomLoader show={framesStatus === 'LOADING'} bottom="huge" />
        </Container>
    );
};

export default HomeScreen;
