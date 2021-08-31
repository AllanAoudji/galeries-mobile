import * as React from 'react';

import {
    BottomSheetButton,
    CustomButton,
    FormScreen,
    Pictogram,
    Typography,
} from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

import {
    AddPicture,
    BodyContainer,
    PictureContainer,
    TextContainer,
} from './styles';

type Props = {
    navigation: Screen.CreateFrameStack.AddPicturesNavigationProp;
};

const AddPicturesScreen = ({ navigation }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

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
    const handlePress = React.useCallback(() => {
        openBottomSheet(() => (
            <>
                <BottomSheetButton
                    pictogram="camera-fill"
                    title="take a picture"
                />
                <BottomSheetButton
                    pictogram="upload"
                    title="upload a picture"
                />
            </>
        ))();
    }, []);

    return (
        <FormScreen
            handleOnPressReturn={handleClose}
            renderBottom={
                <>
                    <CustomButton mb="smallest" title="next" />
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
                    <PictureContainer>
                        <AddPicture onPress={handlePress}>
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
