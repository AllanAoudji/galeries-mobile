import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
    ImageSourcePropType,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

import { selectCurrentProfilepictureId } from '#store/profilePictures';

import {
    BlurBackground,
    Container,
    ImageStyled,
    InnerContainer,
} from './styles';

type Props = {
    navigation: Screen.DesktopBottomTab.ProfilePictureNavigationProp;
};

const ProfilePictureScreen = ({ navigation }: Props) => {
    const dimension = useWindowDimensions();
    const currentProfilePicture = useSelector(selectCurrentProfilepictureId);

    const [showOptions, setShowOptions] = React.useState<boolean>(false);

    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: currentProfilePicture
                ? currentProfilePicture.originalImage.cachedSignedUrl
                : '',
        }),
        [currentProfilePicture]
    );

    const handleHideOptions = React.useCallback(() => {
        setShowOptions(false);
    }, []);
    const handleShowOptions = React.useCallback(() => setShowOptions(true), []);

    useFocusEffect(
        React.useCallback(() => {
            if (!currentProfilePicture) {
                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate('Home');
            }
        }, [currentProfilePicture])
    );

    if (!currentProfilePicture) return null;

    return (
        <Container>
            <BlurBackground
                blurRadius={40}
                source={source}
                style={[StyleSheet.absoluteFillObject]}
            />
            <InnerContainer onPress={handleShowOptions} width={dimension.width}>
                <ImageStyled
                    height={dimension.height}
                    resizeMode="contain"
                    source={source}
                    width={dimension.width}
                />
            </InnerContainer>
        </Container>
    );
};

export default ProfilePictureScreen;
