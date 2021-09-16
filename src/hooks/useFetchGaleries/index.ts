import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGaleries } from '#store/actions';
import {
    filtersGaleriesNameSelector,
    galeriesEndSelector,
    galeriesStatusSelector,
} from '#store/selectors';

const useFetchGaleries = () => {
    const dispatch = useDispatch();

    const filtersGaleriesName = useSelector(filtersGaleriesNameSelector);
    const galeriesEnd = useSelector(galeriesEndSelector);
    const galeriesStatus = useSelector(galeriesStatusSelector);

    const [currentFilter, setCurrentFilter] =
        React.useState<string>(filtersGaleriesName);
    const [firstFetchIsFinished, setFirstFetchIsFinished] =
        React.useState<boolean>(false);
    const [fetching, setFetching] = React.useState<boolean>(false);

    const fetch = React.useCallback(() => {
        if (!galeriesEnd && galeriesStatus !== 'FETCHING') {
            dispatch(fetchGaleries({ name: filtersGaleriesName }));
        }
    }, [filtersGaleriesName, galeriesEnd, galeriesStatus]);
    const fetchNextGaleries = React.useCallback(() => {
        if (
            firstFetchIsFinished &&
            (galeriesStatus === 'ERROR' || galeriesStatus === 'SUCCESS')
        )
            fetch();
    }, [firstFetchIsFinished, galeriesStatus]);

    React.useEffect(() => {
        if (galeriesStatus === 'PENDING') {
            setFirstFetchIsFinished(false);
        } else if (galeriesStatus === 'ERROR' || galeriesStatus === 'SUCCESS') {
            setFirstFetchIsFinished(true);
            setFetching(false);
        }
        if (galeriesStatus === 'FETCHING' && firstFetchIsFinished) {
            setFetching(true);
        }
    }, [galeriesStatus, firstFetchIsFinished]);

    React.useEffect(() => {
        if (
            currentFilter !== filtersGaleriesName &&
            !galeriesEnd &&
            galeriesStatus === 'PENDING'
        ) {
            setCurrentFilter(filtersGaleriesName);
            fetch();
        }
    }, [
        currentFilter,
        fetch,
        filtersGaleriesName,
        galeriesEnd,
        galeriesStatus,
    ]);

    return {
        fetchGaleries: fetch,
        fetchNextGaleries,
        fetching,
        firstFetchIsFinished,
    };
};

export default useFetchGaleries;
