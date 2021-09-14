import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import CustomButton from '#components/CustomButton';
import Typography from '#components/Typography';
import { ANIMATIONS } from '#helpers/constants';

import {
    Background,
    ButtonContainer,
    ButtonsContainer,
    Modal,
    Overlay,
} from './styles';

type Props = {
    handleClose: () => void;
    onPressDelete: () => void;
    open: boolean;
    title: string;
};

const DeleteModal = ({ handleClose, onPressDelete, open, title }: Props) => {
    const dimension = useWindowDimensions();

    const [display, setDisplay] = React.useState<boolean>(open);

    const visible = useSharedValue(open ? 1 : 0);

    const style = useAnimatedStyle(() => {
        const scale = interpolate(visible.value, [0, 1], [1.2, 1]);
        return {
            opacity: visible.value,
            transform: [{ scale }],
        };
    });

    const handleDelete = React.useCallback(() => {
        onPressDelete();
        handleClose();
    }, [handleClose, onPressDelete]);

    React.useEffect(() => {
        if (open) setDisplay(true);
        else
            visible.value = withTiming(
                0,
                ANIMATIONS.TIMING_CONFIG(200),
                (isFinished) => {
                    if (isFinished) runOnJS(setDisplay)(false);
                }
            );
    }, [open]);
    React.useEffect(() => {
        if (display)
            visible.value = withTiming(1, ANIMATIONS.TIMING_CONFIG(200));
    }, [display]);

    if (!display) return null;

    return (
        <Overlay height={dimension.height} style={style}>
            <Background onPress={handleClose} />
            <Modal>
                <Typography fontSize={24}>{title}</Typography>
                <ButtonsContainer>
                    <ButtonContainer>
                        <CustomButton
                            mr="small"
                            onPress={handleDelete}
                            small
                            title="delete"
                        />
                    </ButtonContainer>
                    <ButtonContainer>
                        <CustomButton
                            ml="small"
                            onPress={handleClose}
                            small
                            title="cancel"
                            variant="stroke"
                        />
                    </ButtonContainer>
                </ButtonsContainer>
            </Modal>
        </Overlay>
    );
};

export default DeleteModal;
