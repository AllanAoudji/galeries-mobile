import * as React from 'react';
import { Image } from 'react-native';

import { ProfilePicturesFetcherContext } from '#contexts/ProfilePicturesFetcherContext';

import DefaultProfilePicture from '../../../assets/images/PP.jpg';

import { Container, ImageStyled, InnerContainer } from './styles';

type Props = {
    border?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    size?: Style.Variant.ProfilePicture;
    user?: Store.Models.User & {
        currentProfilePicture?: Store.Models.ProfilePicture;
    };
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
    const { fetchProfilePicture } = React.useContext(
        ProfilePicturesFetcherContext
    );

    const [uri, setUri] = React.useState<string>(DEFAULT_PROFILE_PICTURE);

    React.useEffect(() => fetchProfilePicture(user), []);
    React.useEffect(() => {
        if (user && uri === DEFAULT_PROFILE_PICTURE) {
            if (user.currentProfilePicture)
                setUri(user.currentProfilePicture.cropedImage.signedUrl);
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
