import uniqueArray from '#helpers/uniqueArray';
import { getCommentsById } from '#store/getters';

const combineCommentsAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const commentsById = getCommentsById(getState);
    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!commentsById[a] || !commentsById[b]) return 0;
        return commentsById[b].autoIncrementId.localeCompare(
            commentsById[a].autoIncrementId
        );
    });
    return allIds;
};

export default combineCommentsAllIds;
