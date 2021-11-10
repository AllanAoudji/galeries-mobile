import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { deleteInvitation } from '#store/invitations';

export const DeleteInvitationModalContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (invitationId: string) => void;
    openModal: boolean;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
    openModal: false,
});

export const DeleteInvitationModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [currentInvitation, setCurrentInvitation] = React.useState<
        string | null
    >(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setCurrentInvitation(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback((invitationId: string) => {
        setCurrentInvitation(invitationId);
        setOpenModal(true);
    }, []);
    const handlePressDelete = React.useCallback(() => {
        if (currentInvitation) dispatch(deleteInvitation(currentInvitation));
    }, [currentInvitation]);

    return (
        <DeleteInvitationModalContext.Provider
            value={{ handleCloseModal, handleOpenModal, openModal }}
        >
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="delete this invitation?"
            />
        </DeleteInvitationModalContext.Provider>
    );
};
