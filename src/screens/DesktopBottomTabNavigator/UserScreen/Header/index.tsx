import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Pressable, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';

import { GalerieCoverPicture, ProfilePicture, ReturnButton } from '#components';
import { selectUserCurrentProfilePictureId } from '#store/profilePictures';

import {
    Container,
    CoverPictureContainer,
    LinearGradientStyle,
    ProfilePictureContainer,
} from './style';

type Props = {
    galerie: Store.Models.Galerie;
    user: Store.Models.User;
};

const Header = ({ galerie, user }: Props) => {
    const dimension = useWindowDimensions();
    const navigation = useNavigation<Screen.DesktopBottomTab.UserScreen>();
    const theme = useTheme();

    const userCurrentProfilePictureIdSelector = React.useMemo(
        () => selectUserCurrentProfilePictureId(user.id),
        [user]
    );
    const currentProfilePictureId = useSelector(
        userCurrentProfilePictureIdSelector
    );

    const colors = React.useMemo(
        () => ['transparent', theme.colors['secondary-light']],
        []
    );

    const handlePressProfilePicture = React.useCallback(() => {
        if (currentProfilePictureId) navigation.navigate('ProfilePicture');
    }, [currentProfilePictureId]);
    const handlePressReturn = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, []);

    return (
        <Container>
            <ReturnButton onPress={handlePressReturn} />
            <LinearGradientStyle colors={colors} />
            <CoverPictureContainer>
                <GalerieCoverPicture galerie={galerie} />
            </CoverPictureContainer>
            <ProfilePictureContainer width={dimension.width}>
                <Pressable onPress={handlePressProfilePicture}>
                    <ProfilePicture user={user} size="huge" border />
                </Pressable>
            </ProfilePictureContainer>
        </Container>
    );
};

export default React.memo(Header);
