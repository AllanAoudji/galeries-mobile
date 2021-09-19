type SetCommentsParams = {
    byId?: { [key: string]: Store.Models.Comment };
};

export const COMMENTS: Store.Entity = '[COMMENTS]';

export const COMMENTS_FETCH = `${COMMENTS} Fetch`;
export const COMMENTS_SET = `${COMMENTS} Set`;

export const fetchComments: (meta: { frameId: string }) => Store.Action = ({
    frameId,
}) => ({
    payload: {
        data: {},
        meta: {
            query: {
                frameId,
            },
        },
    },
    type: COMMENTS_FETCH,
});
export const resetComments: () => Store.Action = () => ({
    payload: {
        data: {
            byId: {},
        },
        meta: {},
    },
    type: COMMENTS_SET,
});
export const setComments: ({
    data,
    meta,
}: {
    data: SetCommentsParams;
    meta?: Store.Meta;
}) => Store.Action = ({ data, meta }) => ({
    payload: {
        data,
        meta: meta || {},
    },
    type: COMMENTS_SET,
});
