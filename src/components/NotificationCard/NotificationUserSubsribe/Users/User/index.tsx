import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import { selectUser } from '#store/users';

import { Container } from './styles';

type Props = {
    seen: boolean;
    userId: string;
};

const User = ({ seen, userId }: Props) => {
    const userSelector = React.useMemo(() => selectUser(userId), [userId]);
    const user = useSelector(userSelector);

    return (
        <Container>
            <ProfilePicture
                border
                borderColor={seen ? 'secondary-light' : 'secondary'}
                size="small"
                user={user}
            />
        </Container>
    );
};

export default User;
