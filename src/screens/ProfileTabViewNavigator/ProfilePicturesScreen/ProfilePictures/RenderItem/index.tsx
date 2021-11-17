import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { selectProfilePicture } from '#store/profilePictures';

import { Container, StyledImage } from './styles';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const dimension = useWindowDimensions();

    const profilePictureSelector = React.useMemo(
        () => selectProfilePicture(item),
        [item]
    );
    const profilePicture = useSelector(profilePictureSelector);

    const source = React.useMemo(
        () => ({
            uri: profilePicture
                ? profilePicture.cropedImage.cachedSignedUrl
                : '',
        }),
        [profilePicture]
    );

    if (!profilePicture) return null;

    return (
        <Container size={dimension.width / 2}>
            <StyledImage source={source} size={dimension.width / 2} />
        </Container>
    );
};

export default React.memo(RenderItem);
