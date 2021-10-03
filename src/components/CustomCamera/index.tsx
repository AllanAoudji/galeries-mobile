import { Camera } from 'expo-camera';
import { CameraType, FlashMode } from 'expo-camera/build/Camera.types';
import * as ImageManipulator from 'expo-image-manipulator';
import * as React from 'react';
import {
    BackHandler,
    ImageSourcePropType,
    Platform,
    StatusBar,
    useWindowDimensions,
} from 'react-native';

import Pictogram from '#components/Pictogram';
import { GLOBAL_STYLE } from '#helpers/constants';

import {
    ActionsContainer,
    BackButtonContainer,
    BottomContainer,
    CameraStyled,
    Container,
    ImageStyled,
    InnerTakePictureButton,
    SavePicturesButton,
    SwitchFlashModeButtonContainer,
    SwitchTypeButtonContainer,
    TakePictureButton,
} from './styles';

type Props = {
    onPressBack?: () => void;
    onSavePictureUri: (uri: string) => void;
};

const CustomCamera = ({ onPressBack, onSavePictureUri }: Props) => {
    const dimension = useWindowDimensions();

    const cameraRef = React.useRef<Camera | null>(null);

    const [flashMode, setFlashMode] = React.useState<FlashMode>(
        Camera.Constants.FlashMode.off
    );
    const [margins, setMargins] = React.useState<number>(0);
    const [snapShot, setSnapshot] = React.useState<string | null>(null);
    const [type, setType] = React.useState<CameraType>(
        Camera.Constants.Type.back
    );

    const flashVariant = React.useMemo(
        () =>
            flashMode !== Camera.Constants.FlashMode.off
                ? 'flash-off'
                : 'flash-on',
        [flashMode]
    );
    const source: ImageSourcePropType = React.useMemo(
        () => ({
            uri: snapShot || '',
        }),
        [snapShot]
    );

    const handlePressBack = React.useCallback(() => {
        if (onPressBack) {
            if (snapShot) setSnapshot(null);
            else onPressBack();
        } else if (snapShot) setSnapshot(null);
    }, [onPressBack, snapShot]);
    const handlePressSwitchFlashMode = React.useCallback(() => {
        setFlashMode((prevState) =>
            prevState === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
        );
    }, []);
    const handlePressSwitchType = React.useCallback(() => {
        if (!snapShot)
            setType((prevState) =>
                prevState === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
            );
    }, [snapShot]);
    const handleSavePictureUri = React.useCallback(() => {
        if (snapShot) onSavePictureUri(snapShot);
    }, [onSavePictureUri, snapShot]);
    const handleTakePicture = React.useCallback(async () => {
        if (cameraRef.current && !snapShot) {
            const { uri } = await cameraRef.current.takePictureAsync();
            if (type === Camera.Constants.Type.front) {
                const photoFliped = await ImageManipulator.manipulateAsync(
                    uri,
                    [{ flip: ImageManipulator.FlipType.Horizontal }]
                );
                setSnapshot(photoFliped.uri);
            } else {
                setSnapshot(uri);
            }
        }
    }, [cameraRef, snapShot, type]);

    React.useEffect(() => {
        if (Platform.OS === 'android')
            setMargins((dimension.height - (4 / 3) * dimension.width) / 2);
    }, [dimension, Platform]);
    React.useEffect(() => {
        let BackHandlerListerner: any;
        if (snapShot)
            BackHandlerListerner = BackHandler.addEventListener(
                'hardwareBackPress',
                () => {
                    setSnapshot(null);
                    return true;
                }
            );
        else if (BackHandlerListerner) BackHandlerListerner.remove();
        return () => {
            if (BackHandlerListerner) BackHandlerListerner.remove();
        };
    }, [snapShot]);

    return (
        <Container>
            <CameraStyled
                flashMode={flashMode}
                margins={margins}
                ref={cameraRef}
                type={type}
            />
            {!!snapShot && <ImageStyled margins={margins} source={source} />}
            {!!onPressBack && (
                <BackButtonContainer paddingTop={StatusBar.currentHeight}>
                    <Pictogram
                        color="secondary-light"
                        height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                        onPress={handlePressBack}
                        pl="small"
                        pr="small"
                        variant="arrow-left"
                    />
                </BackButtonContainer>
            )}
            {!snapShot && type === Camera.Constants.Type.back && (
                <SwitchFlashModeButtonContainer
                    paddingTop={StatusBar.currentHeight}
                >
                    <Pictogram
                        color="secondary-light"
                        onPress={handlePressSwitchFlashMode}
                        height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                        variant={flashVariant}
                        pl="small"
                        pr="small"
                        width={80}
                    />
                </SwitchFlashModeButtonContainer>
            )}
            <BottomContainer>
                <ActionsContainer>
                    {!snapShot ? (
                        <TakePictureButton onPress={handleTakePicture}>
                            <InnerTakePictureButton />
                        </TakePictureButton>
                    ) : (
                        <SavePicturesButton onPress={handleSavePictureUri}>
                            <Pictogram color="primary" variant="valid" />
                        </SavePicturesButton>
                    )}
                </ActionsContainer>
                {!snapShot && (
                    <SwitchTypeButtonContainer onPress={handlePressSwitchType}>
                        <Pictogram
                            color="secondary-light"
                            size="large"
                            variant="switch"
                        />
                    </SwitchTypeButtonContainer>
                )}
            </BottomContainer>
        </Container>
    );
};

export default React.memo(CustomCamera);
