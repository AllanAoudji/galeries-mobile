import * as React from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserCurrentProfilePicture,
    selectUserCurrentProfilePicture,
    selectUserCurrentProfilePictureStatus,
} from '#store/profilePictures';

import DefaultProfilePicture from '../../../assets/images/PP.jpg';

import { Container, ImageStyled, InnerContainer } from './styles';

type Props = {
    border?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    size?: Style.Variant.ProfilePicture;
    user: Store.Models.User;
};

const DEFAULT_PROFILE_PICTURE = Image.resolveAssetSource(
    DefaultProfilePicture
).uri;

const ProfilePicture = ({
    border = false,
    mb,
    ml,
    mr,
    mt,
    size = 'normal',
    user,
}: Props) => {
    const dispatch = useDispatch();

    const selectCurrentProfilePicture = React.useMemo(
        () => selectUserCurrentProfilePicture(user.id),
        [user]
    );
    const currentProfilePicture = useSelector(selectCurrentProfilePicture);
    const selectCurrentProfilepictureStatus = React.useCallback(
        () => selectUserCurrentProfilePictureStatus(user.id),
        [user]
    );
    const currentProfilePictureStatus = useSelector(
        selectCurrentProfilepictureStatus()
    );
    const [uri, setUri] = React.useState<string>(DEFAULT_PROFILE_PICTURE);

    React.useEffect(() => {
        if (currentProfilePictureStatus === 'PENDING')
            dispatch(getUserCurrentProfilePicture(user.id));
    }, [currentProfilePictureStatus, user]);

    React.useEffect(() => {
        if (user && uri === DEFAULT_PROFILE_PICTURE) {
            if (currentProfilePicture)
                setUri(currentProfilePicture.cropedImage.signedUrl);
            else if (user.defaultProfilePicture)
                setUri(user.defaultProfilePicture);
            else setUri(DEFAULT_PROFILE_PICTURE);
        } else setUri(DEFAULT_PROFILE_PICTURE);
    }, [user, uri]);

    return (
        <Container border={border} mb={mb} ml={ml} mr={mr} mt={mt} size={size}>
            <InnerContainer
                border={uri === DEFAULT_PROFILE_PICTURE}
                containerBorder={border}
                size={size}
            >
                <ImageStyled source={{ uri }} />
            </InnerContainer>
        </Container>
    );
};

export default ProfilePicture;
