import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import { selectUser } from '#store/users';

import { Container } from './style';

type Props = {
    userId: string;
};

const UserContainer = ({ userId }: Props) => {
    const userSelector = React.useMemo(() => selectUser(userId), [userId]);
    const user = useSelector(userSelector);

    return (
        <Container>
            <ProfilePicture border size="small" user={user} />
        </Container>
    );
};

export default React.memo(UserContainer);
