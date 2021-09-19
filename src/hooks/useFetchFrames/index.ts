import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFrames } from '#store/actions';
import {
    framesSelector,
    framesEndSelector,
    framesStatusSelector,
} from '#store/selectors';

const useFetchFrames = () => {
    const dispatch = useDispatch();

    const frames = useSelector(framesSelector);
    const framesEnd = useSelector(framesEndSelector);
    const framesStatus = useSelector(framesStatusSelector);

    const [fetching, setFetching] = React.useState<boolean>(false);
    const [firstFetchIsFinished, setFirstFetchIsFinished] =
        React.useState<boolean>(true);

    const fetch = React.useCallback(() => {
        if (!framesEnd && framesStatus !== 'FETCHING') {
            if (firstFetchIsFinished) setFetching(true);
            dispatch(fetchFrames());
        }
    }, [firstFetchIsFinished, framesEnd, framesStatus]);
    const fetchNextFrames = React.useCallback(() => {
        if (!fetching && firstFetchIsFinished) fetch();
    }, [fetch, fetching, firstFetchIsFinished]);

    React.useEffect(() => {
        if (framesStatus === 'PENDING') setFirstFetchIsFinished(false);
        if (framesStatus === 'ERROR' || framesStatus === 'SUCCESS') {
            setFetching(false);
            setFirstFetchIsFinished(true);
        }
    }, [framesStatus]);

    React.useEffect(() => {
        if (!firstFetchIsFinished) fetch();
    }, [firstFetchIsFinished]);

    return { frames, fetchNextFrames, fetching };
};

export default useFetchFrames;
