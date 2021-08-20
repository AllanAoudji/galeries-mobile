import uniqueArray from '#helpers/uniqueArray';
import { GALERIES_SET } from '#store/actions';

const initialState: {
    allIds: string[];
    byId: { [key: string]: Store.Models.Galerie };
    end: boolean;
    filters: {
        [key: string]: {
            allIds: string[];
            end: boolean;
            previousGalerie?: string;
            status: Store.Status;
        };
    };
    previousGalerie?: string;
    status: Store.Status;
} = {
    allIds: [],
    byId: {},
    end: false,
    filters: {},
    status: 'PENDING',
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIES_SET: {
            let allIds: string[];
            let end: boolean;
            let filters: {
                [key: string]: {
                    allIds: string[];
                    end: boolean;
                    previousGalerie?: string;
                    status: Store.Status;
                };
            };
            let previousGalerie: string | undefined;
            let status: Store.Status;
            const byId = {
                ...state.byId,
                ...(action.payload.data.byId || {}),
            };
            if (
                action.payload.meta.query &&
                action.payload.meta.query.name &&
                typeof action.payload.meta.query.name === 'string'
            ) {
                const filtered = state.filters[
                    action.payload.meta.query.name
                ] || {
                    allIds: [],
                    end: false,
                    status: 'PENDING',
                };
                allIds = [...state.allIds];
                end = state.end;
                filters = {
                    ...state.filters,
                    [action.payload.meta.query.name]: {
                        ...state.filters[action.payload.meta.query.name],
                        allIds: uniqueArray([
                            ...filtered.allIds,
                            ...(action.payload.data.allIds || []),
                        ]).sort((a, b) => {
                            return byId[a].hiddenName.localeCompare(
                                byId[b].hiddenName
                            );
                        }),
                        end: action.payload.meta.end || filtered.end,
                        previousGalerie:
                            action.payload.meta.method === 'GET' &&
                            action.payload.data.allIds
                                ? byId[
                                      action.payload.data.allIds[
                                          action.payload.data.allIds.length - 1
                                      ]
                                  ].hiddenName
                                : filtered.previousGalerie,
                        status: 'SUCCESS',
                    },
                };
                previousGalerie = state.previousGalerie;
                status = state.status;
            } else {
                allIds = uniqueArray([
                    ...state.allIds,
                    ...(action.payload.data.allIds || []),
                ]).sort((a, b) => {
                    return byId[a].hiddenName.localeCompare(byId[b].hiddenName);
                });
                end = action.payload.meta.end || state.end;
                filters = action.payload.data.filters
                    ? action.payload.data.filter
                    : { ...state.filters };
                previousGalerie =
                    action.payload.meta.method === 'GET' &&
                    action.payload.data.allIds
                        ? byId[
                              action.payload.data.allIds[
                                  action.payload.data.allIds.length - 1
                              ]
                          ].hiddenName
                        : state.previousGalerie;
                status = action.payload.data.status || state.status;
            }

            return {
                ...state,
                allIds,
                byId,
                end,
                filters,
                previousGalerie,
                status,
            };
        }
        default:
            return state;
    }
};
