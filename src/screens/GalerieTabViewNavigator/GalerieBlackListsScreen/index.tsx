import * as React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Animated, {
    runOnJS,
    useAnimatedReaction,
} from 'react-native-reanimated';
import {
    BottomLoader,
    EmptyMessage,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
    Typography,
} from '#components';
import {
    getGalerieBlackLists,
    selectCurrentGalerieGalerieBlackListsAllIds,
    selectCurrentGalerieGalerieBlackListsStatus,
} from '#store/galerieBlackLists';

type Props = {
    current: boolean;
    galerie?: Store.Models.Galerie;
    paddingTop: number;
    scrollY: Animated.SharedValue<number>;
};

const GalerieBlackListsScreen = ({
    current,
    galerie,
    paddingTop,
    scrollY,
}: Props) => {
    const dispatch = useDispatch();
    const flatListRef = React.useRef<FlatList | null>(null);

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

    const setInitialScroll = React.useCallback(
        (newScrollY: number) => {
            if (flatListRef.current && !current) {
                flatListRef.current.scrollToOffset({
                    animated: false,
                    offset: newScrollY,
                });
            }
        },
        [current]
    );
    useAnimatedReaction(
        () => scrollY.value,
        (newScrollY) => {
            runOnJS(setInitialScroll)(newScrollY);
        },
        [current]
    );

    React.useEffect(() => {
        if (
            galerieBlackListsStatus &&
            galerieBlackListsStatus === 'PENDING' &&
            galerie
        )
            dispatch(getGalerieBlackLists(galerie.id));
    }, [galerie, galerieBlackListsStatus]);

    return (
        <GalerieTabbarScreenContainer>
            {!!paddingTop && (
                <>
                    {galerieBlackListsAllIds &&
                    galerieBlackListsAllIds.length > 0 ? (
                        <Typography>galerie blacklist</Typography>
                    ) : (
                        <EmptyMessage
                            pt={paddingTop}
                            text="No other has been black listed from this galerie."
                        />
                    )}
                </>
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default GalerieBlackListsScreen;
