import uniqueArray from '#helpers/uniqueArray';
import { getFramesById } from '#store/getters';

const combineFramesAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const framesById = getFramesById(getState);
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
