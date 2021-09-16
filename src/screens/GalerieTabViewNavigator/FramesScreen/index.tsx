import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AddButton,
    AnimatedFlatList,
    EmptyMessage,
    FrameCard,
    FullScreenLoader,
} from '#components';
import { GalerieTabbarScreenContainer } from '#components/Screen';
import { GLOBAL_STYLE } from '#helpers/constants';
import { fetchFrames, setCurrentFrameId } from '#store/actions';
import {
    currentGalerieFramesSelector,
    currentGalerieFramesStatusSelector,
} from '#store/selectors';

type Props = {
    galerie?: Store.Models.Galerie & { id: string };
    handleNavigateToCreateGalerieScreen: () => void;
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const FramesScreen = ({
    galerie,
    handleNavigateToCreateGalerieScreen,
    paddingTop,
    scrollHandler,
}: Props) => {
    const dispatch = useDispatch();
    const frames = useSelector(currentGalerieFramesSelector);
    const status = useSelector(currentGalerieFramesStatusSelector);
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const [isFirstFetch, setIsFirstFetch] = React.useState<boolean>(true);

    const onPressComments = React.useCallback(
        (id: string) => {
            dispatch(setCurrentFrameId(id));
            navigation.navigate('Comments');
        },
        [navigation]
    );
    const onPressLikes = React.useCallback(
        (id: string) => {
            dispatch(setCurrentFrameId(id));
            navigation.navigate('Likes');
        },
        [navigation]
    );

    React.useEffect(() => {
        if (galerie && status === 'PENDING') {
            setIsFirstFetch(true);
            dispatch(fetchFrames({ galerieId: galerie.id }));
        }
        if (status === 'SUCCESS' || status === 'ERROR') setIsFirstFetch(false);
    }, [galerie, status]);

    return (
        <>
            <GalerieTabbarScreenContainer>
                {!isFirstFetch && status !== 'PENDING' && (
                    <>
                        {frames && frames.length > 0 ? (
                            <AnimatedFlatList
                                contentContainerStyle={{
                                    paddingBottom:
                                        GLOBAL_STYLE.BOTTOM_TAB_HEIGHT,
                                    paddingTop,
                                }}
                                data={frames}
                                keyExtractor={(data) => data.id}
                                onScroll={scrollHandler}
                                renderItem={({ item }) => (
                                    <FrameCard
                                        frame={item}
                                        onPressComments={onPressComments}
                                        onPressLikes={onPressLikes}
                                    />
                                )}
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
                <FullScreenLoader show={isFirstFetch} />
            </GalerieTabbarScreenContainer>
        </>
    );
};

export default FramesScreen;
