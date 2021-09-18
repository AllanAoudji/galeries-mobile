import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFrames } from '#store/actions';
import {
    currentGalerieFramesEndSelector,
    currentGalerieFramesSelector,
    currentGalerieFramesStatusSelector,
    currentGalerieSelector,
} from '#store/selectors';

// TODO: When a galerie is posted, we need to reset allIdsByName
// but currentGalerie.id !== currentGalerieId gonna be always false
// So we maybe need to use a context.

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
    const [firstFetchIsFinished, setFirstFetchIsFinished] =
        React.useState<boolean>(true);

    const fetch = React.useCallback(() => {
        if (
            currentGalerie &&
            !currentGalerieFramesEnd &&
            currentGalerieFramesStatus !== 'FETCHING'
        ) {
            if (firstFetchIsFinished) setFetching(true);
            dispatch(fetchFrames({ galerieId: currentGalerie.id }));
        }
    }, [
        currentGalerie,
        currentGalerieFramesEnd,
        currentGalerieFramesStatus,
        firstFetchIsFinished,
    ]);
    const fetchNextGalerieFrames = React.useCallback(() => {
        if (
            currentGalerieFrames &&
            !fetching &&
            firstFetchIsFinished &&
            !currentGalerieFramesEnd
        )
            fetch();
    }, [
        currentGalerieFrames,
        currentGalerieFramesEnd,
        fetch,
        fetching,
        firstFetchIsFinished,
    ]);

    React.useEffect(() => {
        if (currentGalerieFramesStatus === 'PENDING')
            setFirstFetchIsFinished(false);
        if (
            currentGalerieFramesStatus === 'ERROR' ||
            currentGalerieFramesStatus === 'SUCCESS'
        ) {
            setFetching(false);
            setFirstFetchIsFinished(true);
        }
    }, [currentGalerieFramesStatus]);
    React.useEffect(() => {
        if (
            currentGalerie &&
            currentGalerie.id !== currentGalerieId &&
            !firstFetchIsFinished
        ) {
            setcurrentGalerieId(currentGalerie.id);
            fetch();
        }
    }, [currentGalerie, firstFetchIsFinished, currentGalerieId, fetch]);

    return {
        currentGalerieFrames,
        fetchNextGalerieFrames,
        fetching,
    };
};

export default useFetchGalerieFrames;
