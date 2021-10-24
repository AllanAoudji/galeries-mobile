import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import { selectUser } from '#store/users';

import User from './User';
import Informations from './Informations';

import { Container, InnerContainer } from './styles';
import { updateInvitationsCurrent } from '#store/invitations';

type Props = {
    invitation?: Store.Models.Invitation;
};

const InvitationCard = ({ invitation }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const userSelector = React.useMemo(
        () => selectUser(invitation ? invitation.userId : null),
        [invitation]
    );
    const user = useSelector(userSelector);

    const handlePress = React.useCallback(() => {
        dispatch(updateInvitationsCurrent(invitation ? invitation.id : null));
        navigation.navigate('Invitation');
    }, []);

    if (!invitation) return null;

    return (
        <Container onPress={handlePress}>
            <ProfilePicture user={user} mr="smallest" />
            <InnerContainer>
                <User invitation={invitation} user={user} />
                <Informations invitation={invitation} />
            </InnerContainer>
        </Container>
    );
};

export default React.memo(InvitationCard);
