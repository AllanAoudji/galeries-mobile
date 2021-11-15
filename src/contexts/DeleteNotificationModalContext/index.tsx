import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { deleteNotification } from '#store/notifications';

export const DeleteNotificationModalContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (notificationId: string) => void;
    openModal: boolean;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
    openModal: false,
});

export const DeleteNotificationModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [currentNotification, setCurrentNotification] = React.useState<
        string | null
    >(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setCurrentNotification(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback((notificationId: string) => {
        setCurrentNotification(notificationId);
        setOpenModal(true);
    }, []);
    const handlePressDelete = React.useCallback(() => {
        if (currentNotification)
            dispatch(deleteNotification(currentNotification));
    }, [currentNotification]);

    return (
        <DeleteNotificationModalContext.Provider
            value={{
                handleCloseModal,
                handleOpenModal,
                openModal,
            }}
        >
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="delete this notification?"
            />
        </DeleteNotificationModalContext.Provider>
    );
};
