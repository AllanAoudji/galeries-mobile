type SetLikesParams = {
    byId?: { [key: string]: Store.Models.Like };
};

export const LIKES: Store.Entity = '[LIKES]';

export const LIKES_FETCH = `${LIKES} Fetch`;
export const LIKES_SET = `${LIKES} Set`;

export const fetchLikes: (meta: { frameId: string }) => Store.Action = ({
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
    type: LIKES_FETCH,
});
export const resetLikes: () => Store.Action = () => ({
    payload: {
        data: {
            byId: {},
        },
        meta: {},
    },
    type: LIKES_SET,
});
export const setLikes: ({
    data,
    meta,
}: {
    data: SetLikesParams;
    meta?: Store.Meta;
}) => Store.Action = ({ data, meta }) => ({
    payload: {
        data,
        meta: meta || {},
    },
    type: LIKES_SET,
});
