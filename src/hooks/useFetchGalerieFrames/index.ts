import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFrames } from '#store/actions';
import {
    currentGalerieFramesEndSelector,
    currentGalerieFramesSelector,
    currentGalerieFramesStatusSelector,
    currentGalerieSelector,
} from '#store/selectors';

const useFetchGalerieFrames = () => {
    const dispatch = useDispatch();

    const currentGalerie = useSelector(currentGalerieSelector);
    const currentGalerieFrames = useSelector(currentGalerieFramesSelector);
    const currentGalerieFramesEnd = useSelector(
        currentGalerieFramesEndSelector
    );
    const currentGalerieFramesStatus = useSelector(
        currentGalerieFramesStatusSelector
    );

    const [currentGalerieId, setcurrentGalerieId] = React.useState<
        string | null
    >(null);
    const [fetching, setFetching] = React.useState<boolean>(false);

    const fetch = React.useCallback(() => {
        if (
            currentGalerie &&
            !currentGalerieFramesEnd &&
            currentGalerieFramesStatus !== 'FETCHING'
        ) {
            dispatch(fetchFrames({ galerieId: currentGalerie.id }));
        }
    }, [
        currentGalerie && currentGalerieFramesEnd && currentGalerieFramesStatus,
    ]);
    const fetchNextGalerieFrames = React.useCallback(() => {
        if (currentGalerieFrames && !fetching) fetch();
    }, [currentGalerieFrames, fetch, fetching]);

    React.useEffect(() => {
        if (
            currentGalerieFramesStatus === 'ERROR' ||
            currentGalerieFramesStatus === 'SUCCESS'
        )
            setFetching(false);
        if (currentGalerieFrames && currentGalerieFramesStatus === 'FETCHING')
            setFetching(true);
    }, [currentGalerieFrames, currentGalerieFramesStatus]);
    React.useEffect(() => {
        if (
            currentGalerie &&
            currentGalerie.id !== currentGalerieId &&
            !currentGalerieFramesEnd &&
            currentGalerieFramesStatus === 'PENDING'
        ) {
            setcurrentGalerieId(currentGalerie.id);
            fetch();
        }
    }, [
        currentGalerie,
        currentGalerieFramesEnd,
        currentGalerieFramesStatus,
        currentGalerieId,
        fetch,
    ]);

    return {
        currentGalerieFrames,
        fetchNextGalerieFrames,
        fetching,
    };
};

export default useFetchGalerieFrames;
