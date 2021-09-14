import * as React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    AddButton,
    AnimatedFlatList,
    FrameCard,
    FullScreenLoader,
    Typography,
} from '#components';
import { GalerieTabbarScreenContainer } from '#components/Screen';
import { GLOBAL_STYLE } from '#helpers/constants';
import { fetchFrames } from '#store/actions';
import {
    currentGalerieFramesSelector,
    currentGalerieFramesStatusSelector,
} from '#store/selectors';

import { TextContainer } from './styles';

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

    const [isFirstFetch, setIsFirstFetch] = React.useState<boolean>(true);

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
                                    <FrameCard frame={item} />
                                )}
                                scrollEventThrottle={4}
                                showsVerticalScrollIndicator={false}
                            />
                        ) : (
                            <TextContainer paddingTop={paddingTop}>
                                <Typography
                                    color="primary"
                                    fontSize={14}
                                    fontFamily="light"
                                    textAlign="center"
                                >
                                    This galerie doesn't have frame yet. Click
                                    on the + button to post a new one
                                </Typography>
                            </TextContainer>
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
