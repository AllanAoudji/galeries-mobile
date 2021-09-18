import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchComments } from '#store/actions';
import {
    currentFrameCommentsSelector,
    currentFrameCommentsEndSelector,
    currentFrameSelector,
    currentFrameCommentsStatusSelector,
} from '#store/selectors';

const useFetchComments = () => {
    const dispatch = useDispatch();

    const currentFrame = useSelector(currentFrameSelector);
    const currentFrameComments = useSelector(currentFrameCommentsSelector);
    const currentFrameCommentsEnd = useSelector(
        currentFrameCommentsEndSelector
    );
    const currentFrameCommentsStatus = useSelector(
        currentFrameCommentsStatusSelector
    );

    const [currentFrameId, setCurrentFrameId] = React.useState<string | null>(
        null
    );
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [firstFetchIsFinished, setFirstFetchIsFinished] =
        React.useState<boolean>(true);

    const fetch = React.useCallback(() => {
        if (
            currentFrame &&
            !currentFrameCommentsEnd &&
            currentFrameCommentsStatus !== 'FETCHING'
        ) {
            if (firstFetchIsFinished) setFetching(true);
            dispatch(fetchComments({ frameId: currentFrame.id }));
        }
    }, [
        currentFrame,
        currentFrameCommentsEnd,
        currentFrameCommentsStatus,
        firstFetchIsFinished,
    ]);
    const fetchNextFrameComments = React.useCallback(() => {
        if (!fetching && firstFetchIsFinished) fetch();
    }, [fetch, fetching, firstFetchIsFinished]);

    React.useEffect(() => {
        if (currentFrameCommentsStatus === 'PENDING')
            setFirstFetchIsFinished(false);
        if (
            currentFrameCommentsStatus === 'ERROR' ||
            currentFrameCommentsStatus === 'SUCCESS'
        ) {
            setFetching(false);
            setFirstFetchIsFinished(true);
        }
    }, [currentFrameCommentsStatus]);
    React.useEffect(() => {
        if (
            currentFrame &&
            currentFrame.id !== currentFrameId &&
            !firstFetchIsFinished
        ) {
            setCurrentFrameId(currentFrame.id);
            fetch();
        }
    }, [currentFrame, currentFrameId, firstFetchIsFinished, fetch]);

    return { currentFrameComments, fetchNextFrameComments, fetching };
};

export default useFetchComments;
