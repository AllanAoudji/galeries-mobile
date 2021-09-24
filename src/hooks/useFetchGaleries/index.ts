import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getGaleries,
    selectGaleries,
    selectGaleriesNameStatus,
} from '#store/galeries';
import { filtersGaleriesNameSelector } from '#store/selectors';

const useFetchGaleries = () => {
    const dispatch = useDispatch();

    const filtersGaleriesName = useSelector(filtersGaleriesNameSelector);
    const galeriesName = React.useMemo(
        () => selectGaleries(filtersGaleriesName),
        [filtersGaleriesName]
    );
    const galeriesNameStatus = React.useMemo(
        () => selectGaleriesNameStatus(filtersGaleriesName),
        [filtersGaleriesName]
    );
    const galeries = useSelector(galeriesName);
    const galeriesStatus = useSelector(galeriesNameStatus);

    const [currentFilter, setCurrentFilter] = React.useState<string | null>(
        null
    );
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [firstFetchIsFinished, setFirstFetchIsFinished] =
        React.useState<boolean>(true);

    const fetch = React.useCallback(() => {
        if (galeriesStatus !== 'LOADING') {
            if (firstFetchIsFinished) setFetching(true);
            dispatch(getGaleries(filtersGaleriesName));
        }
    }, [filtersGaleriesName, firstFetchIsFinished, galeriesStatus]);
    const fetchNextGaleries = React.useCallback(() => {
        if (!fetching && firstFetchIsFinished) fetch();
    }, [fetch, fetching, firstFetchIsFinished, galeries]);

    React.useEffect(() => {
        if (galeriesStatus === 'PENDING') setFirstFetchIsFinished(false);
        if (galeriesStatus === 'ERROR' || galeriesStatus === 'SUCCESS') {
            setFetching(false);
            setFirstFetchIsFinished(true);
        }
    }, [galeriesStatus]);
    React.useEffect(() => {
        if (currentFilter !== filtersGaleriesName && !firstFetchIsFinished) {
            setCurrentFilter(filtersGaleriesName);
            fetch();
        }
    }, [currentFilter, fetch, filtersGaleriesName, firstFetchIsFinished]);

    return {
        fetchNextGaleries,
        fetching,
        filtersGaleriesName,
        galeries,
    };
};

export default useFetchGaleries;
