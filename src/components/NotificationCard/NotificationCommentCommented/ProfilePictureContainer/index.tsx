import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import { selectUser } from '#store/users';

type Props = {
    userId: string;
};

const ProfilePictureContainer = ({ userId }: Props) => {
    const userSelector = React.useMemo(() => selectUser(userId), [userId]);
    const user = useSelector(userSelector);

    if (!user) return null;

    return <ProfilePicture user={user} />;
};

export default React.memo(ProfilePictureContainer);
