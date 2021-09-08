import * as React from 'react';
import { useWindowDimensions } from 'react-native';

import CustomButton from '#components/CustomButton';
import Typography from '#components/Typography';

import { ButtonContainer, ButtonsContainer, Modal, Overlay } from './styles';

type Props = {
    handleClose: () => void;
    onPressDelete: () => void;
    open: boolean;
    title: string;
};

const DeleteModal = ({ handleClose, onPressDelete, open, title }: Props) => {
    const dimension = useWindowDimensions();

    const handleDelete = React.useCallback(() => {
        onPressDelete();
        handleClose();
    }, [handleClose, onPressDelete]);

    // TODO: Should be animated

    if (!open) return null;

    return (
        <Overlay height={dimension.height} onPress={handleClose}>
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
