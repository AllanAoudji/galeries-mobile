import * as React from 'react';
import { useSelector } from 'react-redux';

import { CustomButton } from '#components';
import { UnsubscribeGalerieContext } from '#contexts/UnsubscribeGalerieContext';
import { selectGaleriesLoadingDelete } from '#store/galeries';

type Props = {
    galerie: Store.Models.Galerie;
};

const UnsubscribeButton = ({ galerie }: Props) => {
    const { handleOpenModal } = React.useContext(UnsubscribeGalerieContext);

    const loading = useSelector(selectGaleriesLoadingDelete);

    const handlePress = React.useCallback(() => {
        if (!loading.includes('LOADING')) handleOpenModal(galerie.id);
    }, [galerie, loading]);

    return (
        <CustomButton
            loading={loading.includes('LOADING')}
            ml="smallest"
            mr="smallest"
            mt="large"
            onPress={handlePress}
            title="unsubscribe from this galerie"
        />
    );
};

export default UnsubscribeButton;
