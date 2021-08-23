export const FILTERS: Store.Entity = '[FILTERS]';

export const FILTERS_SET = `${FILTERS} Set`;

export const setGaleriesNameFilter: (name: string) => Store.Action = (
    name
) => ({
    payload: {
        data: {
            galeries: {
                name,
            },
        },
        meta: {},
    },
    type: FILTERS_SET,
});
