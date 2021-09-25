import * as React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AnimatedFlatList,
    BottomLoader,
    DefaultHeader,
    EmptyMessage,
    FullScreenLoader,
    UserCard,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';

import { Container, Header } from './styles';
import { selectCurrentFrame } from '#store/frames';
import {
    getLikeId,
    selectCurrentFrameLikes,
    selectCurrentFrameLikesStatus,
} from '#store/likes';

type Props = {
    navigation: Screen.DesktopBottomTab.LikesNavigationProp;
};

const renderItem = ({
    item,
}: ListRenderItemInfo<Store.Models.LikePopulated>) => (
    <UserCard user={item.user} />
);

const LikesScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const currentFrame = useSelector(selectCurrentFrame);
    const currentFrameLikes = useSelector(selectCurrentFrameLikes);
    const currentFrameLikesStatus = useSelector(selectCurrentFrameLikesStatus);

    const { onLayout, size } = useComponentSize();

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const paddingTop = React.useMemo(() => (size ? size.height : 0), [size]);

    const handleEndReach = React.useCallback(() => {
        if (
            currentFrame &&
            (currentFrameLikesStatus === 'ERROR' ||
                currentFrameLikesStatus === 'SUCCESS')
        )
            dispatch(getLikeId(currentFrame.id));
    }, [currentFrameLikesStatus, currentFrame]);
    const keyExtractor = React.useCallback(
        (data: Store.Models.Like) => data.id,
        []
    );

    React.useEffect(() => {
        if (!currentFrame) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrame, navigation]);

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
                <DefaultHeader title="likes" variant="secondary" />
            </Header>
            {currentFrameLikes &&
                paddingTop &&
                (currentFrameLikes.length > 0 ? (
                    <AnimatedFlatList
                        contentContainerStyle={{
                            paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                            paddingTop,
                        }}
                        data={currentFrameLikes}
                        keyExtractor={keyExtractor}
                        maxToRenderPerBatch={4}
                        onEndReached={handleEndReach}
                        onEndReachedThreshold={0.2}
                        onScroll={scrollHandler}
                        removeClippedSubviews={true}
                        renderItem={renderItem}
                        scrollEventThrottle={4}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <EmptyMessage
                        pt={paddingTop}
                        text="This frame doesn't have likes."
                    />
                ))}
            <FullScreenLoader
                show={
                    currentFrameLikesStatus === 'INITIAL_LOADING' ||
                    currentFrameLikesStatus === 'PENDING'
                }
            />
            <BottomLoader
                show={currentFrameLikesStatus === 'LOADING'}
                bottom="huge"
            />
        </Container>
    );
};

export default LikesScreen;
