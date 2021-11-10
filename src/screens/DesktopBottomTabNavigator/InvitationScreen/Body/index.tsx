import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from 'styled-components/native';

import { Pictogram, Typography } from '#components';
import { PRE_CODE } from '#helpers/constants';

import {
    Container,
    InformationContainer,
    InformationsContainer,
} from './styles';

type Props = {
    invitation: Store.Models.Invitation;
};

const Body = ({ invitation }: Props) => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.InvitationNavigationProp>();
    const theme = useTheme();

    const expiration = React.useMemo(() => {
        if (!invitation.time) return null;
        const now = moment(new Date());
        const end = moment(invitation.time);
        const duration = moment.duration(end.diff(now));
        if (duration.asDays() >= 1) {
            return `${Math.floor(duration.asDays())} day${
                !!(Math.floor(duration.asDays()) > 1) && 's'
            }`;
        }
        if (duration.asHours() >= 1) {
            return `${Math.floor(duration.asHours())} hour${
                !!(Math.floor(duration.asHours()) > 1) && 's'
            }`;
        }
        return `${Math.floor(duration.asMinutes())} minute${
            !!(Math.floor(duration.asMinutes()) > 1) && 's'
        }`;
    }, [invitation]);

    const handlePress = React.useCallback(
        () => navigation.navigate('InvitationQRCode'),
        [navigation]
    );

    return (
        <Container>
            <Pressable onPress={handlePress}>
                <QRCode
                    backgroundColor={theme.colors.secondary}
                    color={theme.colors.black}
                    size={150}
                    value={`${PRE_CODE}${invitation.code}`}
                />
            </Pressable>
            <InformationsContainer>
                <InformationContainer>
                    <Pictogram color="primary" variant="invitation-stroke" />
                    <Typography color="primary">
                        {invitation.numOfInvits} invitations left
                    </Typography>
                </InformationContainer>
                {!!expiration && (
                    <InformationContainer>
                        <Pictogram color="primary" variant="time-stroke" />
                        <Typography color="primary">
                            Expire in {expiration}
                        </Typography>
                    </InformationContainer>
                )}
            </InformationsContainer>
        </Container>
    );
};

export default Body;
