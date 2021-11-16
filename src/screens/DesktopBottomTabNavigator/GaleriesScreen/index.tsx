import * as React from 'react';
import { useSelector } from 'react-redux';

import { GaleriesSearchContext } from '#contexts/GaleriesSearchContext';
import { BottomLoader, FullScreenLoader } from '#components';
import {
    selectGaleriesAllIds,
    selectGaleriesNameStatus,
} from '#store/galeries';

import EmptyScrollView from './EmptyScrollView';
import Galeries from './Galeries';

import { Container } from './styles';

const GaleriesScreen = () => {
    const { searchFinished } = React.useContext(GaleriesSearchContext);

    const galeriesAllIds = useSelector(selectGaleriesAllIds);
    const galeriesNameStatus = useSelector(selectGaleriesNameStatus);

    const showBottonLoader = React.useMemo(
        () =>
            galeriesNameStatus === 'PENDING' ||
            galeriesNameStatus === 'INITIAL_LOADING' ||
            !searchFinished,
        [galeriesNameStatus, searchFinished]
    );

    return (
        <Container>
            {!!galeriesAllIds && galeriesAllIds.length > 0 ? (
                <Galeries allIds={galeriesAllIds} />
            ) : (
                <EmptyScrollView />
            )}
            <FullScreenLoader show={showBottonLoader} />
            <BottomLoader
                bottom="huge"
                show={galeriesNameStatus === 'LOADING'}
            />
        </Container>
    );
};

export default GaleriesScreen;
