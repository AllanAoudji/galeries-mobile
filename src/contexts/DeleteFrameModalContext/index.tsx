import * as React from 'react';
import { useDispatch } from 'react-redux';

import { deleteFrame } from '#store/frames';
import DeleteModal from '#components/DeleteModal';

export const DeleteFrameModalContext = React.createContext<{
    handleOpenModal: (frameId: string) => void;
}>({
    handleOpenModal: () => {},
});

export const DeleteFrameModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [currentFrame, setCurrentFrame] = React.useState<string | null>(null);

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
        <DeleteFrameModalContext.Provider value={{ handleOpenModal }}>
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
