import { Middleware } from 'redux';

import { NORMALIZE } from '#store/actions';

const normalizeMiddleware: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        const { payload } = action;

        if (action.type.includes(NORMALIZE) && payload.meta.entity) {
            const allIds: string[] = [];
            const byId: { [key: string]: any } = {};

            if (Array.isArray(payload.data)) {
                payload.data.forEach((model) => {
                    const { id, ...data } = model;
                    if (id) {
                        allIds.push(id);
                        byId[id] = data;
                    }
                });
            }
            if (typeof payload.data === 'object') {
                const { id, ...data } = payload.data;
                if (id) {
                    allIds.push(id);
                    byId[id] = data;
                }
            }

            dispatch({
                payload: {
                    data: {
                        allIds,
                        byId,
                        status: 'SUCCESS',
                    },
                    meta: { ...action.payload.meta },
                },
                type: `${payload.meta.entity} Set`,
            });
        }
    };

export default [normalizeMiddleware];
