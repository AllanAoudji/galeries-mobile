import { GALERIES_SET } from '#store/actions';

const initialState: {
    allIds: string[];
    byId: { [key: string]: Store.Models.Galerie };
    status: Store.Status;
} = {
    allIds: [],
    byId: {},
    status: 'PENDING',
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIES_SET:
            return {
                allIds: [
                    ...(action.payload && action.payload.data.allIds
                        ? action.payload.data.allIds
                        : []),
                    ...state.allIds,
                ],
                byId: {
                    ...(action.payload && action.payload.data.byId
                        ? action.payload.data.byId
                        : {}),
                    ...state.byId,
                },
                status:
                    action.payload && action.payload.data.status
                        ? action.payload.data.status
                        : state.status,
            };
        default:
            return state;
    }
};
