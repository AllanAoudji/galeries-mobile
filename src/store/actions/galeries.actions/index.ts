type SetGaleriesParams = {
    allIds?: string[];
    byId?: { [key: string]: Store.Models.Galerie };
    status?: Store.Status;
};

export const GALERIES: Store.Entity = '[GALERIES]';

export const GALERIES_FETCH = `${GALERIES} Fetch`;
export const GALERIES_SET = `${GALERIES} Set`;

export const fetchGaleries: (payload?: { meta: Store.Meta }) => Store.Action = (
    payload
) => ({
    payload: {
        data: {},
        meta: payload ? payload.meta : {},
    },
    type: GALERIES_FETCH,
});
export const resetGaleries: () => Store.Action = () => ({
    payload: {
        data: {
            allIds: [],
            byId: {},
            filters: {},
            status: 'PENDING',
        },
        meta: {},
    },
    type: GALERIES_SET,
});
export const resetGaleriesFilters: () => Store.Action = () => ({
    payload: {
        data: {
            filters: {},
        },
        meta: {},
    },
    type: GALERIES_SET,
});
export const setGaleries: ({
    data,
    meta,
}: {
    data: SetGaleriesParams;
    meta?: Store.Meta;
}) => Store.Action = ({ data, meta }) => ({
    payload: {
        data,
        meta: meta || {},
    },
    type: GALERIES_SET,
});
