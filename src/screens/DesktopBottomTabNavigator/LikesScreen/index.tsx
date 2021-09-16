import * as React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AnimatedFlatList,
    DefaultHeader,
    FullScreenLoader,
    UserCard,
} from '#components';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useComponentSize, useHideHeaderOnScroll } from '#hooks';
import { fetchLikes } from '#store/actions';
import {
    currentFrameSelector,
    currentFrameLikesSelector,
    currentFrameLikesStatusSelector,
} from '#store/selectors';

import { Container, Header } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.LikesNavigationProp;
};

const renderItem = ({
    item,
}: ListRenderItemInfo<Store.Models.Like & { user: Store.Models.User }>) => (
    <UserCard user={item.user} />
);

const LikesScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const currentFrame = useSelector(currentFrameSelector);
    const currentFrameLikes = useSelector(currentFrameLikesSelector);
    const currentFrameLikesStatus = useSelector(
        currentFrameLikesStatusSelector
    );

    const { onLayout, size } = useComponentSize();

    const { containerStyle, scrollHandler } = useHideHeaderOnScroll(
        GLOBAL_STYLE.HEADER_TAB_HEIGHT
    );

    const [firstFetchFinished, setFirstFetchFinished] =
        React.useState<boolean>(false);

    const paddingTop = React.useMemo(() => (size ? size.height : 0), [size]);

    React.useEffect(() => {
        if (currentFrame && currentFrameLikesStatus === 'PENDING') {
            setFirstFetchFinished(false);
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
    }, [currentFrameLikesStatus, firstFetchFinished]);
    React.useEffect(() => {
        if (!currentFrame) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrame, navigation]);
    React.useEffect(() => {
        if (
            (currentFrameLikesStatus === 'SUCCESS' ||
                currentFrameLikesStatus === 'ERROR') &&
            currentFrameLikes &&
            currentFrameLikes.length === 0
        ) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [currentFrameLikes, currentFrameLikesStatus, navigation]);

    return (
        <Container>
            <Header onLayout={onLayout} style={containerStyle}>
                <DefaultHeader title="likes" variant="secondary" />
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
                    renderItem={renderItem}
                    scrollEventThrottle={4}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <FullScreenLoader show={!firstFetchFinished} />
        </Container>
    );
};

export default LikesScreen;
