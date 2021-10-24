import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentInvitation } from '#store/invitations';

import Header from './Header';

import { Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.InvitationNavigationProp;
};

const InvitationScreen = ({ navigation }: Props) => {
    const invitation = useSelector(selectCurrentInvitation);

    React.useEffect(() => {
        if (!invitation) {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }
    }, [invitation]);

    if (!invitation) return null;

    return (
        <Container>
            <Header invitation={invitation} />
        </Container>
    );
};

export default InvitationScreen;
