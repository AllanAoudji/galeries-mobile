import * as React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AddButton, AnimatedFlatList, FrameModal } from '#components';
import { GalerieTabbarScreenContainer } from '#components/Screen';
import { fetchFrames } from '#store/actions';
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

    console.log(frames);

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
                        <AnimatedFlatList
                            contentContainerStyle={{ paddingTop }}
                            data={frames}
                            keyExtractor={(data) => data.id}
                            onScroll={scrollHandler}
                            renderItem={({ item }) => (
                                <FrameModal frame={item} />
                            )}
                            scrollEventThrottle={4}
                            showsVerticalScrollIndicator={false}
                        />
                        <AddButton
                            bottom="smallest"
                            right="normal"
                            onPress={handleNavigateToCreateGalerieScreen}
                        />
                    </>
                )}
            </GalerieTabbarScreenContainer>
        </>
    );
};

export default FramesScreen;
