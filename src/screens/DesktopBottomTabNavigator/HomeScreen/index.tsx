import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    DefaultHeader,
    EmptyMessage,
    FullScreenLoader,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import {
    getFrames,
    selectFramesAllIds,
    selectFramesStatus,
} from '#store/frames';

import Frames from './Frames';

import { Container, Header } from './styles';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const dimension = useWindowDimensions();

    const framesAllIds = useSelector(selectFramesAllIds);
    const framesStatus = useSelector(selectFramesStatus);

    const { onLayout, size } = useComponentSize();
    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const paddingTop = React.useMemo(() => (size ? size.height : 0), [size]);
    const showBottomLoader = React.useMemo(
        () => framesStatus === 'LOADING',
        [framesStatus]
    );
    const showFrames = React.useMemo(
        () => framesAllIds.length > 0 && !!paddingTop,
        [framesAllIds, paddingTop]
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
            <Header
                onLayout={onLayout}
                style={containerStyle}
                width={dimension.width}
            >
                <DefaultHeader />
            </Header>
            {showFrames ? (
                <Frames
                    allIds={framesAllIds}
                    paddingTop={paddingTop}
                    scrollHandler={scrollHandler}
                />
            ) : (
                <EmptyMessage pt={paddingTop} text="no frames" />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </Container>
    );
};

export default HomeScreen;
