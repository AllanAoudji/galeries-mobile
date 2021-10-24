import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';

import {
    GalerieTabbarScreenContainer,
    FullScreenLoader,
    BottomLoader,
    AddButton,
    EmptyMessage,
} from '#components';
import {
    getGalerieInvitations,
    selectCurrentGalerieInvitationsAllIds,
    selectCurrentGalerieInvitationsStatus,
} from '#store/invitations';
import Invitations from './Invitations';

type Props = {
    current: boolean;
    editScrollY: (offsetY: number) => void;
    maxScroll: number;
    galerie?: Store.Models.Galerie;
    paddingTop: number;
    scrollY: Animated.SharedValue<number>;
};

const InvitationsScreen = ({
    current,
    editScrollY,
    galerie,
    maxScroll,
    paddingTop,
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
            {!!paddingTop && (
                <>
                    {invitationsAllIds && invitationsAllIds.length > 0 ? (
                        <Invitations
                            allIds={invitationsAllIds}
                            editScrollY={editScrollY}
                            current={current}
                            galerie={galerie}
                            maxScroll={maxScroll}
                            paddingTop={paddingTop}
                            scrollY={scrollY}
                        />
                    ) : (
                        <EmptyMessage
                            pt={paddingTop}
                            text="This galerie doesn't have invitation yet. Click on the + button to post a new one."
                        />
                    )}
                    <AddButton
                        bottom="largest"
                        right="normal"
                        onPress={handlePressAddGalerie}
                    />
                </>
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default InvitationsScreen;
