import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AddButton,
    AnimatedFlatList,
    BottomLoader,
    EmptyMessage,
    FrameCard,
    FullScreenLoader,
} from '#components';
import { GalerieTabbarScreenContainer } from '#components/Screen';
import { GLOBAL_STYLE } from '#helpers/constants';
import {
    getGalerieFrames,
    selectCurrentGalerieFrame,
    selectCurrentGalerieFrameStatus,
    updateFramesCurrent,
} from '#store/frames';
import { selectCurrentGalerie } from '#store/galeries';

type Props = {
    handleNavigateToCreateGalerieScreen: () => void;
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const FramesScreen = ({
    handleNavigateToCreateGalerieScreen,
    paddingTop,
    scrollHandler,
}: Props) => {
    const dispatch = useDispatch();

    const currentGalerie = useSelector(selectCurrentGalerie);
    const currentGalerieFrames = useSelector(selectCurrentGalerieFrame);
    const currentGalerieFramesStatus = useSelector(
        selectCurrentGalerieFrameStatus
    );

    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const handleEndReach = React.useCallback(() => {
        if (
            currentGalerie &&
            (currentGalerieFramesStatus === 'ERROR' ||
                currentGalerieFramesStatus === 'SUCCESS')
        )
            dispatch(getGalerieFrames(currentGalerie.id));
    }, [currentGalerie, currentGalerieFramesStatus]);
    const keyExtractor = React.useCallback(
        (data: Store.Models.Frame) => data.id,
        []
    );
    const onPressComments = React.useCallback(
        (id: string) => {
            dispatch(updateFramesCurrent(id));
            navigation.navigate('Comments');
        },
        [navigation]
    );
    const onPressLikes = React.useCallback(
        (id: string) => {
            dispatch(updateFramesCurrent(id));
            navigation.navigate('Likes');
        },
        [navigation]
    );
    const renderItem = React.useCallback(
        ({ item }: ListRenderItemInfo<Store.Models.Frame>) => (
            <FrameCard
                frame={item}
                onPressComments={onPressComments}
                onPressLikes={onPressLikes}
            />
        ),
        []
    );

    return (
        <GalerieTabbarScreenContainer>
            {currentGalerieFrames && !!paddingTop && (
                <>
                    {currentGalerieFrames.length > 0 ? (
                        <AnimatedFlatList
                            contentContainerStyle={{
                                paddingBottom: GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                                paddingTop,
                            }}
                            data={currentGalerieFrames}
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
                            text="This galerie doesn't have frame yet. Click on the + button to post a new one"
                        />
                    )}
                    <AddButton
                        bottom="largest"
                        right="normal"
                        onPress={handleNavigateToCreateGalerieScreen}
                    />
                </>
            )}
            <FullScreenLoader
                show={
                    currentGalerieFramesStatus === 'PENDING' ||
                    currentGalerieFramesStatus === 'INITIAL_LOADING'
                }
            />
            <BottomLoader
                show={currentGalerieFramesStatus === 'LOADING'}
                bottom="huge"
            />
        </GalerieTabbarScreenContainer>
    );
};

export default FramesScreen;
