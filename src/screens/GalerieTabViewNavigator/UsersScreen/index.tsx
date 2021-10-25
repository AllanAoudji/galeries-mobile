import * as React from 'react';
import { FlatList } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedReaction,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import {
    GalerieTabbarScreenContainer,
    FullScreenLoader,
    BottomLoader,
    EmptyMessage,
} from '#components';
import {
    getGalerieUsers,
    selectCurrentGalerieUsersAllIds,
    selectCurrentGalerieUsersStatus,
} from '#store/users';

import Users from './Users';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    maxScroll: number;
    paddingTop: number;
    scrollY: Animated.SharedValue<number>;
};

const UsersScreen = ({
    current,
    editScrollY,
    galerie,
    maxScroll,
    paddingTop,
    scrollY,
}: Props) => {
    const dispatch = useDispatch();
    const flatListRef = React.useRef<FlatList | null>(null);

    const usersAllIds = useSelector(selectCurrentGalerieUsersAllIds);
    const usersStatus = useSelector(selectCurrentGalerieUsersStatus);

    const showBottomLoader = React.useMemo(
        () => usersStatus === 'LOADING',
        [usersStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () => usersStatus === 'PENDING' || usersStatus === 'INITIAL_LOADING',
        [usersStatus]
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
        if (usersStatus && usersStatus === 'PENDING' && galerie)
            dispatch(getGalerieUsers(galerie.id));
    }, [galerie, usersStatus]);

    return (
        <GalerieTabbarScreenContainer>
            {!!paddingTop && (
                <>
                    {usersAllIds && usersAllIds.length > 0 ? (
                        <Users
                            allIds={usersAllIds}
                            current={current}
                            editScrollY={editScrollY}
                            galerie={galerie}
                            maxScroll={maxScroll}
                            paddingTop={paddingTop}
                            scrollY={scrollY}
                        />
                    ) : (
                        <EmptyMessage
                            pt={paddingTop}
                            text="No other user follow this galerie yet."
                        />
                    )}
                </>
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(UsersScreen);
