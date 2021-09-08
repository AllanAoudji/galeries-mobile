import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';

import {
    BottomSheetButton,
    CustomButton,
    DeleteModal,
    FormScreen,
    Typography,
} from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { CreateFrameContext } from '#contexts/CreateFrameContext';

import List from './List';
import Tile from './Tile';

import { BodyContainer, TextContainer } from './styles';

type Props = {
    navigation: Screen.CreateFrameStack.AddPicturesNavigationProp;
};

const AddPicturesScreen = ({ navigation }: Props) => {
    const { fadeOutBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);
    const { picturesUri, removePictures } =
        React.useContext(CreateFrameContext);

    const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] =
        React.useState<boolean>(false);
    const [pictureToDelete, setPictureToDelete] = React.useState<string | null>(
        null
    );

    const disableNextButton = React.useMemo(
        () => picturesUri.length === 0,
        [picturesUri]
    );

    const handleCloseBackModal = React.useCallback(() => {
        setOpenBackModal(false);
    }, []);
    const handleCloseDeleteModal = React.useCallback(() => {
        setOpenDeleteModal(false);
        setPictureToDelete(null);
    }, []);
    const handleCloseWithPictures = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else {
            // @ts-ignore
            navigation.getParent().navigate('Desktop', {
                screen: 'Main',
                params: { screen: 'Home' },
            });
        }
    }, [navigation]);
    const handleDeletePicture = React.useCallback(() => {
        if (pictureToDelete) removePictures(pictureToDelete);
    }, [pictureToDelete, removePictures]);
    const handleNavigateCamera = React.useCallback(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                fadeOutBottomSheet();
                navigation.navigate('Camera');
            }
        })();
    }, []);
    const handleNavigateDescription = React.useCallback(() => {
        if (picturesUri.length > 0) {
            navigation.navigate('AddDescription');
        }
    }, [picturesUri]);
    const handleNavigateGallery = React.useCallback(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                fadeOutBottomSheet();
                navigation.navigate('CreateFrameGallery');
            }
        })();
    }, [fadeOutBottomSheet, navigation]);
    const handleOpenDeleteModal = React.useCallback((id: string) => {
        setOpenDeleteModal(true);
        setPictureToDelete(id);
    }, []);
    const handleOpenSheet = React.useCallback(() => {
        if (picturesUri.length < 6)
            openBottomSheet(() => (
                <>
                    <BottomSheetButton
                        onPress={handleNavigateCamera}
                        pictogram="camera-fill"
                        title="take a picture"
                    />
                    <BottomSheetButton
                        onPress={handleNavigateGallery}
                        pictogram="upload"
                        title="upload a picture"
                    />
                </>
            ))();
    }, [
        handleNavigateCamera,
        handleNavigateGallery,
        openBottomSheet,
        picturesUri,
    ]);
    const handleReturn = React.useCallback(() => {
        if (picturesUri.length) setOpenBackModal(true);
        else handleCloseWithPictures();
    }, [handleCloseWithPictures, picturesUri, setOpenBackModal]);

    return (
        <>
            <FormScreen
                handleOnPressReturn={handleReturn}
                renderBottom={
                    <>
                        <CustomButton
                            disable={disableNextButton}
                            mb="smallest"
                            onPress={handleNavigateDescription}
                            title="next"
                        />
                        <CustomButton
                            onPress={handleReturn}
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
                        <List handlePressOpenSheet={handleOpenSheet}>
                            {picturesUri.map((pictureUri) => (
                                <Tile
                                    id={pictureUri}
                                    onLongPress={handleOpenDeleteModal}
                                    uri={pictureUri}
                                    key={pictureUri}
                                />
                            ))}
                        </List>
                    </BodyContainer>
                }
                title="post a new frame"
            />
            <DeleteModal
                handleClose={handleCloseDeleteModal}
                onPressDelete={handleDeletePicture}
                open={openDeleteModal}
                title="Are you sure to delete this frame?"
            />
            <DeleteModal
                handleClose={handleCloseBackModal}
                onPressDelete={handleCloseWithPictures}
                open={openBackModal}
                title="Are you sure to delete this image?"
            />
        </>
    );
};

export default AddPicturesScreen;
