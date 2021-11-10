import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { deleteGalerieBlackList } from '#store/galerieBlackLists';

export const DeleteGalerieBlackListModalContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (galerieId: string, frameId: string) => void;
    openModal: boolean;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
    openModal: false,
});

export const DeleteGalerieBlackListModalProvider: React.FC<{}> = ({
    children,
}) => {
    const dispatch = useDispatch();

    const [currentGalerie, setCurrentGalerie] = React.useState<string | null>(
        null
    );
    const [currentGalerieBlackList, setCurrentGalerieBlackList] =
        React.useState<string | null>(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setCurrentGalerie(null);
        setCurrentGalerieBlackList(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback(
        (galerieId: string, galerieBlackListId: string) => {
            setCurrentGalerie(galerieId);
            setCurrentGalerieBlackList(galerieBlackListId);
            setOpenModal(true);
        },
        []
    );
    const handlePressDelete = React.useCallback(() => {
        if (currentGalerieBlackList && currentGalerie)
            dispatch(
                deleteGalerieBlackList(currentGalerie, currentGalerieBlackList)
            );
    }, [currentGalerie, currentGalerieBlackList]);

    return (
        <DeleteGalerieBlackListModalContext.Provider
            value={{ handleCloseModal, handleOpenModal, openModal }}
        >
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="unblacklist this user?"
            />
        </DeleteGalerieBlackListModalContext.Provider>
    );
};
