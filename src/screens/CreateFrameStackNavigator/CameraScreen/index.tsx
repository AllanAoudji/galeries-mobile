import { Camera } from 'expo-camera';
import * as React from 'react';
import styled from 'styled-components/native';

import { Pictogram } from '#components';

type Props = {
    navigation: Screen.CreateFrameStack.CameraNavigationProp;
};

const TAKE_PICTURE_BUTTON_SIZE = 82;

// https://stackoverflow.com/questions/58634905/camera-preview-in-expo-is-distorted

const BottomContainer = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    justify-content: center;
    height: 150px;
`;
const CameraStyled = styled(Camera)`
    flex: 1;
    justify-content: space-between;
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.black};
    flex: 1;
`;
const ImageStyled = styled.Image`
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;
`;
const InnerTakePictureButton = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: ${() => `${TAKE_PICTURE_BUTTON_SIZE / 2}px`};
    height: ${() => `${TAKE_PICTURE_BUTTON_SIZE - 18}px`};
    width: ${() => `${TAKE_PICTURE_BUTTON_SIZE - 18}px`};
    opacity: 0.75;
`;
const PictogramContainer = styled.Pressable`
    position: absolute;
    top: 0;
    left: 0;
    padding: ${({ theme }) => theme.spacings.small};
`;
const TakePictureButton = styled.Pressable`
    align-items: center;
    border-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: ${() => `${TAKE_PICTURE_BUTTON_SIZE / 2}px`};
    border-width: 5px;
    height: ${() => `${TAKE_PICTURE_BUTTON_SIZE}px`};
    justify-content: center;
    width: ${() => `${TAKE_PICTURE_BUTTON_SIZE}px`};
`;

const CameraScreen = ({ navigation }: Props) => {
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = React.useState<string | null>(null);
    const cameraRef = React.useRef<Camera | null>(null);

    const handlePressBack = React.useCallback(() => {
        navigation.navigate('AddPictures');
    }, [navigation]);
    const handleTakePicture = React.useCallback(async () => {
        if (cameraRef.current && !photo) {
            const p = await cameraRef.current.takePictureAsync();
            console.log(p);
            setPhoto(p.uri);
        }
    }, [cameraRef, photo]);

    return (
        <Container>
            <CameraStyled type={type} ref={cameraRef} ratio="4:3" />
            {!!photo && <ImageStyled source={{ uri: photo }} />}
            <PictogramContainer onPress={handlePressBack}>
                <Pictogram color="secondary-light" variant="arrow-left" />
            </PictogramContainer>
            <BottomContainer>
                <TakePictureButton onPress={handleTakePicture}>
                    <InnerTakePictureButton />
                </TakePictureButton>
            </BottomContainer>
        </Container>
    );
};

export default CameraScreen;
