import { useFocusEffect } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { CameraType, FlashMode } from 'expo-camera/build/Camera.types';
import * as ImageManipulator from 'expo-image-manipulator';
import * as React from 'react';
import {
    BackHandler,
    ImageSourcePropType,
    Platform,
    useWindowDimensions,
} from 'react-native';

import ReturnButton from '#components/ReturnButton';

import Footer from './Footer';
import SwitchFlashModeButton from './SwitchFlashModeButton';

import { CameraStyled, Container, ImageStyled } from './styles';

type Props = {
    onPressBack?: () => void;
    onSavePictureUri: (uri: string) => void;
};

const CustomCamera = ({ onPressBack, onSavePictureUri }: Props) => {
    const dimension = useWindowDimensions();

    const cameraRef = React.useRef<Camera | null>(null);
    const mounted = React.useRef<boolean>(false);

    const [flashMode, setFlashMode] = React.useState<FlashMode>(
        Camera.Constants.FlashMode.off
    );
    const [margins, setMargins] = React.useState<number>(0);
    const [snapShot, setSnapshot] = React.useState<string | null>(null);
    const [type, setType] = React.useState<CameraType>(
        Camera.Constants.Type.back
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
                if (mounted.current) setSnapshot(photoFliped.uri);
            } else if (mounted.current) setSnapshot(uri);
        }
    }, [cameraRef, snapShot, type]);

    React.useEffect(() => {
        if (Platform.OS === 'android')
            setMargins((dimension.height - (4 / 3) * dimension.width) / 2);
    }, [dimension, Platform]);
    useFocusEffect(
        React.useCallback(() => {
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
        }, [snapShot])
    );
    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    return (
        <Container>
            <CameraStyled
                flashMode={flashMode}
                margins={margins}
                ref={cameraRef}
                type={type}
            />
            {!!snapShot && <ImageStyled margins={margins} source={source} />}
            {!!onPressBack && <ReturnButton onPress={handlePressBack} />}
            {!snapShot && type === Camera.Constants.Type.back && (
                <SwitchFlashModeButton
                    flashMode={flashMode}
                    onPress={handlePressSwitchFlashMode}
                />
            )}
            <Footer
                onPressSavePicture={handleSavePictureUri}
                onPressSwitchType={handlePressSwitchType}
                onPressTakePicture={handleTakePicture}
                snapShot={snapShot}
            />
        </Container>
    );
};

export default React.memo(CustomCamera);
