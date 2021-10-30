import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';

import { GalerieCoverPicture, ProfilePicture, ReturnButton } from '#components';

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

    const colors = React.useMemo(
        () => ['transparent', theme.colors['secondary-light']],
        []
    );

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
                <ProfilePicture user={user} size="huge" border />
            </ProfilePictureContainer>
        </Container>
    );
};

export default React.memo(Header);
