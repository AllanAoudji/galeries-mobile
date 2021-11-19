import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BottomLoader, FullScreenLoader } from '#components';
import {
    getFrames,
    selectFramesAllIds,
    selectFramesStatus,
} from '#store/frames';

import Frames from './Frames';
import EmptyScrollView from './EmptyScrollView';

import { Container } from './styles';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const framesAllIds = useSelector(selectFramesAllIds);
    const framesStatus = useSelector(selectFramesStatus);

    const showBottomLoader = React.useMemo(
        () => framesStatus === 'LOADING',
        [framesStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () => framesStatus === 'PENDING' || framesStatus === 'INITIAL_LOADING',
        [framesStatus]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (framesStatus === 'PENDING') dispatch(getFrames());
        }, [framesStatus])
    );

    return (
        <Container>
            {framesAllIds.length > 0 ? (
                <Frames allIds={framesAllIds} />
            ) : (
                <EmptyScrollView />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </Container>
    );
};

export default HomeScreen;
