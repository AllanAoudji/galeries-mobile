import { Camera } from 'expo-camera';
import { CameraType, FlashMode } from 'expo-camera/build/Camera.types';
import * as ImageManipulator from 'expo-image-manipulator';
import * as React from 'react';
import { Platform, useWindowDimensions } from 'react-native';

import Pictogram from '#components/Pictogram';

import {
    BackButtonContainer,
    BottomContainer,
    CameraStyled,
    Container,
    ImageStyled,
    InnerTakePictureButton,
    TakePictureButton,
    SwitchFlashModeButtonContainer,
    SwitchTypeButtonContainer,
} from './styles';
import Typography from '#components/Typography';

type Props = {
    onPressBack?: () => void;
    photoUri: string | null;
    setPhotoUri: React.Dispatch<React.SetStateAction<string | null>>;
};

const CustomCamera = ({ onPressBack, photoUri, setPhotoUri }: Props) => {
    const dimension = useWindowDimensions();

    const [margins, setMargins] = React.useState<number>(0);
    const [type, setType] = React.useState<CameraType>(
        Camera.Constants.Type.back
    );
    const [flashMode, setFlashMode] = React.useState<FlashMode>(
        Camera.Constants.FlashMode.off
    );

    const cameraRef = React.useRef<Camera | null>(null);

    const flashState = React.useMemo(
        () => (flashMode === Camera.Constants.FlashMode.off ? 'off' : 'on'),
        [flashMode]
    );

    const handlePressSwitchFlashMode = React.useCallback(() => {
        setFlashMode((prevState) =>
            prevState === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
        );
    }, []);
    const handlePressSwitchType = React.useCallback(() => {
        if (!photoUri)
            setType((prevState) =>
                prevState === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
            );
    }, [photoUri]);
    const handleTakePicture = React.useCallback(async () => {
        if (cameraRef.current && !photoUri) {
            const { uri } = await cameraRef.current.takePictureAsync();
            if (type === Camera.Constants.Type.front) {
                const photoFliped = await ImageManipulator.manipulateAsync(
                    uri,
                    [{ flip: ImageManipulator.FlipType.Horizontal }]
                );
                setPhotoUri(photoFliped.uri);
            } else {
                setPhotoUri(uri);
            }
        }
    }, [cameraRef, photoUri, type]);

    React.useEffect(() => {
        if (Platform.OS === 'android')
            setMargins((dimension.height - (4 / 3) * dimension.width) / 2);
    }, [Platform, dimension]);

    // TODO: if press back or press BackButton when photUri !== null
    // Pop modal 'are you sure to quit?'

    return (
        <Container>
            <CameraStyled
                margins={margins}
                ref={cameraRef}
                flashMode={flashMode}
                type={type}
            />
            {!!photoUri && (
                <ImageStyled margins={margins} source={{ uri: photoUri }} />
            )}
            {!!onPressBack && (
                <BackButtonContainer onPress={onPressBack}>
                    <Pictogram color="secondary-light" variant="arrow-left" />
                </BackButtonContainer>
            )}
            <SwitchFlashModeButtonContainer
                onPress={handlePressSwitchFlashMode}
            >
                {/* TODO: Create flash pictogram */}
                <Typography color="secondary-light">
                    Flash {flashState}
                </Typography>
            </SwitchFlashModeButtonContainer>
            <BottomContainer>
                <TakePictureButton onPress={handleTakePicture}>
                    <InnerTakePictureButton />
                </TakePictureButton>
                <SwitchTypeButtonContainer onPress={handlePressSwitchType}>
                    <Pictogram
                        color="secondary-light"
                        size="large"
                        variant="switch"
                    />
                </SwitchTypeButtonContainer>
            </BottomContainer>
        </Container>
    );
};

export default CustomCamera;
