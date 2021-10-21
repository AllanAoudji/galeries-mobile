import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    Typography,
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

type Props = {
    current: boolean;
    galerie?: Store.Models.Galerie;
    paddingTop: number;
};

const InvitationsScreen = ({ current, galerie, paddingTop }: Props) => {
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
                    <View style={{ paddingTop }}>
                        <Typography>Invitations</Typography>
                    </View>
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
