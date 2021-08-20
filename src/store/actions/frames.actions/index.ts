type SetFramesParams = {
    data?: {
        allIds?: string[];
        byId?: { [key: string]: Store.Models.Frame };
        status?: Store.Status;
    };
    status?: Store.Status;
};

export const FRAMES: Store.Entity = '[FRAMES]';

export const FRAMES_FETCH = `${FRAMES} Fetch`;
export const FRAMES_SET = `${FRAMES} Set`;

export const fetchFrames: (payload?: { meta: Store.Meta }) => Store.Action = (
    payload
) => ({
    payload: {
        data: {},
        meta: payload ? payload.meta : {},
    },
    type: FRAMES_FETCH,
});
export const resetFrames: () => Store.Action = () => ({
    payload: {
        data: {
            allIds: [],
            byIds: {},
            status: 'PENDING',
        },
        meta: {},
    },
    type: FRAMES_SET,
});
export const setFrames: ({
    data,
    meta,
}: {
    data: SetFramesParams;
    meta?: Store.Meta;
}) => Store.Action = ({ data, meta }) => ({
    payload: {
        data,
        meta: meta || {},
    },
    type: FRAMES_SET,
});
