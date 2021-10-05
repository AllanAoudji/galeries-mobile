import * as React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { useSelector } from 'react-redux';

import DefaultProfilePicture from '../../../assets/images/PP.jpg';
import {
    selectProfilePicture,
    selectUserCurrentProfilePictureId,
} from '#store/profilePictures';

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
    const userCurrentProfilePictureIdSelector = React.useCallback(
        () => selectUserCurrentProfilePictureId(user.id),
        [user]
    );
    const currentProfilePictureId = useSelector(
        userCurrentProfilePictureIdSelector()
    );

    const profilePictureSelector = React.useCallback(
        () => selectProfilePicture(currentProfilePictureId),
        [currentProfilePictureId]
    );
    const profilePicture = useSelector(profilePictureSelector());

    const uri = React.useMemo(() => {
        if (profilePicture) return profilePicture.cropedImage.cachedSignedUrl;
        return DEFAULT_PROFILE_PICTURE;
    }, [profilePicture]);
    const source: ImageSourcePropType = React.useMemo(() => ({ uri }), [uri]);
    const borderProp = React.useMemo(
        () => uri === DEFAULT_PROFILE_PICTURE,
        [uri]
    );

    return (
        <Container border={border} mb={mb} ml={ml} mr={mr} mt={mt} size={size}>
            <InnerContainer
                border={borderProp}
                containerBorder={border}
                size={size}
            >
                <ImageStyled source={source} />
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
    const source: ImageSourcePropType = React.useMemo(
        () => ({ uri: DEFAULT_PROFILE_PICTURE }),
        []
    );

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
                    <ImageStyled source={source} />
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
