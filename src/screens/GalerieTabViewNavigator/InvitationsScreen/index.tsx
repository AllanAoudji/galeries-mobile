import {
    NavigationProp,
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import * as React from 'react';
import { InteractionManager } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';

import {
    AddButton,
    BottomLoader,
    FullScreenLoader,
    GalerieTabbarScreenContainer,
} from '#components';
import {
    getGalerieInvitations,
    selectCurrentGalerieInvitationsAllIds,
    selectCurrentGalerieInvitationsStatus,
} from '#store/invitations';

import EmptyScrollView from './EmptyScrollView';
import Invitations from './Invitations';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    galerie?: Store.Models.Galerie;
    scrollY: Animated.SharedValue<number>;
};

const InvitationsScreen = ({
    current,
    editScrollY,
    galerie,
    scrollY,
}: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const invitationsAllIds = useSelector(
        selectCurrentGalerieInvitationsAllIds
    );
    const invitationsStatus = useSelector(
        selectCurrentGalerieInvitationsStatus
    );

    const showBottomLoader = React.useMemo(
        () => invitationsStatus === 'LOADING',
        [invitationsStatus]
    );
    const showFullScreenLoader = React.useMemo(
        () =>
            invitationsStatus === 'PENDING' ||
            invitationsStatus === 'INITIAL_LOADING',
        [invitationsStatus]
    );

    const handlePressAddGalerie = React.useCallback(() => {
        navigation
            .getParent<NavigationProp<Screen.DesktopBottomTab.ParamList>>()
            .navigate('CreateInvitation');
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            if (galerie && invitationsStatus && invitationsStatus === 'PENDING')
                InteractionManager.runAfterInteractions(() => {
                    dispatch(getGalerieInvitations(galerie.id));
                });
        }, [galerie, invitationsStatus])
    );

    return (
        <GalerieTabbarScreenContainer>
            {invitationsAllIds && invitationsAllIds.length > 0 ? (
                <Invitations
                    allIds={invitationsAllIds}
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
            <AddButton
                bottom="largest"
                onPress={handlePressAddGalerie}
                right="normal"
            />
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader bottom="huge" show={showBottomLoader} />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(InvitationsScreen);
