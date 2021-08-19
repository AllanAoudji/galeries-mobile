type SetGaleriesParams = {
    data?: {
        allIds?: { [key: string]: Store.Models.Galerie };
        byIds?: string[];
        status?: Store.Status;
    };
    status?: Store.Status;
};

export const GALERIES: Store.Entity = '[GALERIES]';

export const GALERIES_FETCH = `${GALERIES} Fetch`;
export const GALERIES_SET = `${GALERIES} Set`;

export const fetchGaleries: () => Store.Action = () => ({
    type: GALERIES_FETCH,
});
export const resetGaleries: () => Store.Action = () => ({
    payload: {
        data: {
            allIds: [],
            byId: {},
            status: 'PENDING',
        },
    },
    type: GALERIES_SET,
});
export const setGaleries: (params: SetGaleriesParams) => Store.Action = ({
    data,
    status,
}) => ({
    payload: {
        data: {
            data,
            status,
        },
    },
    type: GALERIES_SET,
});
