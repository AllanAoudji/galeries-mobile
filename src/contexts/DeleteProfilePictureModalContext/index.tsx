import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { deleteProfilePicture } from '#store/profilePictures';

export const DeleteProfilePictureModalContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (profilePictureId: string) => void;
    openModal: boolean;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
    openModal: false,
});

export const DeleteProfilePictureModalProvider: React.FC<{}> = ({
    children,
}) => {
    const dispatch = useDispatch();

    const [currentProfilePicture, setCurrentProfilePicture] = React.useState<
        string | null
    >(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setCurrentProfilePicture(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback((profilePictureId: string) => {
        setCurrentProfilePicture(profilePictureId);
        setOpenModal(true);
    }, []);
    const handlePressDelete = React.useCallback(() => {
        if (!currentProfilePicture) return;
        dispatch(deleteProfilePicture(currentProfilePicture));
    }, [currentProfilePicture]);

    return (
        <DeleteProfilePictureModalContext.Provider
            value={{ handleCloseModal, handleOpenModal, openModal }}
        >
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="delete this profile picture?"
            />
        </DeleteProfilePictureModalContext.Provider>
    );
};
