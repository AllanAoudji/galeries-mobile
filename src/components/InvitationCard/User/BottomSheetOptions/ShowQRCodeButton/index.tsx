import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { updateInvitationsCurrent } from '#store/invitations';

type Props = {
    invitation: Store.Models.Invitation;
};

const ShowQRCodeButton = ({ invitation }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback(() => {
        dispatch(updateInvitationsCurrent(invitation.id));
        navigation.navigate('InvitationQRCode');
        closeBottomSheet();
    }, [closeBottomSheet, invitation, navigation]);

    return <BottomSheetButton onPress={handlePress} title="show QRCode" />;
};

export default React.memo(ShowQRCodeButton);
