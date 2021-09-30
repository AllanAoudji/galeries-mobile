import * as React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUserCurrentProfilePicture } from '#store/profilePictures';

import DefaultProfilePicture from '../../../assets/images/PP.jpg';

import { Container, ImageStyled, InnerContainer } from './styles';

type Props = {
    border?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    size?: Style.Variant.ProfilePicture;
    user?: Store.Models.User;
};
type ProfilePictureWithUserProps = {
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

const ProfilePictureWithUser = ({
    border = false,
    mb,
    ml,
    mr,
    mt,
    size = 'normal',
    user,
}: ProfilePictureWithUserProps) => {
    const selectCurrentProfilePicture = React.useMemo(
        () => selectUserCurrentProfilePicture(user.id),
        [user]
    );
    const currentProfilePicture = useSelector(selectCurrentProfilePicture);

    const uri = React.useMemo(() => {
        if (currentProfilePicture)
            return currentProfilePicture.cropedImage.cachedSignedUrl;
        return DEFAULT_PROFILE_PICTURE;
    }, [currentProfilePicture]);

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

const ProfilePicture = ({
    border = false,
    mb,
    ml,
    mr,
    mt,
    size = 'normal',
    user,
}: Props) => {
    if (!user)
        return (
            <Container
                border={border}
                mb={mb}
                ml={ml}
                mr={mr}
                mt={mt}
                size={size}
            >
                <InnerContainer border containerBorder={border} size={size}>
                    <ImageStyled source={{ uri: DEFAULT_PROFILE_PICTURE }} />
                </InnerContainer>
            </Container>
        );

    return (
        <ProfilePictureWithUser
            user={user}
            border={border}
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            size={size}
        />
    );
};

export default ProfilePicture;
