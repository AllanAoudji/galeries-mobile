import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    BottomLoader,
    DefaultHeader,
    EmptyMessage,
    FullScreenLoader,
} from '#components';

import { Container, Header } from './styles';
import { getFrames, selectFrames, selectFramesStatus } from '#store/frames';

import Frames from './Frames';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { GLOBAL_STYLE } from '#helpers/constants';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const frames = useSelector(selectFrames);
    const framesStatus = useSelector(selectFramesStatus);

    const { onLayout, size } = useComponentSize();
    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const hasFrames = React.useMemo(() => frames.length > 0, [frames]);
    const paddingTop = React.useMemo(() => (size ? size.height : 0), [size]);
    const showBottomLoader = React.useMemo(
        () => framesStatus === 'LOADING',
        [framesStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () => framesStatus === 'PENDING' || framesStatus === 'INITIAL_LOADING',
        [framesStatus]
    );

    React.useEffect(() => {
        if (framesStatus === 'PENDING') dispatch(getFrames());
    }, [framesStatus]);

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
                <DefaultHeader />
            </Header>
            {hasFrames && !!paddingTop ? (
                <Frames
                    frames={frames}
                    paddingTop={paddingTop}
                    scrollHandler={scrollHandler}
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
