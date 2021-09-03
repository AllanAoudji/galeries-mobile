import { Camera } from 'expo-camera';
import * as React from 'react';

import {
    BottomSheetButton,
    CustomButton,
    FormScreen,
    Pictogram,
    Typography,
} from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { CreateFrameContext } from '#contexts/CreateFrameContext';

import List from './List';
import Tile from './Tile';
import {
    AddPicture,
    BodyContainer,
    PictureContainer,
    TextContainer,
} from './styles';

type AddPicturesScreenProps = {
    navigation: Screen.CreateFrameStack.AddPicturesNavigationProp;
};

const AddPicturesScreen = ({ navigation }: AddPicturesScreenProps) => {
    const { picturesUri } = React.useContext(CreateFrameContext);
    const { fadeOutBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);

    const disableNextButton = React.useMemo(
        () => picturesUri.length === 0,
        [picturesUri]
    );

    const handleClose = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else {
            // @ts-ignore
            navigation.getParent().navigate('Desktop', {
                screen: 'Main',
                params: { screen: 'Home' },
            });
        }
    }, [navigation]);
    const handleNavigateCamera = React.useCallback(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                fadeOutBottomSheet();
                navigation.navigate('Camera');
            }
        })();
    }, []);
    const handlePressNext = React.useCallback(() => {
        if (picturesUri.length > 0) {
            navigation.navigate('AddDescription');
        }
    }, [picturesUri]);
    const handlePressOpenSheet = React.useCallback(() => {
        if (picturesUri.length < 6)
            openBottomSheet(() => (
                <>
                    <BottomSheetButton
                        onPress={handleNavigateCamera}
                        pictogram="camera-fill"
                        title="take a picture"
                    />
                    <BottomSheetButton
                        pictogram="upload"
                        title="upload a picture"
                    />
                </>
            ))();
    }, [picturesUri]);

    return (
        <FormScreen
            handleOnPressReturn={handleClose}
            renderBottom={
                <>
                    <CustomButton
                        disable={disableNextButton}
                        mb="smallest"
                        onPress={handlePressNext}
                        title="next"
                    />
                    <CustomButton
                        onPress={handleClose}
                        title="cancel"
                        variant="stroke"
                    />
                </>
            }
            renderTop={
                <BodyContainer>
                    <TextContainer>
                        <Typography>
                            You can long press on an image to delete it and
                            drag'n'drop them to change the order
                        </Typography>
                    </TextContainer>
                    {/* <List>
                        {picturesUri.map((pictureUri) => (
                            <Tile
                                id={pictureUri}
                                onLongPress={() => {}}
                                uri={pictureUri}
                                key={pictureUri}
                            />
                        ))}
                    </List> */}
                    {/* TODO: Need to be include in list if picturesURI.length < 6 */}
                    <PictureContainer>
                        <AddPicture onPress={handlePressOpenSheet}>
                            <Pictogram color="primary" variant="plus" />
                        </AddPicture>
                    </PictureContainer>
                </BodyContainer>
            }
            title="post a new frame"
        />
    );
};

export default AddPicturesScreen;
