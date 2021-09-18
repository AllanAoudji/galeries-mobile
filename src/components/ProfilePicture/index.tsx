import * as React from 'react';
import { Image } from 'react-native';

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
    return (
        <Container border={border} mb={mb} ml={ml} mr={mr} mt={mt} size={size}>
            <InnerContainer border={true} containerBorder={border} size={size}>
                <ImageStyled source={{ uri: DEFAULT_PROFILE_PICTURE }} />
            </InnerContainer>
        </Container>
    );
    // If not user
    // return default PP
    //
    // State finished (false)
    //
    // If currentProfilePicture === undefined
    // FetchCurrentPP
    //
    // When fetch finished setFinished(true)
    //
    // If !currentPP && !finished
    // return currentPP
    //
    // If currentPP === null && defaultPP === null
    //   return localPP
    // If currentPP === null && defaultPP !== null
    //   return defaultPP
    // else return currentPP
};

export default ProfilePicture;
