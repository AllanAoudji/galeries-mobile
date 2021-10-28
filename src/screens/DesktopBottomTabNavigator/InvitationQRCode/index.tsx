import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { PRE_CODE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';
import { selectCurrentInvitation } from '#store/invitations';

import Options from './Options';

import { Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.InvitationQRCodeNavigationProp;
};

const InvitationQRCode = ({ navigation }: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const invitation = useSelector(selectCurrentInvitation);

    const [showOptions, setShowOptions] = React.useState<boolean>(false);

    const size = React.useMemo(
        () => dimension.width - convertPixelToNum(theme.spacings.large) * 2,
        []
    );

    const handleHideOptions = React.useCallback(() => {
        setShowOptions(false);
    }, []);
    const handleShowOptions = React.useCallback(() => setShowOptions(true), []);

    useFocusEffect(
        React.useCallback(() => {
            if (!invitation) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [invitation])
    );

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setShowOptions(false);
            };
        }, [])
    );

    return (
        <Container onPress={handleShowOptions}>
            {!!invitation && (
                <QRCode
                    backgroundColor={theme.colors.black}
                    color={theme.colors.white}
                    size={size}
                    value={`${PRE_CODE}${invitation.code}`}
                />
            )}
            <Options onPress={handleHideOptions} show={showOptions} />
        </Container>
    );
};

export default InvitationQRCode;
