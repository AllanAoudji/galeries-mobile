import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';

import {
    GalerieTabbarScreenContainer,
    FullScreenLoader,
    BottomLoader,
    AddButton,
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

    React.useEffect(() => {
        if (
            current &&
            galerie &&
            invitationsStatus &&
            invitationsStatus === 'PENDING'
        )
            dispatch(getGalerieInvitations(galerie.id));
    }, [current, galerie, invitationsStatus]);

    return (
        <GalerieTabbarScreenContainer>
            {invitationsAllIds && invitationsAllIds.length > 0 ? (
                <Invitations
                    allIds={invitationsAllIds}
                    editScrollY={editScrollY}
                    current={current}
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
                right="normal"
                onPress={handlePressAddGalerie}
            />
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default React.memo(InvitationsScreen);
