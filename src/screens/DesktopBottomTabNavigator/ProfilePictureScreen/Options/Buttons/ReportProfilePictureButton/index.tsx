import * as React from 'react';

import { Typography } from '#components';

import { Button } from './styles';

type Props = {
    me?: Store.Models.User;
    profilePicture: Store.Models.ProfilePicture;
};

const ReportProfilePictureButton = ({ me, profilePicture }: Props) => {
    if (!me) return null;
    if (profilePicture.userId === me.id) return null;

    return (
        <Button>
            <Typography fontSize={18}>rport profile picture</Typography>
        </Button>
    );
};

export default React.memo(ReportProfilePictureButton);
