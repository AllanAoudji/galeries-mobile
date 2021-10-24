import * as React from 'react';
import { useDispatch } from 'react-redux';

import { deleteInvitation } from '#store/invitations';
import { DeleteModal } from '#components';

export const DeleteInvitationModalContext = React.createContext<{
    handleOpenModal: (invitationId: string) => void;
}>({
    handleOpenModal: () => {},
});

export const DeleteInvitationModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [currentInvitation, setCurrentInvitation] = React.useState<
        string | null
    >(null);

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
        <DeleteInvitationModalContext.Provider value={{ handleOpenModal }}>
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
