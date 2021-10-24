import * as React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import convertPixelToNum from '#helpers/convertPixelToNum';
import { selectCurrentInvitation } from '#store/invitations';

import { Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.InvitationQRCodeNavigationProp;
};

const InvitationQRCode = ({ navigation }: Props) => {
    const theme = useTheme();
    const dimension = useWindowDimensions();

    const invitation = useSelector(selectCurrentInvitation);

    const size = React.useMemo(
        () => dimension.width - convertPixelToNum(theme.spacings.large) * 2,
        []
    );

    React.useEffect(() => {
        if (!invitation) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [navigation]);

    return (
        <Container>
            {!!invitation && (
                <QRCode
                    backgroundColor={theme.colors.black}
                    color={theme.colors.white}
                    size={size}
                    value={invitation.code}
                />
            )}
        </Container>
    );
};

export default InvitationQRCode;
