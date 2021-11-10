import * as React from 'react';
import { useDispatch } from 'react-redux';

import DeleteModal from '#components/DeleteModal';
import { unsubscribeGalerie } from '#store/galeries';

export const UnsubscribeGalerieContext = React.createContext<{
    handleCloseModal: () => void;
    handleOpenModal: (galerieId: string) => void;
    openModal: boolean;
}>({
    handleCloseModal: () => {},
    handleOpenModal: () => {},
    openModal: false,
});

export const UnsubscribeGalerieProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [currentGalerie, setCurrentGalerie] = React.useState<string | null>(
        null
    );
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleCloseModal = React.useCallback(() => {
        setCurrentGalerie(null);
        setOpenModal(false);
    }, []);
    const handleOpenModal = React.useCallback((galerieId: string) => {
        setCurrentGalerie(galerieId);
        setOpenModal(true);
    }, []);
    const handlePressDelete = React.useCallback(() => {
        if (currentGalerie) dispatch(unsubscribeGalerie(currentGalerie));
    }, [currentGalerie]);

    return (
        <UnsubscribeGalerieContext.Provider
            value={{ handleCloseModal, handleOpenModal, openModal }}
        >
            {children}
            <DeleteModal
                handleClose={handleCloseModal}
                onPressDelete={handlePressDelete}
                open={openModal}
                title="are you sure to unsubscribe from this galerie?"
            />
        </UnsubscribeGalerieContext.Provider>
    );
};
