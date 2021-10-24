import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import { selectUser } from '#store/users';

import User from './User';
import Informations from './Informations';

import { Container, InnerContainer } from './styles';

type Props = {
    invitation?: Store.Models.Invitation;
};

const InvitationCard = ({ invitation }: Props) => {
    const userSelector = React.useMemo(
        () => selectUser(invitation ? invitation.userId : null),
        [invitation]
    );
    const user = useSelector(userSelector);

    if (!invitation) return null;

    return (
        <Container>
            <ProfilePicture user={user} mr="smallest" />
            <InnerContainer>
                <User invitation={invitation} user={user} />
                <Informations invitation={invitation} />
            </InnerContainer>
        </Container>
    );
};

export default React.memo(InvitationCard);
