import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { deleteFrame } from '#store/frames';

export const DeleteFrameModalContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (frameId: string) => void;
    openModal: boolean;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
    openModal: false,
});

export const DeleteFrameModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [currentFrame, setCurrentFrame] = React.useState<string | null>(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setCurrentFrame(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback((frameId: string) => {
        setCurrentFrame(frameId);
        setOpenModal(true);
    }, []);
    const handlePressDelete = React.useCallback(() => {
        if (currentFrame) dispatch(deleteFrame(currentFrame));
    }, [currentFrame]);

    return (
        <DeleteFrameModalContext.Provider
            value={{ handleCloseModal, handleOpenModal, openModal }}
        >
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="delete this frame?"
            />
        </DeleteFrameModalContext.Provider>
    );
};
