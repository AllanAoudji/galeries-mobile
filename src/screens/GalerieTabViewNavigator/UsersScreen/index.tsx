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
    getGalerieUsers,
    selectCurrentGalerieUsersAllIds,
    selectCurrentGalerieUsersStatus,
} from '#store/users';

import EmptyScrollView from './EmptyScrollView';
import Users from './Users';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const UsersScreen = ({ current, editScrollY, galerie, scrollY }: Props) => {
    const dispatch = useDispatch();

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

    useFocusEffect(
        React.useCallback(() => {
            if (usersStatus && usersStatus === 'PENDING' && galerie)
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getGalerieUsers(galerie.id));
                });
        }, [galerie, usersStatus])
    );

    React.useEffect(() => {
        if (usersStatus && usersStatus === 'PENDING' && galerie)
            dispatch(getGalerieUsers(galerie.id));
    }, [galerie, usersStatus]);

    return (
        <GalerieTabbarScreenContainer>
            {usersAllIds && usersAllIds.length > 0 ? (
                <Users
                    allIds={usersAllIds}
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
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(UsersScreen);
