import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { deleteBetaKey } from '#store/betaKeys';

export const DeleteBetaKeyModalContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (betaKeyId: string) => void;
    openModal: boolean;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
    openModal: false,
});

export const DeleteBetaKeyModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [currentBetaKey, setCurrentBetaKey] = React.useState<string | null>(
        null
    );
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setCurrentBetaKey(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback((betaKeyId: string) => {
        setCurrentBetaKey(betaKeyId);
        setOpenModal(true);
    }, []);
    const handlePressDelete = React.useCallback(() => {
        if (!currentBetaKey) return;
        dispatch(deleteBetaKey(currentBetaKey));
    }, [currentBetaKey]);

    return (
        <DeleteBetaKeyModalContext.Provider
            value={{ handleCloseModal, handleOpenModal, openModal }}
        >
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="delete this beta key?"
            />
        </DeleteBetaKeyModalContext.Provider>
    );
};
