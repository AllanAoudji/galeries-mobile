import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    Typography,
    GalerieTabbarScreenContainer,
    FullScreenLoader,
    BottomLoader,
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
                <View style={{ paddingTop }}>
                    <Typography>Invitations</Typography>
                </View>
            )}
            <FullScreenLoader show={showFullScreenLoader} />
            <BottomLoader show={showBottomLoader} bottom="huge" />
        </GalerieTabbarScreenContainer>
    );
};

export default InvitationsScreen;
