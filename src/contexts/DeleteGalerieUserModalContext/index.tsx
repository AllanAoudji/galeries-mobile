import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { deleteGalerieUser } from '#store/users';
import { postGalerieBlackList } from '#store/galerieBlackLists';

import Content from './Content';

export const DeleteGalerieUserModalContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (galerieId: string, userId: string) => void;
    openModal: boolean;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
    openModal: false,
});

export const DeleteGalerieUserModalProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [blackListUser, setBlackListUser] = React.useState<boolean>(false);
    const [currentGalerie, setCurrentGalerie] = React.useState<string | null>(
        null
    );
    const [currentUser, setCurrentUser] = React.useState<string | null>(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setBlackListUser(false);
        setCurrentGalerie(null);
        setCurrentUser(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback(
        (galerieId: string, userId: string) => {
            setBlackListUser(false);
            setCurrentGalerie(galerieId);
            setCurrentUser(userId);
            setOpenModal(true);
        },
        []
    );
    const handlePressDelete = React.useCallback(() => {
        if (currentGalerie && currentUser) {
            if (blackListUser)
                dispatch(postGalerieBlackList(currentGalerie, currentUser));
            else dispatch(deleteGalerieUser(currentGalerie, currentUser));
        }
    }, [blackListUser, currentUser]);
    const handlePressRadioButton = React.useCallback(
        () => setBlackListUser((prevState) => !prevState),
        []
    );
    const InnerContainer = React.useCallback(
        () => (
            <Content onPress={handlePressRadioButton} value={blackListUser} />
        ),
        [blackListUser, handlePressRadioButton]
    );

    return (
        <DeleteGalerieUserModalContext.Provider
            value={{ handleCloseModal, handleOpenModal, openModal }}
        >
            {children}
            <DeleteModal
                content={InnerContainer}
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="Are tou sure to delete this user?"
            />
        </DeleteGalerieUserModalContext.Provider>
    );
};
