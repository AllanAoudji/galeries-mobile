import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as React from 'react';

import { CustomButton, Pictogram } from '#components';
import { CreateProfilePictureContext } from '#contexts/CreateProfilePictureContext';

import { Container } from './styles';
import { GLOBAL_STYLE } from '#helpers/constants';

const CreateProfilePictureGalerieHeader = () => {
    const navigation =
        useNavigation<Screen.DesktopBottomTab.CreateProfilePictureGalerieNavigationProp>();

    const { addPicture, pictureUri } = React.useContext(
        CreateProfilePictureContext
    );

    const handlePost = React.useCallback(() => {
        if (!pictureUri) return;
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
        addPicture(pictureUri);
    }, [addPicture, pictureUri, navigation]);
    const handlePress = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <Pictogram
                color="primary"
                height={
                    GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT -
                    (StatusBar.currentHeight || 0)
                }
                onPress={handlePress}
                pl="small"
                pr="small"
                variant="arrow-left"
            />
            <CustomButton
                disable={!pictureUri}
                onPress={handlePost}
                ml="smallest"
                small
                title="add picture"
                variant={!pictureUri ? 'stroke' : 'fill'}
            />
        </Container>
    );
};

export default CreateProfilePictureGalerieHeader;
