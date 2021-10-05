import uniqueArray from '#helpers/uniqueArray';

const combineFramesAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const framesById = getState().frames.byId;

    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!framesById[a] || !framesById[b]) return 0;
        return (
            new Date(framesById[b].createdAt).getTime() -
            new Date(framesById[a].createdAt).getTime()
        );
    });
    return allIds;
};

export default combineFramesAllIds;
