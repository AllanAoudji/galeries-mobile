import { Camera } from 'expo-camera';
import { FlashMode } from 'expo-camera/build/Camera.types';
import * as React from 'react';
import { StatusBar } from 'react-native';

import Pictogram from '#components/Pictogram';
import { GLOBAL_STYLE } from '#helpers/constants';

import { Container } from './styles';

type Props = {
    flashMode: FlashMode;
    onPress: () => void;
};

const SwitchFlashModeButton = ({ flashMode, onPress }: Props) => {
    return (
        <Container paddingTop={StatusBar.currentHeight}>
            <Pictogram
                color="secondary-light"
                height={GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT}
                onPress={onPress}
                pl="small"
                pr="small"
                variant={
                    flashMode !== Camera.Constants.FlashMode.off
                        ? 'flash-on'
                        : 'flash-off'
                }
                width={80}
            />
        </Container>
    );
};

export default React.memo(SwitchFlashModeButton);
