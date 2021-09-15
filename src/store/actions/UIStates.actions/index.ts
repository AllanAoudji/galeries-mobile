export const UI_STATES: Store.Entity = '[UI STATES]';

export const UI_STATES_SET = `${UI_STATES} Set`;

export const resetCurrentFrameId: () => Store.Action = () => ({
    payload: {
        data: {
            currentFrameId: undefined,
        },
        meta: {},
    },
    type: UI_STATES_SET,
});
export const resetCurrentGalerieId: () => Store.Action = () => ({
    payload: {
        data: {
            currentGalerieId: undefined,
        },
        meta: {},
    },
    type: UI_STATES_SET,
});
export const resetGaleriesNameFilter: () => Store.Action = () => ({
    payload: {
        data: {
            galeries: {
                name: '',
            },
        },
        meta: {},
    },
    type: UI_STATES_SET,
});
export const setCurrentFrameId: (id: string) => Store.Action = (id) => ({
    payload: {
        data: {
            currentFrameId: id,
        },
        meta: {},
    },
    type: UI_STATES_SET,
});
export const setCurrentGalerieId: (id: string) => Store.Action = (id) => ({
    payload: {
        data: {
            currentGalerieId: id,
        },
        meta: {},
    },
    type: UI_STATES_SET,
});
export const setGaleriesNameFilter: (name: string) => Store.Action = (
    name
) => ({
    payload: {
        data: {
            filters: {
                galeries: {
                    name,
                },
            },
        },
        meta: {},
    },
    type: UI_STATES_SET,
});
