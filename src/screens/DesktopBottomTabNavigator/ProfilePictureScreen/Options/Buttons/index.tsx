import * as React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';
import { selectMe } from '#store/me';

import DeleteProfilePicturesButton from './DeleteProfilePicturesButton';
import PutProfilePictureButton from './PutProfilePictureButton';
import ReportProfilePictureButton from './ReportProfilePictureButton';

type Props = {
    profilePicture: Store.Models.ProfilePicture;
};

const Buttons = ({ profilePicture }: Props) => {
    const me = useSelector(selectMe);

    return (
        <Container>
            <PutProfilePictureButton profilePicture={profilePicture} me={me} />
            <DeleteProfilePicturesButton
                profilePicture={profilePicture}
                me={me}
            />
            <ReportProfilePictureButton
                profilePicture={profilePicture}
                me={me}
            />
        </Container>
    );
};

export default React.memo(Buttons);
