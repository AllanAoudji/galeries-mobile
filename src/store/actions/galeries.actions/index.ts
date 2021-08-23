type SetGaleriesParams = {
    allIds?: string[];
    byId?: { [key: string]: Store.Models.Galerie };
    end?: boolean;
    previousGalerie?: string;
    status?: Store.Status;
};

export const GALERIES: Store.Entity = '[GALERIES]';

export const GALERIES_FETCH = `${GALERIES} Fetch`;
export const GALERIES_SET = `${GALERIES} Set`;

export const fetchGaleries: (meta?: { name: string }) => Store.Action = (
    meta
) => ({
    payload: {
        data: {},
        meta: {
            query: {
                name: meta ? meta.name : '',
            },
        },
    },
    type: GALERIES_FETCH,
});
export const resetGaleries: () => Store.Action = () => ({
    payload: {
        data: {
            allIdsByName: {},
            byId: {},
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
