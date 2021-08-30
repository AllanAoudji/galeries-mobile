import * as React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import { AddButton, AnimatedFlatList, FullScreenLoader } from '#components';
import { GalerieTabbarScreenContainer } from '#components/Screen';
import { fetchFrames } from '#store/actions';
import {
    currentGalerieFramesSelector,
    currentGalerieFramesStatusSelector,
} from '#store/selectors';

type Props = {
    galerie?: Store.Models.Galerie & { id: string };
    handleOpenModal?: () => void;
    paddingTop: number;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const MockFrame = styled.View`
    margin-top: ${({ theme }) => theme.spacings.small};
    background-color: ${({ theme }) => theme.colors.tertiary};
    height: 400px;
    width: 100%;
`;

const FramesScreen = ({
    galerie,
    handleOpenModal,
    paddingTop,
    scrollHandler,
}: Props) => {
    const dispatch = useDispatch();
    const frames = useSelector(currentGalerieFramesSelector);
    const status = useSelector(currentGalerieFramesStatusSelector);

    const [isFirstFetch, setIsFirstFetch] = React.useState<boolean>(true);

    const handlePress = React.useCallback(() => {
        if (handleOpenModal) handleOpenModal();
    }, [handleOpenModal]);

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
                            renderItem={() => <MockFrame />}
                            scrollEventThrottle={4}
                            showsVerticalScrollIndicator={false}
                        />
                        <AddButton
                            bottom="normal"
                            right="normal"
                            onPress={handlePress}
                        />
                    </>
                )}
            </GalerieTabbarScreenContainer>
            <FullScreenLoader show={isFirstFetch} />
        </>
    );
};

export default FramesScreen;
