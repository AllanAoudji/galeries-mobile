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

    const hasFrames = React.useMemo(() => frames.length > 0, [frames]);
    const showBottomLoader = React.useMemo(
        () => framesStatus === 'LOADING',
        [framesStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () => framesStatus === 'PENDING' || framesStatus === 'INITIAL_LOADING',
        [framesStatus]
    );

    const handleEndReach = React.useCallback(() => dispatch(getFrames()), []);
    const keyExtractor = React.useCallback(
        (data: Store.Models.Frame) => data.id,
        []
    );

    React.useEffect(() => {
        if (framesStatus === 'PENDING') dispatch(getFrames());
    }, [framesStatus]);

    return (
        <Container>
            <DefaultHeader />
            {hasFrames ? (
                <AnimatedFlatList
                    data={frames}
                    keyExtractor={keyExtractor}
                    onEndReached={handleEndReach}
                    onEndReachedThreshold={0}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <EmptyMessage text="no frames" />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </Container>
    );
};

export default HomeScreen;
