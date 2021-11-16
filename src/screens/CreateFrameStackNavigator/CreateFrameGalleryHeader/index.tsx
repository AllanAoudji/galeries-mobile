import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as React from 'react';

import { CustomButton, Pictogram, Typography } from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container, InnerContainer } from './styles';

const CreateFrameGalleryHeader = () => {
    const navigation =
        useNavigation<Screen.CreateFrameStack.CreateFrameCameraNavigationProp>();

    const { picturesUri } = React.useContext(CreateFrameContext);

    const handlePress = React.useCallback(
        () => navigation.navigate('AddPictures'),
        [navigation]
    );

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
            <InnerContainer>
                <Typography fontFamily="bold" fontSize={14}>
                    {picturesUri.length}/6 pictures selected
                </Typography>
                <CustomButton
                    disable={!picturesUri.length}
                    onPress={handlePress}
                    ml="smallest"
                    small
                    title="add pictures"
                    variant={!picturesUri.length ? 'stroke' : 'fill'}
                />
            </InnerContainer>
        </Container>
    );
};

export default CreateFrameGalleryHeader;
