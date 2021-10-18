import * as React from 'react';
import { useSelector } from 'react-redux';

import ProfilePicture from '#components/ProfilePicture';
import Typography from '#components/Typography';
import { selectUser } from '#store/users';

type Props = {
    frame: Store.Models.Frame;
};

const WithoutGalerie = ({ frame }: Props) => {
    const userSelector = React.useMemo(() => selectUser(frame.userId), [frame]);
    const user = useSelector(userSelector);

    return (
        <>
            <ProfilePicture mr="smallest" user={user} />
            <Typography fontFamily="light">posted by</Typography>
            <Typography>{user ? user.pseudonym : 'user not found'}</Typography>
        </>
    );
};

export default React.memo(WithoutGalerie);
