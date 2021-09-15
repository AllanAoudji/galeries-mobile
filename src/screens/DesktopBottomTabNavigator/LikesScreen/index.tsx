import * as React from 'react';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { fetchLikes } from '#store/actions';
import {
    currentFrameSelector,
    currentFrameLikesSelector,
    currentFrameLikesStatusSelector,
} from '#store/selectors';
import {
    AnimatedFlatList,
    DefaultHeader,
    FullScreenLoader,
    UserCard,
} from '#components';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const Header = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    position: absolute;
    width: 100%;
    z-index: 10;
`;

const LikesScreen = () => {
    const { onLayout, size } = useComponentSize();
    const { containerStyle, headerStyle, scrollHandler } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT);

    const dispatch = useDispatch();
    const currentFrame = useSelector(currentFrameSelector);
    const currentFrameLikes = useSelector(currentFrameLikesSelector);
    const currentFrameLikesStatus = useSelector(
        currentFrameLikesStatusSelector
    );

    const [firstFetchFinished, setFirstFetchFinished] =
        React.useState<boolean>(false);

    const paddingTop = React.useMemo(() => (size ? size.height : 0), [size]);

    React.useEffect(() => {
        if (currentFrame && currentFrameLikesStatus === 'PENDING') {
            dispatch(fetchLikes({ frameId: currentFrame.id }));
        }
    }, [currentFrame, currentFrameLikesStatus]);
    React.useEffect(() => {
        if (
            (currentFrameLikesStatus === 'SUCCESS' ||
                currentFrameLikesStatus === 'ERROR') &&
            !firstFetchFinished
        ) {
            setFirstFetchFinished(true);
        }
    }, [currentFrameLikesStatus]);

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
                <DefaultHeader
                    style={headerStyle}
                    title="likes"
                    variant="secondary"
                />
            </Header>
            {firstFetchFinished && (
                <AnimatedFlatList
                    contentContainerStyle={{
                        paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                        paddingTop,
                    }}
                    data={currentFrameLikes}
                    keyExtractor={(like) => like.id}
                    keyboardShouldPersistTaps="handled"
                    maxToRenderPerBatch={6}
                    onEndReachedThreshold={0.2}
                    onScroll={scrollHandler}
                    removeClippedSubviews={true}
                    renderItem={({ item }) => <UserCard user={item.user} />}
                    scrollEventThrottle={4}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <FullScreenLoader show={!firstFetchFinished} />
        </Container>
    );
};

export default LikesScreen;
