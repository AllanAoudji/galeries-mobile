import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGaleries } from '#store/actions';
import {
    filtersGaleriesNameSelector,
    galeriesEndSelector,
    galeriesSelector,
    galeriesStatusSelector,
} from '#store/selectors';

const useFetchGaleries = () => {
    const dispatch = useDispatch();

    const filtersGaleriesName = useSelector(filtersGaleriesNameSelector);
    const galeries = useSelector(galeriesSelector);
    const galeriesEnd = useSelector(galeriesEndSelector);
    const galeriesStatus = useSelector(galeriesStatusSelector);

    const [currentFilter, setCurrentFilter] = React.useState<string | null>(
        null
    );
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [firstFetchIsFinished, setFirstFetchIsFinished] =
        React.useState<boolean>(true);

    const fetch = React.useCallback(() => {
        if (!galeriesEnd && galeriesStatus !== 'FETCHING') {
            if (firstFetchIsFinished) setFetching(true);
            dispatch(fetchGaleries({ name: filtersGaleriesName }));
        }
    }, [
        filtersGaleriesName,
        firstFetchIsFinished,
        galeriesEnd,
        galeriesStatus,
    ]);
    const fetchNextGaleries = React.useCallback(() => {
        if (!fetching && firstFetchIsFinished && !galeriesEnd) {
            fetch();
        }
    }, [fetching, firstFetchIsFinished, galeries, galeriesEnd]);

    React.useEffect(() => {
        if (galeriesStatus === 'PENDING') setFirstFetchIsFinished(false);
        if (galeriesStatus === 'ERROR' || galeriesStatus === 'SUCCESS') {
            setFetching(false);
            setFirstFetchIsFinished(true);
        }
    }, [firstFetchIsFinished, galeries, galeriesStatus]);
    React.useEffect(() => {
        if (currentFilter !== filtersGaleriesName && !firstFetchIsFinished) {
            setCurrentFilter(filtersGaleriesName);
            fetch();
        }
    }, [currentFilter, filtersGaleriesName, firstFetchIsFinished]);

    return {
        fetchNextGaleries,
        fetching,
        filtersGaleriesName,
        galeries,
    };
};

export default useFetchGaleries;
