import uniqueArray from '#helpers/uniqueArray';
import { GALERIES_SET } from '#store/actions';

const initialState: {
    allIdsByName: {
        [key: string]: {
            allIds: string[];
            end: boolean;
            previousGalerie?: string;
            status: Store.Status;
        };
    };
    byId: { [key: string]: Store.Models.Galerie };
} = {
    allIdsByName: {},
    byId: {},
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIES_SET: {
            const byId = {
                ...state.byId,
                ...(action.payload.data.byId || {}),
            };
            const queryName =
                action.payload.meta.query &&
                typeof action.payload.meta.query.name === 'string'
                    ? action.payload.meta.query.name
                    : '';
            const byName = state.allIdsByName[queryName] || {
                allIds: [],
                end: false,
                status: 'PENDING',
            };
            const allIdsByName = action.payload.data.allIdsByName || {
                ...state.allIdsByName,
                [queryName]: {
                    ...byName,
                    allIds: uniqueArray([
                        ...byName.allIds,
                        ...(action.payload.data.allIds || []),
                    ]).sort((a, b) => {
                        if (byId[a].hiddenName < byId[b].hiddenName) return -1;
                        if (byId[a].hiddenName > byId[b].hiddenName) return 1;
                        return 0;
                    }),
                    end: action.payload.meta.end || byName.end,
                    previousGalerie:
                        action.payload.meta.method === 'GET' &&
                        action.payload.data.allIds &&
                        action.payload.data.allIds.length
                            ? byId[
                                  action.payload.data.allIds[
                                      action.payload.data.allIds.length - 1
                                  ]
                              ].hiddenName
                            : byName.previousGalerie,
                    status: action.payload.data.status || 'PENDING',
                },
            };
            return {
                ...state,
                allIdsByName,
                byId,
            };
        }
        default:
            return state;
    }
};
