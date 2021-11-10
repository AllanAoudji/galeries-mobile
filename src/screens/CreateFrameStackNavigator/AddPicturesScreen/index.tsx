import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useTheme } from 'styled-components/native';

import {
    CustomButton,
    DeleteModal,
    ReturnButton,
    Typography,
} from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';

import Header from './Header';
import List from './List';
import Tile from './Tile';

import { Body, Container, TextContainer } from './styles';

type Props = {
    navigation: Screen.CreateFrameStack.AddPicturesNavigationProp;
};

const AddPicturesScreen = ({ navigation }: Props) => {
    const theme = useTheme();

    const { picturesUri, removePictures, resetPictures } =
        React.useContext(CreateFrameContext);

    const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] =
        React.useState<boolean>(false);
    const [pictureToDelete, setPictureToDelete] = React.useState<string | null>(
        null
    );

    const colors = React.useMemo(
        () => [theme.colors.tertiary, theme.colors.primary],
        []
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
        if (navigation.canGoBack()) navigation.goBack();
        else {
            navigation
                .getParent<NavigationProp<Screen.DesktopBottomTab.ParamList>>()
                .navigate('Home');
        }
        resetPictures();
    }, [navigation]);
    const handleNavigateDescription = React.useCallback(() => {
        if (picturesUri.length > 0) navigation.navigate('AddDescription');
    }, [navigation, picturesUri]);

    const handleOpenDeleteModal = React.useCallback((id: string) => {
        setOpenDeleteModal(true);
        setPictureToDelete(id);
    }, []);
    const handleReturn = React.useCallback(() => {
        if (picturesUri.length) setOpenBackModal(true);
        else handleGoBack();
    }, [handleGoBack, picturesUri, setOpenBackModal]);

    useFocusEffect(
        React.useCallback(() => {
            let BackHandlerListerner: any;
            if (openBackModal) {
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => {
                        setOpenBackModal(false);
                        resetPictures();
                        return false;
                    }
                );
            } else if (openDeleteModal) {
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => {
                        setOpenDeleteModal(false);
                        return true;
                    }
                );
            } else if (picturesUri.length) {
                BackHandlerListerner = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => {
                        setOpenBackModal(true);
                        return true;
                    }
                );
            } else if (BackHandlerListerner) BackHandlerListerner.remove();
            return () => {
                if (BackHandlerListerner) BackHandlerListerner.remove();
            };
        }, [openBackModal, openDeleteModal, picturesUri, resetPictures])
    );

    return (
        <Container colors={colors}>
            <ReturnButton onPress={handleReturn} />
            <Header />
            <Body>
                <TextContainer>
                    <Typography>
                        You can long press on an image to delete it and
                        drag'n'drop them to change the order
                    </Typography>
                </TextContainer>
                <List>
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
