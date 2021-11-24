import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getInvitation, selectCurrentInvitation } from '#store/invitations';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';

import { Container } from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.InvitationNavigationProp;
};

const InvitationScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const invitation = useSelector(selectCurrentInvitation);

    const [initialLoading, setInitialLoading] = React.useState<boolean>(true);

    useFocusEffect(
        React.useCallback(() => {
            if (invitation) return;
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
        }, [invitation, navigation])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (!invitation) return;
            if (!initialLoading) return;
            dispatch(getInvitation(invitation.id));
        }, [initialLoading, invitation])
    );
    useFocusEffect(
        React.useCallback(
            () => () => {
                setInitialLoading(true);
            },
            []
        )
    );

    if (!invitation) return null;

    return (
        <Container>
            <Header invitation={invitation} />
            <Body invitation={invitation} />
            <Footer invitation={invitation} />
        </Container>
    );
};

export default InvitationScreen;
