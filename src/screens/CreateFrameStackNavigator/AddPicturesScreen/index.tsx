import * as React from 'react';
import styled from 'styled-components/native';

import {
    BottomSheetButton,
    CustomButton,
    FormScreen,
    Pictogram,
    Typography,
} from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';

type Props = {
    navigation: Screen.CreateFrameStack.AddPicturesNavigationProp;
};

const PICTURE_SIZE = 100;

const AddPicture = styled.Pressable`
    align-items: center;
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 15px;
    border-style: dashed;
    border-width: 2px;
    height: ${() => `${PICTURE_SIZE}px`};
    justify-content: center;
    margin-bottom: 10px;
    width: ${() => `${PICTURE_SIZE}px`};
`;
const BodyContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;
const PictureContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    height: ${() => `${PICTURE_SIZE * 2 + 10}px`};
    justify-content: space-between;
`;
const TextContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;

const AddPicturesScreen = ({ navigation }: Props) => {
    const { openBottomSheet } = React.useContext(BottomSheetContext);

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

    return (
        <FormScreen
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
            handleOnPressReturn={handleClose}
            title="post a new frame"
        />
    );
};

export default AddPicturesScreen;
