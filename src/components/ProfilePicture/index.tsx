import * as React from 'react';
import { Image } from 'react-native';

import { useGetCurrentProfilePicture } from '#hooks';

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
    const { loading } = useGetCurrentProfilePicture(user);

    if (!user || loading)
        return (
            <Container
                border={border}
                mb={mb}
                ml={ml}
                mr={mr}
                mt={mt}
                size={size}
            >
                <InnerContainer
                    border={true}
                    containerBorder={border}
                    size={size}
                >
                    <ImageStyled source={{ uri: DEFAULT_PROFILE_PICTURE }} />
                </InnerContainer>
            </Container>
        );

    if (
        user.currentProfilePicute === null &&
        user.defaultProfilePicture === null
    )
        return (
            <Container
                border={border}
                mb={mb}
                ml={ml}
                mr={mr}
                mt={mt}
                size={size}
            >
                <InnerContainer
                    border={true}
                    containerBorder={border}
                    size={size}
                >
                    <ImageStyled source={{ uri: DEFAULT_PROFILE_PICTURE }} />
                </InnerContainer>
            </Container>
        );

    if (user.currentProfilePicute === null && user.defaultProfilePicture) {
        return (
            <Container
                border={border}
                mb={mb}
                ml={ml}
                mr={mr}
                mt={mt}
                size={size}
            >
                <InnerContainer
                    border={false}
                    containerBorder={border}
                    size={size}
                >
                    <ImageStyled source={{ uri: user.defaultProfilePicture }} />
                </InnerContainer>
            </Container>
        );
    }

    if (user.currentProfilePicute) {
        return (
            <Container
                border={border}
                mb={mb}
                ml={ml}
                mr={mr}
                mt={mt}
                size={size}
            >
                <InnerContainer
                    border={false}
                    containerBorder={border}
                    size={size}
                >
                    <ImageStyled source={{ uri: user.currentProfilePicute }} />
                </InnerContainer>
            </Container>
        );
    }

    return (
        <Container border={border} mb={mb} ml={ml} mr={mr} mt={mt} size={size}>
            <InnerContainer border={true} containerBorder={border} size={size}>
                <ImageStyled source={{ uri: DEFAULT_PROFILE_PICTURE }} />
            </InnerContainer>
        </Container>
    );
};

export default ProfilePicture;
