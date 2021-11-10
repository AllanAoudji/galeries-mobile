import * as React from 'react';
import { useSelector } from 'react-redux';

import BottomSheetButton from '#components/BottomSheetButton';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { DeleteGalerieBlackListModalContext } from '#contexts/DeleteGalerieBlackListModalContext';
import { selectGalerieBlackListsLoadingDelete } from '#store/galerieBlackLists';

type Props = {
    galerieBlackList: Store.Models.GalerieBlackList;
};

const UnBlackListButton = ({ galerieBlackList }: Props) => {
    const { closeBottomSheet } = React.useContext(BottomSheetContext);
    const { handleOpenModal } = React.useContext(
        DeleteGalerieBlackListModalContext
    );

    const loading = useSelector(selectGalerieBlackListsLoadingDelete);

    const handlePress = React.useCallback(() => {
        closeBottomSheet();
        if (!loading.includes('LOADING'))
            handleOpenModal(galerieBlackList.galerieId, galerieBlackList.id);
    }, [closeBottomSheet, galerieBlackList, handleOpenModal, loading]);

    return <BottomSheetButton onPress={handlePress} title="unblacklist user" />;
};

export default UnBlackListButton;
