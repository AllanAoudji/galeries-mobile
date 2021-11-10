import * as React from 'react';
import { useSelector } from 'react-redux';

import { CustomButton } from '#components';
import { DeleteGalerieBlackListModalContext } from '#contexts/DeleteGalerieBlackListModalContext';
import { selectGalerieBlackListsLoadingDelete } from '#store/galerieBlackLists';

type Props = {
    galerieBlackList: Store.Models.GalerieBlackList;
};

const Footer = ({ galerieBlackList }: Props) => {
    const { handleOpenModal } = React.useContext(
        DeleteGalerieBlackListModalContext
    );

    const loading = useSelector(selectGalerieBlackListsLoadingDelete);

    const handlePress = React.useCallback(() => {
        if (!loading.includes('LOADING'))
            handleOpenModal(galerieBlackList.galerieId, galerieBlackList.id);
    }, [galerieBlackList, handleOpenModal, loading]);

    return <CustomButton onPress={handlePress} title="unblacklist user" />;
};

export default Footer;
