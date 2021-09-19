import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLikes } from '#store/actions';
import {
    currentFrameLikesEndSelector,
    currentFrameLikesSelector,
    currentFrameLikesStatusSelector,
    currentFrameSelector,
} from '#store/selectors';

const useGetLikes = () => {
    const dispatch = useDispatch();

    const currentFrame = useSelector(currentFrameSelector);
    const currentFrameLikes = useSelector(currentFrameLikesSelector);
    const currentFrameLikesEnd = useSelector(currentFrameLikesEndSelector);
    const currentFrameLikesStatus = useSelector(
        currentFrameLikesStatusSelector
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
            !currentFrameLikesEnd &&
            currentFrameLikesStatus !== 'FETCHING'
        ) {
            if (firstFetchIsFinished) setFetching(true);
            dispatch(fetchLikes({ frameId: currentFrame.id }));
        }
    }, [
        currentFrame,
        currentFrameLikesEnd,
        currentFrameLikesStatus,
        firstFetchIsFinished,
    ]);
    const fetchNextFrameLikes = React.useCallback(() => {
        if (!fetching && firstFetchIsFinished) fetch();
    }, [fetch, fetching, firstFetchIsFinished]);

    React.useEffect(() => {
        if (currentFrameLikesStatus === 'PENDING')
            setFirstFetchIsFinished(false);
        if (
            currentFrameLikesStatus === 'ERROR' ||
            currentFrameLikesStatus === 'SUCCESS'
        ) {
            setFetching(false);
            setFirstFetchIsFinished(true);
        }
    }, [currentFrameLikesStatus]);
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

    return { currentFrameLikes, fetchNextFrameLikes, fetching };
};

export default useGetLikes;
