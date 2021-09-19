import { NavigationProp } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';

import {
    BottomSheetButton,
    CustomButton,
    DeleteModal,
    Pictogram,
    Typography,
} from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import { GLOBAL_STYLE } from '#helpers/constants';

import List from './List';
import Tile from './Tile';

import {
    Body,
    Container,
    Header,
    ReturnButtonContainer,
    Separator,
    TextContainer,
} from './styles';

type Props = {
    navigation: Screen.CreateFrameStack.AddPicturesNavigationProp;
};

const AddPicturesScreen = ({ navigation }: Props) => {
    const theme = useTheme();

    const { closeBottomSheet, openBottomSheet } =
        React.useContext(BottomSheetContext);
    const { picturesUri, removePictures, resetPictures } =
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

    const handleCloseBackModal = React.useCallback(
        () => setOpenBackModal(false),
        []
    );
    const handleCloseDeleteModal = React.useCallback(() => {
        setOpenDeleteModal(false);
        setPictureToDelete(null);
    }, []);
    const handleDeletePicture = React.useCallback(() => {
        if (pictureToDelete) removePictures(pictureToDelete);
    }, [pictureToDelete, removePictures]);
    const handleGoBack = React.useCallback(() => {
        resetPictures();
        if (navigation.canGoBack()) navigation.goBack();
        else {
            navigation
                .getParent<NavigationProp<Screen.DesktopBottomTab.ParamList>>()
                .navigate('Home');
        }
    }, [navigation]);
    const handleNavigateCamera = React.useCallback(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                closeBottomSheet();
                navigation.navigate('CreateFrameCamera');
            }
        })();
    }, []);
    const handleNavigateDescription = React.useCallback(() => {
        if (picturesUri.length > 0) navigation.navigate('AddDescription');
    }, [picturesUri]);
    const handleNavigateGallery = React.useCallback(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted')
                closeBottomSheet(() =>
                    navigation.navigate('CreateFrameGallery')
                );
        })();
    }, [closeBottomSheet, navigation]);
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
        else handleGoBack();
    }, [handleGoBack, picturesUri, setOpenBackModal]);

    return (
        <Container colors={[theme.colors.tertiary, theme.colors.primary]}>
            <ReturnButtonContainer paddingTop={StatusBar.currentHeight}>
                <Pictogram
                    color="secondary-light"
                    height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                    onPress={handleReturn}
                    pl="small"
                    pr="small"
                    variant="arrow-left"
                />
            </ReturnButtonContainer>
            <Header>
                <Typography
                    color="secondary-light"
                    fontFamily="light"
                    fontSize={36}
                    textAlign="right"
                >
                    CREATE A FRAME
                </Typography>
                <Separator />
            </Header>
            <Body>
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
                            key={pictureUri}
                            onLongPress={handleOpenDeleteModal}
                            uri={pictureUri}
                        />
                    ))}
                </List>
                <CustomButton
                    disable={disableNextButton}
                    mt="small"
                    mb="smallest"
                    onPress={handleNavigateDescription}
                    title="next"
                />
                <CustomButton
                    onPress={handleReturn}
                    title="cancel"
                    variant="stroke"
                />
            </Body>
            <DeleteModal
                handleClose={handleCloseDeleteModal}
                onPressDelete={handleDeletePicture}
                open={openDeleteModal}
                title="Are you sure to delete this frame?"
            />
            <DeleteModal
                handleClose={handleCloseBackModal}
                onPressDelete={handleGoBack}
                open={openBackModal}
                title="Are you sure to delete this image?"
            />
        </Container>
    );
};

export default AddPicturesScreen;
