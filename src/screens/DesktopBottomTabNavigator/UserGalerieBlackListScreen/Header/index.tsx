import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

import { GalerieCoverPicture, ProfilePicture, ReturnButton } from '#components';
import { selectGalerie } from '#store/galeries';
import { selectUserCurrentProfilePictureId } from '#store/profilePictures';
import { selectUser } from '#store/users';

import {
    Container,
    CoverPictureContainer,
    LinearGradientStyle,
    ProfilePictureContainer,
} from './styles';

type Props = {
    galerieBlackList: Store.Models.GalerieBlackList;
};

const Header = ({ galerieBlackList }: Props) => {
    const dimension = useWindowDimensions();
    const navigation = useNavigation<Screen.DesktopBottomTab.UserScreen>();
    const theme = useTheme();

    const galerieSelector = React.useMemo(
        () => selectGalerie(galerieBlackList.galerieId),
        [galerieBlackList]
    );
    const galerie = useSelector(galerieSelector);
    const userSelector = React.useMemo(
        () => selectUser(galerieBlackList.userId),
        [galerieBlackList]
    );
    const user = useSelector(userSelector);
    const userCurrentProfilePictureIdSelector = React.useMemo(
        () => selectUserCurrentProfilePictureId(user ? user.id : null),
        [user]
    );
    const currentProfilePictureId = useSelector(
        userCurrentProfilePictureIdSelector
    );

    const colors = React.useMemo(
        () => ['transparent', theme.colors['primary-light']],
        []
    );

    // TODO:
    // if long press, should open bottomsheet modal to report PP
    const handleLongPressProfilePicture = React.useCallback(() => {}, []);
    const handlePressProfilePicture = React.useCallback(() => {
        if (currentProfilePictureId) navigation.navigate('ProfilePicture');
    }, [currentProfilePictureId, navigation]);
    const handlePressReturn = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    return (
        <Container>
            <ReturnButton onPress={handlePressReturn} />
            <LinearGradientStyle colors={colors} />
            <CoverPictureContainer>
                <GalerieCoverPicture galerie={galerie} />
            </CoverPictureContainer>
            <ProfilePictureContainer width={dimension.width}>
                <Pressable
                    onLongPress={handleLongPressProfilePicture}
                    onPress={handlePressProfilePicture}
                >
                    <ProfilePicture
                        border
                        borderColor="primary-light"
                        user={user}
                        size="huge"
                    />
                </Pressable>
            </ProfilePictureContainer>
        </Container>
    );
};

export default Header;
