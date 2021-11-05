import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { BottomLoader, DefaultHeader, FullScreenLoader } from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useHideHeaderOnScroll } from '#hooks';
import {
    getFrames,
    selectFramesAllIds,
    selectFramesStatus,
} from '#store/frames';

import Frames from './Frames';
import EmptyScrollView from './EmptyScrollView';

import { Container, Header } from './styles';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const dimension = useWindowDimensions();

    const framesAllIds = useSelector(selectFramesAllIds);
    const framesStatus = useSelector(selectFramesStatus);

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

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
            <Header style={containerStyle} width={dimension.width}>
                <DefaultHeader />
            </Header>
            {framesAllIds.length > 0 ? (
                <Frames allIds={framesAllIds} scrollHandler={scrollHandler} />
            ) : (
                <EmptyScrollView scrollHandler={scrollHandler} />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </Container>
    );
};

export default HomeScreen;
