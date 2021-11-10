import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { InteractionManager } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import {
    BottomLoader,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import {
    getGalerieBlackLists,
    selectCurrentGalerieGalerieBlackListsAllIds,
    selectCurrentGalerieGalerieBlackListsStatus,
} from '#store/galerieBlackLists';

import EmptyScrollView from './EmptyScrollView';
import GalerieBlackLists from './GalerieBlackLists';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const GalerieBlackListsScreen = ({
    current,
    editScrollY,
    galerie,
    scrollY,
}: Props) => {
    const dispatch = useDispatch();

    const galerieBlackListsAllIds = useSelector(
        selectCurrentGalerieGalerieBlackListsAllIds
    );
    const galerieBlackListsStatus = useSelector(
        selectCurrentGalerieGalerieBlackListsStatus
    );

    const showBottomLoader = React.useMemo(
        () => galerieBlackListsStatus === 'LOADING',
        [galerieBlackListsStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () =>
            galerieBlackListsStatus === 'PENDING' ||
            galerieBlackListsStatus === 'INITIAL_LOADING',
        [galerieBlackListsStatus]
    );

    useFocusEffect(
        React.useCallback(() => {
            if (
                galerieBlackListsStatus &&
                galerieBlackListsStatus === 'PENDING' &&
                galerie
            )
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getGalerieBlackLists(galerie.id));
                });
        }, [galerieBlackListsStatus, galerie])
    );

    return (
        <GalerieTabbarScreenContainer>
            {galerieBlackListsAllIds && galerieBlackListsAllIds.length > 0 ? (
                <GalerieBlackLists
                    allIds={galerieBlackListsAllIds}
                    current={current}
                    editScrollY={editScrollY}
                    galerie={galerie}
                    scrollY={scrollY}
                />
            ) : (
                <EmptyScrollView
                    current={current}
                    editScrollY={editScrollY}
                    galerie={galerie}
                    scrollY={scrollY}
                />
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(GalerieBlackListsScreen);
